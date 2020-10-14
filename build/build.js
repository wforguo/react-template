/**
 * @Description: build.js
 * @author: forguo
 * @date: 2020/9/19
*/
const prodConfig = require('./../config/webpack.prod');
const webpack = require("webpack");
const compiler = webpack(prodConfig);

compiler.run((error, stats) => {
    if (error) {
        console.error(error);
        return false;
    }
});
