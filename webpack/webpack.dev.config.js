const defaultConfig = require("./webpack.config");

const devConfig = Object.assign({}, defaultConfig);

devConfig.devServer = {
    historyApiFallback: true,
    inline: true,
    publicPath: "/",
};

module.exports = devConfig;
