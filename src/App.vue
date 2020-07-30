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
    const { nextPokemon, prevPokemon } = useRequestData()
    return {
      nextPokemon,
      prevPokemon,
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
        Loading...
      </template>
    </Suspense>
    <button @click="prevPokemon">prev</button>
    <button @click="nextPokemon">next</button>
  </div>
</template>
