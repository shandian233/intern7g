const path = require("path");

module.exports = {
    mode: "development", //设置模式为开发模式
    devtool: 'source-map', //配置调试
    entry: "./src/Main.js",
    output: {
        path: path.join(__dirname,"bin/js"),
        filename: "bundle.js"
    }
}