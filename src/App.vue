<script lang="ts">
import { defineComponent } from 'vue'
import PokemonView from './components/PokemonView.vue'
import { useRequestData } from './composables/pokedex'

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
        <div>
          <img src="./assets/hqdefault.jpg" />
        </div>
      </template>
    </Suspense>
    <button @click="nextPokemon">next</button>
  </div>
</template>
