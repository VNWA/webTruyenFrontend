import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
 nuxtApp.vueApp.use(VueGtag, {
  property: {
   id: 'G-PMR67PNF14'
  }
 })
})