<template>
  <main>
    <h1>Nuxt Application</h1>
    <button @click="trackClick">
      Track Click
    </button>
  </main>
</template>

<script setup lang="ts">
import { useWaaEvent } from "#imports";

function trackClick() {
  useWaaEvent("foo", {"name": "bar"});
}
</script>

<style>

main {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 2rem;
  align-items: center;
  margin: 0 auto;
  text-align: center;
}

button {
  padding: 1rem;
}

</style>
