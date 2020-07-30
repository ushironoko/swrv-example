<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRequest, useRequestData } from '../composables/fetch'
import { PokemonData } from '../composables/pokedex'

export default defineComponent({
  name: 'PokemonView',
  setup() {
    const { reqConf } = useRequestData()
    const { data, error, isValidating } = useRequest<PokemonData>(reqConf)
    const isShiny = ref(false)
    const resolvePath = computed(() =>
      isShiny.value ? 'front_shiny' : 'front_default',
    )
    const imgPath = computed(() => {
      return data?.value?.data?.sprites[resolvePath.value] || ''
    })

    function changeShiny() {
      isShiny.value = !isShiny.value
    }

    return {
      data,
      error,
      isValidating,
      imgPath,
      changeShiny,
    }
  },
})
</script>

<template>
  <div>
    <div v-if="!isValidating">
      <img :src="imgPath" width="360" height="360" />
      <div v-if="error">{{ error.message }}</div>
    </div>
    <div v-else>
      <img src="../assets/hqdefault.jpg" />
    </div>
    <input id="shiny" type="checkbox" @change="changeShiny" />
    <label for="shiny">shiny</label>
  </div>
</template>
