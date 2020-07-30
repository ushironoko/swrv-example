<script lang="ts">
import { defineComponent } from 'vue'
import { useRequest, useRequestData } from '../composables/fetch'
import { PokemonData } from '../composables/pokedex'

export default defineComponent({
  name: 'PokemonView',
  setup() {
    const { reqConf } = useRequestData()
    const { data, error, isValidating } = useRequest<PokemonData>(reqConf)

    return {
      data,
      error,
      isValidating,
    }
  },
})
</script>

<template>
  <div v-if="!isValidating">
    <img :src="data.data.sprites.front_default" width="360" height="360" />
    <div v-if="error">{{ error.message }}</div>
  </div>
  <div v-else>
    <img src="../assets/hqdefault.jpg" />
  </div>
</template>
