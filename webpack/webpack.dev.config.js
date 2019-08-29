const defaultConfig = require("./webpack.config");

const devConfig = Object.assign({}, defaultConfig);

// Enable a local server listening on localhost:8080
// It will expose our app and live reload (enable by default)
// will listen for source code changes to rebuild our app and reload the browser page.
// Here you could also configure a proxy in cases where, as example, your UI
// is talking to a web server exposed by another port.
devConfig.devServer = {
    historyApiFallback: true,
    inline: true,
    publicPath: "/",
};

module.exports = devConfig;
