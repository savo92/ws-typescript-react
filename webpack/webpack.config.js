const path = require("path");

const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const rules = require("./rules");

process.env.ENVIRONMENT = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV !== "production";
const outputDir = path.resolve("dist");

const plugins = [
    new HtmlWebpackPlugin({
        inject: false,
        template: "./src/index.html",
        title: "ws-typescript-react",
    }),
    new ManifestPlugin({ fileName: "manifest.json" }),
    new MiniCssExtractPlugin(),
    new webpack.EnvironmentPlugin(["ENVIRONMENT", "NODE_ENV"]),
];

module.exports = {
    devtool: isDev ? "cheap-module-source-map" : "source-map",
    entry: "./src/index.tsx",

    mode: process.env.NODE_ENV,

    module: {
        rules: [
            rules.file,
            rules.sass,
            rules.sourceMap,
            rules.ts,
        ],
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },
        },
    },

    output: {
        filename: isDev ? "[name].js" : "[name]-[chunkhash].min.js",
        path: outputDir,
    },

    plugins: plugins,

    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
        ],
    },

    stats: {
        assets: true,
        children: true,
        chunks: true,
        chunkModules: true,
        hash: true,
        modules: true,
        timings: true,
    },

    watchOptions: {
        ignored: ["/node_modules/"],
    },
};
