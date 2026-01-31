import fs from "fs/promises";
import path from "path";
import { selectJson } from "./api.js";

/**
 * @typedef {Object} DivisionSource
 * @property {string} quHuaDaiMa - 区划代码
 * @property {string} quhao - 区号
 * @property {string} shengji - 省级名称
 * @property {string} diji - 地级名称
 * @property {string} xianji - 县级名称
 * @property {DivisionSource[]} children - 子节点
 */

/**
 *
 * @returns {DivisionSource[]} 省级区划信息数组
 */
const readProvinces = async () => {
  const filePath = path.join(
    process.cwd(),
    "data",
    "province",
    "provinces.json",
  );
  // 同步读取文件内容
  return await readJsonFile(filePath);
};

const readJsonFile = async (filePath) => {
  // 同步读取文件内容
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
};

/**
 * build json file path
 * @param {string} shengji - 省级。比如：四川省（川、蜀）
 * @param {string} diji - 地级。比如：成都市
 */
const buildFilePath = (shengji = null, diji = null) => {
  let dir = "";
  if (shengji) {
    dir = "city";
    if (diji) {
      dir = "area";
    }
  }

  let fileName = "";
  if (shengji) {
    fileName += shengji;
    if (diji) {
      fileName += `_${diji}`;
    }
  }
  fileName = fileName.replace(/[\s()（）、]/g, "");
  const filePath = path.join(process.cwd(), "data", dir, `${fileName}.json`);
  return filePath;
};

/**
 * write json to file
 * @param {string} filePath *.json file path
 * @param {object} data object
 * @param {boolean} min true/false
 */
const writeJsonFile = async (filePath, data, min = true) => {
  let jsonContent = "";
  if (min) {
    jsonContent = JSON.stringify(data);
  } else {
    // 格式化 JSON，缩进 2 空格
    jsonContent = JSON.stringify(data, null, 2);
  }
  // 保存到指定目录。
  await fs.writeFile(filePath, jsonContent, "utf-8");

  console.log(`JSON 已保存到: ${filePath}`);
};

/**
 * check file exist
 * @param {string} filePath
 * @returns boolean
 */
const isFileExist = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (_error) {
    return false;
  }
};

/**
 * write source all
 */
const writeSourceAll = async () => {
  // 读取省级 - 区划信息
  const provinces = await readProvinces();

  for (const provinceItem of provinces) {
    const dijiFilePath = buildFilePath(provinceItem.shengji, null);
    let dijiData = {};
    if (await isFileExist(dijiFilePath)) {
      // 优先从本地读取
      dijiData = await readJsonFile(dijiFilePath);
    } else {
      dijiData = await selectJson(provinceItem.shengji, null);
      // 写入本地文件
      await writeJsonFile(dijiFilePath, dijiData, false);
    }

    for (const cityItem of dijiData) {
      const xianjiFilePath = buildFilePath(provinceItem.shengji, cityItem.diji);
      let xianjiData = {};
      if (await isFileExist(xianjiFilePath)) {
        // 优先从本地读取
        xianjiData = await readJsonFile(xianjiFilePath);
      } else {
        xianjiData = await selectJson(provinceItem.shengji, cityItem.diji);
        // 写入本地文件
        await writeJsonFile(xianjiFilePath, xianjiData, false);
      }
      cityItem.children = xianjiData;
    }
    provinceItem.children = dijiData;
  }

  const filePath = path.join(process.cwd(), "data", `source.all.json`);
  await writeJsonFile(filePath, provinces, false);

  return provinces;
};

/**
 * 区划级别枚举
 * @typedef {'shengji'|'diji'|'xianji'} Level
 */

/**
 * @typedef {Object} DivisionInfo
 * @property {string} quHuaDaiMa - 区划代码
 * @property {string} name - 区划名称
 * @property {string} quhao - 区号
 * @property {Level} level - 区划级别
 * @property {DivisionInfo[]} children - 子节点
 */

/**
 * DivisionSource to DivisionInfo
 * @param {DivisionSource} divisionSource
 * @param {Level} level - 区划级别
 * @returns {DivisionInfo}
 */
const toDivisionInfo = (divisionSource, level) => {
  let name = "";
  if ("shengji" === level) {
    name = divisionSource.shengji;
  } else if ("diji" === level) {
    name = divisionSource.diji;
  } else if ("xianji" === level) {
    name = divisionSource.xianji;
  }
  const info = {
    children: [],
    level: level,
    name: name,
    quHao: divisionSource.quhao,
    quHuaDaiMa: divisionSource.quHuaDaiMa,
  };

  return info;
};

/**
 * write dist all
 */
const writeDistAllFromSourceAll = async (sourceAllJsonData) => {
  const datas = [];
  for (const provinceItem of sourceAllJsonData) {
    const provinceInfoItem = toDivisionInfo(provinceItem, "shengji");
    const dijiSourceData = provinceItem.children || [];
    for (const cityItem of dijiSourceData) {
      const cityInfoItem = toDivisionInfo(cityItem, "diji");
      const xianjiSourceData = cityItem.children || [];
      for (const areaItem of xianjiSourceData) {
        const xianjiInfoItem = toDivisionInfo(areaItem, "xianji");
        cityInfoItem.children.push(xianjiInfoItem);
      }
      provinceInfoItem.children.push(cityInfoItem);
    }
    datas.push(provinceInfoItem);
  }

  const distAllPath = path.join(process.cwd(), "data", `data.all.json`);
  await writeJsonFile(distAllPath, datas, false);

  const distMinPath = path.join(process.cwd(), "data", `data.min.json`);
  await writeJsonFile(distMinPath, datas, true);
  return datas;
};

export {
  buildFilePath,
  isFileExist,
  readJsonFile,
  readProvinces,
  toDivisionInfo,
  writeDistAllFromSourceAll,
  writeJsonFile,
  writeSourceAll,
};
