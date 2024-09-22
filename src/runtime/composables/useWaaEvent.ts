import { useNuxtApp } from '#imports';

export function useWaaEvent (name: string, params?: Record<string, any>, values?: Record<string, number>) {
  const waa = useNuxtApp().$waa
  console.debug(`[WAA] Attempting to send Wide Angle event: ${name}`);
  if(waa && waa.value) {
    waa.value.dispatchEvent(name, params, values);
  } else {
    console.debug("[WAA] Wide Angle Analytics is not yest initialized");
  }
}
