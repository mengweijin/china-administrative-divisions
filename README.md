# China administrative divisions

<p align="center">
  <a target="_blank" href="https://github.com/mengweijin/china-administrative-divisions">
		<img src="https://img.shields.io/badge/repo-Github-purple" />
	</a>
  <a target="_blank" href="https://gitee.com/mengweijin/china-administrative-divisions">
		<img src="https://img.shields.io/badge/repo-码云 Gitee-purple" />
	</a>
	<a target="_blank" href="https://www.npmjs.com/package/china-administrative-divisions">
		<img src="https://img.shields.io/npm/v/china-administrative-divisions.svg" />
	</a>
  <a target="_blank" href="https://github.com/mengweijin/china-administrative-divisions/blob/master/LICENSE">
		<img src="https://img.shields.io/badge/license-Apache2.0-blue.svg" />
	</a>
  <a target="_blank" href="https://gitee.com/mengweijin/china-administrative-divisions/stargazers">
		<img src="https://gitee.com/mengweijin/china-administrative-divisions/badge/star.svg?theme=dark" alt='gitee star'/>
	</a>
  <a href='https://gitee.com/mengweijin/china-administrative-divisions/members'>
    <img src='https://gitee.com/mengweijin/china-administrative-divisions/badge/fork.svg?theme=dark' alt='gitee fork'>
  </a>
	<a target="_blank" href='https://github.com/mengweijin/china-administrative-divisions'>
		<img src="https://img.shields.io/github/stars/mengweijin/china-administrative-divisions?style=social" alt="github star"/>
	</a>
	<a target="_blank" href='https://github.com/mengweijin/china-administrative-divisions'>
		<img src="https://img.shields.io/github/forks/mengweijin/china-administrative-divisions?style=social" alt="github fork"/>
	</a>
</p>

中国行政区划（省、市、区/县）JSON 数据。

## 前端使用

```shell
# 安装
npm install china-administrative-divisions-json
```

```js
// ES 使用
import chinaAdministrativeDivisionJson from "china-administrative-divisions-json";
```

其中，chinaAdministrativeDivisionJson 是一个 JSON ARRAY 对象，其结构如下：

```json
[
  {
    "quHuaDaiMa": "510000",
    "name": "四川省（川、蜀）",
    "quHao": null,
    "level": "shengji",
    "children": [
      {
        "quHuaDaiMa": "510100",
        "name": "成都市",
        "quHao": "028",
        "level": "diji",
        "children": [
          {
            "quHuaDaiMa": "510107",
            "name": "武侯区",
            "quHao": "028",
            "level": "xianji",
            "children": []
          }
          // 此处省略其它数据......
        ]
      }
      // 此处省略其它数据......
    ]
  }
  // 此处省略其它数据......
]
```

得到了这个 JSON ARRAY 对象以后，就可以在 JavaScript 中使用了。

## 后端使用

后端可直接从目录下获取 `./data/data.min.json` 文件，放到自己的工程里，然后读取使用。
