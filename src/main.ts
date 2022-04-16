import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import store from "./store";

import kjRequest from "./service";

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

kjRequest
  .get<DataType>({
    url: "/home/multidata",
    method: "GET",
    // showLoading: false,
  })
  .then((res) => {
    console.log(res.data);
    console.log(res.returnCode);
    console.log(res.success);
  });
