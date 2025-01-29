// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-01-28",
  modules: ['wideangle-nuxt'],
  // ssr: false,
  runtimeConfig: {
    public: {
      wideangle: {
        siteId: "8D27G3B9ACA01F4241",
        domain: "events.wideangle.test",
        fingerprint: false,
        suppressDnt: true
      }
    }
  }
})
