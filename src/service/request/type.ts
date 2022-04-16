import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface KJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface KJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: KJRequestInterceptors<T>;
  showLoading?: boolean;
}
