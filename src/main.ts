import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from "vue-router";
import routes from "./config/route";
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
// 3. 注册你需要的组件
app.use(Vant)

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes // (缩写) 相当于 routes: routes
})

app.use(router)
app.mount('#app')










