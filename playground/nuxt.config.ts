export default defineNuxtConfig({
  modules: ['../src/module'],
  runtimeConfig: {
    public: {
      wideangle: {
        siteId: "7982G3B9ACB1BF4380",
        fingerprint: true,
        supressDnt: true
      }
    }
  }
});
