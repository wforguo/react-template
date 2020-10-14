/**
 * @Description: start.js
 * @author: forguo
 * @date: 2020/9/19
*/
const devConfig = require('./../config/webpack.dev');
const webpack = require("webpack");
const compiler = webpack(devConfig);

compiler.run((error, stats) => {
    if (error) {
        console.error(error);
        return false;
    }
});
