import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { KJRequestInterceptors, KJRequestConfig } from "./type";

import { ElLoading } from "element-plus";

//不同实例的所有请求，同一实例的所有请求，同一实例的部分请求

const DEAFULT_LOADING = true;

class KJRequest {
  instance: AxiosInstance;
  interceptors?: KJRequestInterceptors;
  loading?: any;
  showLoading: boolean;

  constructor(config: KJRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有的实例都有的拦截器：请求成功拦截");
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据",
            background: "rgba(0,0,0,0.5)",
          });
        }

        return config;
      },
      (err) => {
        console.log("所有实例都有的拦截器：请求失败拦截");
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有的实例都有的拦截器：响应成功拦截");

        //将loading移除
        this.loading?.close();

        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~，错误信息");
        } else {
          return data;
        }
        return res.data;
      },
      (err) => {
        console.log("所有的实例都有的拦截器：响应失败拦截");

        //将loading移除
        this.loading?.close();

        //例子：判断不同的HttpErrorCode，显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误");
        }
        return err;
      }
    );
  }

  request<T>(config: KJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: any): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T>(config: any): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T>(config: any): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T>(config: any): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default KJRequest;
