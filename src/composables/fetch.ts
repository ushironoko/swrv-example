import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import useSWRV, { IConfig } from 'swrv'
import { Ref } from 'vue'

type RequestKey = (() => AxiosRequestConfig) | AxiosRequestConfig

export const useRequest = <Data = unknown, Error = unknown>(
  request: Ref<RequestKey>,
  config?: IConfig,
) => {
  console.log(request)
  return useSWRV<AxiosResponse<Data>, AxiosError<Error>>(
    () => JSON.stringify(request.value),
    (key) => axios(JSON.parse(key)),
    config,
  )
}
