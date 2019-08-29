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
    // To inject data and assets paths to the index.html.
    new HtmlWebpackPlugin({
        inject: false,
        template: "./src/index.html",
        title: "ws-typescript-react",
    }),
    // To produce a manifest that you can parse to find the real name of a asset file
    // Useful when the filename suffix is an hash (for cache invalidation purposes usually).
    new ManifestPlugin({ fileName: "manifest.json" }),
    // To extract styles in dedicated asset files
    new MiniCssExtractPlugin(),
    // To inject environment variables into our code.
    new webpack.EnvironmentPlugin(["ENVIRONMENT", "NODE_ENV"]),
];

module.exports = {
    devtool: isDev ? "cheap-module-source-map" : "source-map",

    // The entrypoint of the TypeScript app.
    entry: "./src/index.tsx",

    mode: process.env.NODE_ENV,

    module: {
        rules: [
            // These rules can be unsorted.
            // They define how to pre-process files, SASS, TypeScript.
            rules.file,
            rules.sass,
            rules.sourceMap,
            rules.ts,
        ],
    },

    optimization: {
        minimizer: [
            // Minify final JS.
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            // Minify CSS.
            new OptimizeCSSAssetsPlugin({}),
        ],
        // This config enables the split of the code in multiple files (both css and js files).
        // In this case, we produce a main and a vendor file:
        // - main contains our source code.
        // - vendor will contain all the package (from node_modules) that our source code imports.
        // Useful since our source code should change more often than the node_modules code
        // Well, as far as our deps are correctly locked (with a yarn.lock, as in this example project).
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
        // "[name]-[chunkhash].min.js" describes how Webpack will compose the filename of the JS bundle files.
        // This is very useful to enable long-term caching on client, since the hash will invalidate
        // the cache when a new version (w/ a new hash) is released.
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

    // Enable some stats that Webpack will send to the CLI output.
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
