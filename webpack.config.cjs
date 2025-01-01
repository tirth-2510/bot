const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: "./src/main.tsx",
    mode: "production",
    output: {
        filename: "digibot.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: "svg-inline-loader",
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
};
