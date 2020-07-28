<script lang="ts">
import { defineComponent } from 'vue'
import PokemonView from './components/PokemonView.vue'
import { useRequestData } from './composables/fetch'

export default defineComponent({
  name: 'App',
  components: {
    PokemonView,
  },
  setup() {
    const { nextPokemon } = useRequestData()
    return {
      nextPokemon,
    }
  },
})
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <PokemonView />
      </template>
      <template #fallback>
        <img src="./assets/hqdefault.jpg" />
      </template>
    </Suspense>
    <button @click="nextPokemon">next</button>
  </div>
</template>
