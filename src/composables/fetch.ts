import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import useSWRV, { IConfig } from 'swrv'
import { Ref } from 'vue'

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
