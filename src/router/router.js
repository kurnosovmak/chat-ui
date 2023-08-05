import Index from "../pages/index.vue";
import Login from "../pages/auth/login.vue";
import {createRouter, createWebHistory} from 'vue-router'
import GuestMiddleware from "../middlewares/guest-middleware.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";

export const HOME_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/login'
export const ERROR_ROUTE = '/login'

const routes = [
    {
        path: HOME_ROUTE,
        component: Index,
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: LOGIN_ROUTE,
        component: Login,
        meta: {
            middleware: [GuestMiddleware],
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
