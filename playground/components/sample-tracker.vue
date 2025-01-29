<template>
  <button @click="sendEvent">Send Event</button>
</template>

<script setup>
import { useWideAngle } from '#imports';

const sendEvent = () => {
  useWideAngle().dispatchEvent('foo', {'param1': 'bar'}, {'value1': 123});
}
</script>
