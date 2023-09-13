import { defineNuxtPlugin, useRuntimeConfig } from '#imports';
import { ref } from 'vue';
import { initWideAngle } from 'wideangle-vuejs';

export default defineNuxtPlugin(() => {
  if(process.server) {
    console.warn("[WAA] Plugin will not be enabled on server side.");
    return;
  }

  const { wideangle: options } = useRuntimeConfig().public
  console.debug(`[WAA] Initializing Wide Angle Analytics with: ${JSON.stringify(options)}`);
  if(options.siteId == null) {
    throw new Error("[WAA] Wide Angle Analytics requires the site ID.");
  }
  const waa = ref()
  initWideAngle(options)
    .then(waaInstance => {
      waa.value = waaInstance;
      console.debug("[WAA] Wide Angle Analytics instance available");
    }).catch(e => { console.error("[WAA] Failed to load Wide Angle Plugin", e)});

  return {
    provide: {
      waa
    }
  }
})


