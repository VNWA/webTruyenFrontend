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
    url: 'https://localhost:300',
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api/v1',
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
})