// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // ssr: false,
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },

    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  modules: [
    'nuxt-icon',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@nuxtjs/sitemap',
    'nuxt-simple-robots',
    'nuxt-schema-org',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-disqus',
    'turnstile',
    '@stefanobartoletti/nuxt-social-share',
  ],

  sitemap: {
    cacheMaxAgeSeconds: 3600,
    sources: ['/api/sitemap'],
  },

  image: {
    quality: 80,
    format: ['webp']
  },

  site: {
    url: 'https://manhwa18.com',
  },
  socialShare: {
    baseUrl: 'https://manhwa18.com' // required!
    // other optional module options
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://cdn3.manhwa18.com/api/v1',
      recaptchaSiteKey: '6LeH528qAAAAACZPtCIdP9fUP5viMvsEzSkCQHoN'
    },
  },
  disqus: {
    shortname: "webtoonx-3",
  },
  css: [
    '@/assets/css/main.css',
  ],

  compatibilityDate: '2024-10-25',
})