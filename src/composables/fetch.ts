import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import useSWRV, { IConfig } from 'swrv'
import { Ref, InjectionKey, ref, computed, inject } from 'vue'

export type RequestKey = (() => AxiosRequestConfig) | AxiosRequestConfig

export async function useRequest<Data = unknown, Error = unknown>(
  request: Ref<RequestKey>,
  config?: IConfig,
) {
  return await useSWRV<AxiosResponse<Data>, AxiosError<Error>>(
    () => JSON.stringify(request.value),
    (key) => axios(JSON.parse(key)),
    config,
  )
}

type RequestDataKey = ReturnType<typeof useRequestConfig>
export const requestSymbol: InjectionKey<RequestDataKey> = Symbol()

const id = ref(1)
const nextPokemon = () => id.value++
const prevPokemon = () => id.value--

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
    throw new Error('useRequestData() is called without provider.')
  }
  return {
    reqConf,
    id: id,
    nextPokemon,
    prevPokemon,
  }
}
