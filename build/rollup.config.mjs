import progress from "rollup-plugin-progress"; // 展示进度
import resolve from "@rollup/plugin-node-resolve"; // 你的包用到第三方npm包
import typescript from "rollup-plugin-typescript2"; // 处理typescript
import commonjs from "@rollup/plugin-commonjs"; // 你的包用到的第三方只有commonjs形式的包
import { terser } from "rollup-plugin-terser"; // Minify a bundle using Terser.
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: [
    // {
    //     file: 'dist/index.esm.js', // package.json 中 "module": "dist/index.esm.js"
    //     format: 'esm', // es module 形式的包， 用来import 导入， 可以tree shaking
    //     sourcemap: true
    // },
    // {
    //     file: 'dist/index.cjs.js', // package.json 中 "main": "dist/index.cjs.js",
    //     format: 'cjs', // commonjs 形式的包， require 导入
    //     sourcemap: true
    // },
    {
      file: "dist/index.umd.js",
      format: "umd", // umd 兼容形式的包， 可以直接应用于网页 script
      name: "$key",
      sourcemap: true,
    },
  ],
  plugins: [
    progress({
      clearLine: false, // default: true
    }),
    json(),
    resolve(),
    commonjs(),
    terser(),
    typescript({
      tsconfig: "tsconfig.json",
    }),
  ],
};
