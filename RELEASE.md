# 发布指南

## 构建 JSON 数据

```shell
# 安装依赖
npm install

# 运行构建
npm run build

# 检查输出
data/source.all.json # 原始数据
data/dist.all.json   # 处理后的数据
data/dist.min.json   # 可发布的数据
```

注意：

- `data/province/provinces.json` 文件是基础数据，不能删除。
- 如果需要重新生成部分数据，有以下方式：
  - 修改 `data/city/` 或 `data/area/` 下的指定 JSON 文件，然后重新运行构建。
  - 删除 `data/city/` 或 `data/area/` 下的指定 JSON 文件，然后重新运行构建（会从网络重新抓取）。
- 如果把 `data/city/` 和 `data/area/` 全部删除，则会从网络重新抓取所有数据。

重新运行构建后，重新检查输出文件。

## 发布到 npm

```shell
# 1. 登录 npm（如果没有账号，先去 npmjs.com 注册）
npm login

# 2. 检查包名是否可用
npm search china-administrative-divisions-json

# 3. 发布
npm publish

# 如果是第一次发布，可能需要
npm publish --access public
```
