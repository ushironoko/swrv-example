<script lang="ts">
import { defineComponent } from 'vue'
import { useRequest, useRequestData } from '../composables/fetch'

export default defineComponent({
  name: 'App',
  async setup() {
    const { reqConf } = useRequestData()
    const { data, isValidating, error } = await useRequest(reqConf)
    return {
      data,
      isValidating,
      error,
    }
  },
})
</script>

<template>
  <div>
    <div v-if="!isValidating && data">
      <img :src="data.data.sprites.front_default" />
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
