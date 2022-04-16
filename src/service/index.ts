// service统一出口
import KJRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
const kjRequest = new KJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log("请求成功的拦截");
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("请求失败的拦截");
      return err;
    },
    responseInterceptor: (config) => {
      console.log("响应成功的拦截");
      return config;
    },
    responseInterceptorCatch: (err) => {
      console.log("响应失败的拦截");
      return err;
    },
  },
});

export default kjRequest;
// import HYRequest from './request'
// import { BASE_URL, TIME_OUT } from './request/config'

// const hyRequest = new HYRequest({
//   baseURL: BASE_URL,
//   timeout: TIME_OUT,
//   interceptors: {
//     requestInterceptor: (config) => {
//       // 携带token的拦截
//       const token = ''
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }

//       console.log('请求成功的拦截')
//       return config
//     },
//     requestInterceptorCatch: (err) => {
//       console.log('请求失败的拦截')
//       return err
//     },
//     responseInterceptor: (res) => {
//       console.log('响应成功的拦截')
//       return res
//     },
//     responseInterceptorCatch: (err) => {
//       console.log('响应失败的拦截')
//       return err
//     }
//   }
// })

// export default hyRequest
