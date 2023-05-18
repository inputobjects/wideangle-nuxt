import { useNuxtApp } from '#imports';

export function useWaaEvent (name: string, params?: Record<string, any>) {
  const waa = useNuxtApp().$waa
  if(waa && waa.value) {
    waa.value.dispatchEvent(name, params);
  } else {
    console.debug("[WAA] Wide Angle Analytics is not yest initialized");
  }
}
