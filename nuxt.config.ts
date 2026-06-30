// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  devtools: { enabled: true },

  // Material Web (Web Components) — tell Vue compiler to treat them as custom elements
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('md-'),
    },
  },

  css: ['~/assets/css/global.css'],

  app: {
    head: {
      title: 'M3 Resume Builder',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        // Google Fonts: Roboto + Noto Sans SC + Material Symbols
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,100..700,0..1,-50..200&display=swap',
        },
      ],
    },
  },

  // Server route for Puppeteer PDF export
  nitro: {
    preset: 'node-server',
  },
})
