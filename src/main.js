import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'
import {router} from "./router/router.js";
import {BASE_URL_DOMAIN} from "./repositories/auth/useApiAuth.js";
import Echo from "laravel-echo"
import io from 'socket.io-client';

window.io = io;

// window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: 'chat.loc:6001',
//     transports: ['websocket'],
// })


createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(createPinia())
    .mount('#app')
