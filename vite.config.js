import vue from '@vitejs/plugin-vue';
import path from "path";
import { defineConfig } from 'vite';
import { viteMockServe } from "vite-plugin-mock";


export default defineConfig({
  base: '/nft-meta-wall/', // gh-pages 設定路徑
  // base: '/', // local測試
  plugins: [
    vue(),
    viteMockServe({
      supportTs: true
    })
  ],
  resolve: {
    alias: {'@/': `${path.resolve(__dirname, 'src')}/`}
  },
})
