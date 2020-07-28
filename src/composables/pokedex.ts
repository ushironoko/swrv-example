import { computed, ref, InjectionKey, inject } from 'vue'
import { AxiosRequestConfig } from 'axios'

type RequestDataKey = ReturnType<typeof useRequestConfig>
export const requestSymbol: InjectionKey<RequestDataKey> = Symbol()

const id = ref(1)
const nextPokemon = () => {
  id.value++
}

export const useRequestConfig = () => {
  return computed(() => {
    return {
      method: 'get',
      url: `https://pokeapi.co/api/v2/pokemon/${id.value}`,
    } as AxiosRequestConfig
  })
}

export function useRequestData() {
  const reqConf = inject(requestSymbol)
  if (!reqConf) {
    throw new Error('usePokeuseRequestDatamons() is called without provider.')
  }
  return {
    reqConf,
    id: id,
    nextPokemon,
  }
}
