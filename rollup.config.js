import { nodeResolve } from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-import-css";
import dotenv from "rollup-plugin-dotenv"

export default {
    input: "src/app.js",
    output: {
        file: "dist/bundle.js",
        format: "esm"
    },
    plugins: [
        nodeResolve(),
        css({ output: "bundle.css" }),
        dotenv(),
    ]
};