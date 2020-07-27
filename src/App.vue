<script lang="ts">
import { AxiosRequestConfig } from 'axios'
import { defineComponent, computed, ref } from 'vue'
import { useRequest } from './composables/fetch'

export default defineComponent({
  name: 'App',
  setup() {
    let name = ref('')
    let data = ref()
    let error = ref()

    function getPokeData() {
      if (!name.value) return
      const request = computed(() => {
        return {
          method: 'get',
          url: `https://pokeapi.co/api/v2/pokemon/${name.value}`,
        } as AxiosRequestConfig
      })

      const result = useRequest(request)
      data.value = result.data
      error.value = result.error
    }

    return {
      name,
      getPokeData,
      data,
      error,
    }
  },
})
</script>

<template>
  <div>
    <input v-model="name" type="text" />
    <button @click="getPokeData">Get!</button>
    <div v-if="data">
      {{ data.data.sprites.front_default }}
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="!data && !error">Loading...</div>
  </div>
</template>
