<script setup lang="ts">
import AuthAdapter from "../../../../adapters/auth-adapter.js";
import {useRouter} from "vue-router";
import {LOGIN_ROUTE} from "../../../../router/router.js";

const authAdapter = AuthAdapter.create()
const router = useRouter()

const logout = () => {
  authAdapter.logout()
  router.push(LOGIN_ROUTE)
}
</script>

<template>
  <button @click="logout" class="h-[28px] w-[28px] rounded-[4px] flex justify-center items-center bg-transparent hover:bg-white-dark">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.5 6V3.5C11.5 3.10218 11.342 2.72064 11.0607 2.43934C10.7794 2.15804 10.3979 2 10 2L3.56067 2C3.16284 2 2.78131 2.15804 2.50001 2.43934C2.2187 2.72064 2.06067 3.10218 2.06067 3.5V8V12.5C2.06067 12.8978 2.2187 13.2794 2.50001 13.5607C2.78131 13.842 3.16284 14 3.56067 14H10C10.3979 14 10.7794 13.842 11.0607 13.5607C11.342 13.2794 11.5 12.8978 11.5 12.5V10M13.5 10L15.5 8M15.5 8L13.5 6M15.5 8H5.5" stroke="#FF3D3D" stroke-opacity="0.7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<style scoped>

</style>