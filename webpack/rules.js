const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const fileRule = {
    test: /\.(eot|jpeg|jpg|png|svg|ttf|woff|woff2)/,
    use: 'file-loader',
};

const sassRule = {
    test: /\.scss$/,
    use: [
        {
            loader: process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
        },
        {
            loader: "css-loader", options: {
                sourceMap: true,
            },
        },
        {
            loader: "sass-loader", options: {
                sourceMap: true,
            },
        },
    ],
};

const sourceMapRule = {
    enforce: "pre",
    exclude: [/node_modules/, /dist/],
    loader: "source-map-loader",
    test: /\.js$/,
};

const tsRule = {
    loader: "awesome-typescript-loader",
    test: /\.tsx?$/,
    options: {
        cacheDirectory: path.resolve("node_modules", ".cache", "atl"),
        useCache: true,
    },
};

module.exports = {
    "file": fileRule,
    "sass": sassRule,
    "sourceMap": sourceMapRule,
    "ts": tsRule,
};
