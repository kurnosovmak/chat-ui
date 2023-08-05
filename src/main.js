import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'
import {router} from "./router/router.js";

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(createPinia())
    .mount('#app')
