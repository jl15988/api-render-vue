import { defineConfig } from 'vitepress'
// @ts-ignore
import typedocSidebar from '../api/typedoc-sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/api-render-vue/',
  title: "API Render Vue API 文档",
  description: "An API data parsing tool.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'API文档', link: '/api/' },
    ],

    sidebar: typedocSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jl15988/api-render-vue' }
    ]
  }
})
