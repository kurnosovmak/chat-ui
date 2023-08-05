<script setup>

import AuthAdapter from "../adapters/auth-adapter.js";
import {useRouter} from "vue-router";
import {LOGIN_ROUTE} from "../router/router.js";

const authAdapter = AuthAdapter.create()
const router = useRouter()
const logout = () => {
  authAdapter.logout()
  router.push(LOGIN_ROUTE)
}
</script>

<template>
  <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
  <div v-if="authAdapter.isAuth()" @click="logout" class="cursor-pointer">logout</div>
</template>