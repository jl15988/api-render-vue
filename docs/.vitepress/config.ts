import { defineConfig } from 'vitepress'
// @ts-ignore
import typedocSidebar from '../api/typedoc-sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/api-render-vue/',
  title: "API Render Vue",
  description: "An API data parsing tool.",
  lastUpdated: true,
  lang: 'zh',
  head: [['link', { rel: 'icon', href: '/api-render-vue/logo.png' }]],
  themeConfig: {
    logo: '/logo-f.png',
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'API文档', link: '/api/' },
    ],

    sidebar: typedocSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jl15988/api-render-vue' }
    ],
  }
})
