import Login from "../pages/auth/login.vue";
import Register from "../pages/auth/register.vue";
import MessengerPage from "../pages/messanger/index.vue";
import {createRouter, createWebHistory} from 'vue-router'
import GuestMiddleware from "../middlewares/guest-middleware.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";
import Components from "../pages/components.vue";

export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const MESSANGER_ROUTE = '/'
export const HOME_ROUTE = MESSANGER_ROUTE
export const ERROR_ROUTE = '/login'

const routes = [
    {
        path: LOGIN_ROUTE,
        component: Login,
        meta: {
            middleware: [GuestMiddleware ,],
            layout: 'empty'
        },
    },
    {
        path: '/components',
        component: Components,
        meta: {layout: 'empty'},
    },
    {
        path: REGISTER_ROUTE,
        component: Register,
        meta: {
            middleware: [GuestMiddleware],
        },
    },
    {
        path: MESSANGER_ROUTE,
        component: MessengerPage,
        meta: {
            middleware: [AuthMiddleware],
            layout: 'empty'
        },
    },
];


export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach(async (to, from) => {
    const middlewares = to.meta.middleware ?? []
    let isGood
    let middleware
    try {
        middlewares.forEach((middlewareClass) => {
            middleware = middlewareClass.create(router)
            if (typeof middleware.check !== "function") {
                throw "Error middleware without method 'check': route - " + to.path
            }
            isGood = middleware.check()
            if (typeof middleware.render === "function" && !isGood) {
                throw(middleware.message())
            }
        })

        return true
    } catch (error) {
        console.log(error)
        alert(error)
        return false
    }
})
