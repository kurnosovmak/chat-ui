<script setup>
import {useApiAuth} from "../../repositories/auth/useApiAuth.js";
import {ref} from "vue";
import AuthAdapter from "../../adapters/auth-adapter.js";
import {useRouter} from "vue-router";
import {HOME_ROUTE} from "../../router/router.js";

const ApiAuth = useApiAuth()
const router = useRouter()

const authAdapter = AuthAdapter.create()

const formLoginFields = ref({
  email: '',
  password: '',
  remember: false,
})

const isFormLoading = ref(false)
const errorMessage = ref('')

const formLoginEvent = async () => {
  isFormLoading.value = true

  const resp = await authAdapter.login(formLoginFields.value.email, formLoginFields.value.password);
  if(resp.isError()){
    errorMessage.value = resp.getErrorMessage()
  } else {
    router.push(HOME_ROUTE)
  }

  isFormLoading.value = false
}

</script>

<template>
  <form @submit.prevent="formLoginEvent">
    <section class="flex justify-center items-center h-screen bg-gray-100">
      <div class="max-w-md w-full bg-white rounded p-6 space-y-4">
        <div class="mb-4">
          <p class="text-gray-600">Войдите в систему</p>
          <h2 class="text-xl font-bold">Join our community</h2>
        </div>
        <div>
          <input v-model="formLoginFields.email"
                 type="email" required placeholder="Email"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>
        <div>
          <input v-model="formLoginFields.password"
                 type="password" required placeholder="Password"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>
        <div v-if="errorMessage !== ''">
          <span class="ml-2 text-sm font-normal text-red-600">
            {{errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}}
          </span>
        </div>
        <div>
          <button type="submit"
                  :disabled="isFormLoading"
                  class="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200 disabled:opacity-40 disabled:cursor-wait">
            {{!isFormLoading ? 'Войти' : 'Загрузка'}}
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-row items-center">
            <input v-model="formLoginFields.remember" type="checkbox"
                   :disabled="isFormLoading"
                   class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded disabled:cursor-not-allowed">
            <label for="comments" class="ml-2 text-sm font-normal text-gray-600">Запомнить это устройство</label>
          </div>
          <div>
            <a class="text-sm text-blue-600 hover:underline" href="#">Forgot password?</a>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped>

</style>