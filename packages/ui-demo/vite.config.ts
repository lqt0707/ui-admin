/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "./config/unocss";
import { defineConfig, Plugin } from "vite";
const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    assetFileNames: `assets/[name].css`,
    globals: {
      vue: "Vue",
    },
  },
};
export const config = {
  plugins: [
    vue() as Plugin,
    // 添加JSX插件
    vueJsx() as Plugin,
    // 添加UnoCSS插件
    Unocss() as Plugin[],
  ],
  // 添加库模式配置
  build: {
    rollupOptions,
    minify: "terser", // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    reportCompressedSize: true, // 生成压缩大小报告
    lib: {
      entry: "./src/entry.ts",
      name: "UIDemo",
      fileName: "ui-demo-lqt",
      // 导出模块格式
      formats: ["esm", "umd", "iife"], // 导出模块类型
    },
    cssCodeSplit: true,
    outDir: "./dist",
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: "happy-dom",
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
};
export default defineConfig(config);
