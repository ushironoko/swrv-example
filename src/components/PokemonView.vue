<script lang="ts">
import { defineComponent } from 'vue'
import { useRequest, useRequestData } from '../composables/fetch'
import { PokemonData } from '../composables/pokedex'

export default defineComponent({
  name: 'PokemonView',
  async setup() {
    const { reqConf } = useRequestData()
    const { data, error } = await useRequest<PokemonData>(reqConf)

    return {
      data,
      error,
    }
  },
})
</script>

<template>
  <div>
    <img :src="data.data.sprites.front_default" />
    <div v-if="error">{{ error }}</div>
  </div>
</template>
