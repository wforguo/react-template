cloud-app-react
## css reset

`normalize.css`

## 域名

- http://intro.zhilun-k8s.com
- https://intro-t.zcrubber.com
- https://intro.zcrubber.com

## bash

##### 启动
```bash
yarn start
```

##### 打包

```bash
yarn build
```

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

## 统计代码

> mta

```javascript
    // 统计代码
    var _mtac = {};
    (function() {
        var mta = document.createElement("script");
        mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
        mta.setAttribute("name", "MTAH5");
        mta.setAttribute("sid", "500728671");

        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    })();
```
