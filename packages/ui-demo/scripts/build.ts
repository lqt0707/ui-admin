const fs = require("fs-extra");
const path = require("path");
import { config } from "../vite.config";
import { build, InlineConfig, defineConfig, UserConfig } from "vite";

const buildAll = async () => {
  //全量打包
  await build(defineConfig(config as UserConfig) as InlineConfig);

  const srcDir = path.resolve(__dirname, "../src/");
  fs.readdirSync(srcDir)
    .filter((name) => {
      // 只要目录不要文件，里面包含index.js
      const componentDir = path.resolve(srcDir, name);
      const isDir = fs.lstatSync(componentDir).isDirectory();
      return isDir && fs.readdirSync(componentDir).includes("index.ts");
    })
    .forEach(async (name) => {
      const outDir = path.resolve(config.build.outDir, name);
      const custom = {
        lib: {
          entry: path.resolve(srcDir, name),
          name, // 导出模块名
          fileName: "index",
          formats: [`es`, `umd`],
        },
        outDir,
      };
      Object.assign(config.build, custom);
      await build(defineConfig(config as UserConfig) as InlineConfig);
      fs.outputFile(
        path.resolve(outDir, `package.json`),
        `{
            "name": "ui-demo-lqt/${name}",
            "main": "index.umd.js",
            "module": "index.umd.js",
        }`,
        `utf-8`
      );
    });
};

buildAll();
