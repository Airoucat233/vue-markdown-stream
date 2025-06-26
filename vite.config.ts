import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: './src/index.ts', // 入口文件，通常是你的组件库的主文件
      name: 'VueMarkdownStream', // 你的库的全局变量名
    },
    rollupOptions: {
      // 确保外部化处理所有的 peer dependencies
      external: ['vue'], // 将 `vue` 排除在打包之外，确保用户自己提供
      output: [
        {
          format: 'es',
          dir: 'dist/es', // 将 ES 模块输出到 dist/es 目录
          preserveModules: true, // 🔥 保留模块结构
          preserveModulesRoot: '.', // 🔥 从项目根目录开始保留结构
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs', // 将 CommonJS 模块输出到 dist/cjs 目录
          preserveModules: true, // 🔥 保留模块结构
          preserveModulesRoot: '.', // 🔥 从项目根目录开始保留结构
          entryFileNames: '[name].js',
        },
      ],
    },
  },
})
