import { useNuxtApp } from '#imports';

function useWaa() {
  const waa = useNuxtApp().$waa;
  return waa.value;
}

export useWaa;
