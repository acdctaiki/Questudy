import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages の「ユーザー名.github.io/リポジトリ名/」配下でも
  // CSS・JavaScriptを正しく読み込めるよう、生成パスを相対化する。
  base: './',
  esbuild: {
    jsx: 'automatic',
  },
})
