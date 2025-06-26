import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['src'], // 限定要生成的声明文件范围
      outDir: 'dist/types',
      insertTypesEntry: true, // 自动生成 index.d.ts
      copyDtsFiles: true, // 拷贝已有的 .d.ts 文件（如果有）
    }),
  ],
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
      fileName: 'index', // 打包后的文件名：vue-markdown-stream.js
      formats: ['es'], // ✅ 只打包成 ES 模块
    },
    rollupOptions: {
      // 确保外部化处理所有的 peer dependencies
      external: ['vue'], // 将 `vue` 排除在打包之外，确保用户自己提供
    },
  },
})
