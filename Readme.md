# cloud-app-react

> 云上

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## css reset
`normalize.css`

## UI库

Antd Mobile

按需加载

- 1.安装

```bash babel-plugin-import
npm install babel-plugin-import --save-dev
```

- 2.修改配置

```javascript
// .babelrc or babel-loader option
{
  "plugins": [
    ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
  ]
}

```

- 3.引入

```javascript
// babel-plugin-import 会帮助你加载 JS 和 CSS
import { DatePicker } from 'antd-mobile';
```

## 适配

### lib-flexible

> https://github.com/amfe/lib-flexible

### postcss-pxtorem

> https://github.com/cuth/postcss-pxtorem

- 安装

```bash
npm install postcss-pxtorem -D
```

- 配置

编辑`postcss.config.js`，添加

项目中使用设计稿宽度：750px

```javascript
module.exports = {
    plugins: {
        autoprefixer: {},
        // +
        'postcss-pxtorem': {
            rootValue: 37.5,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            propList: ['*']
        }
        // +
    }
}
```

-  忽略转换

```less

// `px` is converted to `rem`
.convert {
    font-size: 16px; // converted to 1rem
}

// `Px` or `PX` is ignored by `postcss-pxtorem` but still accepted by browsers
.ignore {
    border: 1Px solid; // ignored
    border-width: 2PX; // ignored
}
```

## loaders

https://github.com/ConnorAtherton/loaders.css

## 云开发

### 使用

- 1.修改 `cloudbaserc.json`

## 链接

- https://cloud-app.com.cn/apps/cloud-app-react

## 接口

http://forguo.cn/star/getQsList这个是获取问题列表接口

http://forguo.cn/star/answer这个是回答接口
回答格式：
{
    "categoryId": 1,
    "qsId": 1,
    "content": "测试",
    "name":"test"
}
