<script setup>
import {useApiAuth} from "../../repositories/auth/useApiAuth.js";
import {computed, reactive, ref} from "vue";
import AuthAdapter from "../../adapters/auth-adapter.js";
import {useRouter} from "vue-router";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../router/router.js";

const router = useRouter()

const isCheckEmail = ref(false)
const idUser = ref(null)

const authAdapter = AuthAdapter.create()

const formEmail = ref()
const otpCont = reactive([])
const formEmailCheck = ref({
  f1: '',
  f2: '',
  f3: '',
  f4: '',
  f5: '',
  f6: '',
})

const getCode = () => {
  return formEmailCheck.value.f1 + ''
      + formEmailCheck.value.f2 + ''
      + formEmailCheck.value.f3 + ''
      + formEmailCheck.value.f4 + ''
      + formEmailCheck.value.f5 + ''
      + formEmailCheck.value.f6
}

const isAllFieldEmailCheck = computed(() => {
  return formEmailCheck.value.f1 !== ''
      && formEmailCheck.value.f2 !== ''
      && formEmailCheck.value.f3 !== ''
      && formEmailCheck.value.f4 !== ''
      && formEmailCheck.value.f5 !== ''
      && formEmailCheck.value.f6 !== ''
})

const paste = (event) => {
  event.preventDefault();

  let paste = (event.clipboardData || window.clipboardData).getData("text");
  if (!(new RegExp('^[0-9]{6}$')).test(paste)) {
    return;
  }
  formEmailCheck.value.f1 = paste.at(0)
  formEmailCheck.value.f2 = paste.at(1)
  formEmailCheck.value.f3 = paste.at(2)
  formEmailCheck.value.f4 = paste.at(3)
  formEmailCheck.value.f5 = paste.at(4)
  formEmailCheck.value.f6 = paste.at(5)
  otpCont[6].focus();
}
const handleKeyDown = (event, index) => {
  if (event.key !== "Tab" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }
  if (event.key === "Backspace") {
    formEmailCheck.value['f' + index] = '';

    if (index != 1) {
      otpCont[index - 1].focus();
    }

    return;
  }
  //
  if ((new RegExp('^([0-9])$')).test(event.key)) {
    formEmailCheck.value['f' + index] = event.key;

    if (index != 6) {
      otpCont[index + 1].focus();
    }
  }
}

const formRegisterFields = ref({
  name: '',
  family: '',
  patronymic: '',
  email: '',
  password: '',
})

const isFormLoading = ref(false)
const errorMessage = ref('')

const formRegisterEvent = async () => {
  isFormLoading.value = true
  errorMessage.value = ''
  const resp = await authAdapter.register({...formRegisterFields.value});
  if (resp.isError()) {
    errorMessage.value = resp.getErrorMessage()
  } else {
    idUser.value = resp.data
    isCheckEmail.value = true;
  }

  isFormLoading.value = false
}

const formEmailCheckEvent = async () => {
  isFormLoading.value = true
  errorMessage.value = ''
  const resp = await authAdapter.registerCheck(idUser.value, getCode());
  if (resp.isError()) {
    errorMessage.value = resp.getErrorMessage()
  } else {
    router.push(LOGIN_ROUTE)
  }

  isFormLoading.value = false
}

</script>

<template>
  <form v-if="!isCheckEmail" @submit.prevent="formRegisterEvent">
    <section class="flex justify-center items-center h-screen bg-gray-100">
      <div class="max-w-md w-full bg-white rounded p-6 space-y-4">
        <div class="mb-4">
          <p class="text-gray-600">Регистрация</p>
          <h2 class="text-xl font-bold">Join our community</h2>
        </div>
        <div>
          <input v-model="formRegisterFields.name"
                 type="text" required placeholder="Имя"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>

        <div>
          <input v-model="formRegisterFields.family"
                 type="text" required placeholder="Фамилия"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>

        <div>
          <input v-model="formRegisterFields.patronymic"
                 type="text" placeholder="Отчество"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>

        <div>
          <input v-model="formRegisterFields.email"
                 type="email" required placeholder="Email"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>
        <div>
          <input v-model="formRegisterFields.password"
                 type="password" required placeholder="Password"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>
        <div v-if="errorMessage !== ''">
          <span class="ml-2 text-sm font-normal text-red-600">
            {{ errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1) }}
          </span>
        </div>
        <div>
          <button type="submit"
                  :disabled="isFormLoading"
                  class="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded text-sm font-bold text-gray-50 transition duration-200 disabled:opacity-40 disabled:cursor-wait">
            {{ !isFormLoading ? 'Зарегистрироваться' : 'Загрузка' }}
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-row items-center">
            <router-link class="text-sm text-orange-600 hover:underline" :to="LOGIN_ROUTE">Уже есть аккаунт?
            </router-link>
          </div>
          <div>
            <a class="text-sm text-orange-600 hover:underline" href="#">Забыли пароль?</a>
          </div>
        </div>
      </div>
    </section>
  </form>
  <form v-else @submit.prevent="formEmailCheckEvent" ref="formEmail">
    <section class="flex justify-center items-center h-screen bg-gray-100">
      <div class="max-w-md w-full bg-white rounded p-6 space-y-4">
        <div class="mb-4">
          <p class="text-gray-600">Регистрация</p>
          <h2 class="text-xs opacity-50">На почту было отправлено писно с кодом</h2>
        </div>
        <div class="flex flex-row gap-1.5">
          <input v-model="formEmailCheck.f1" @keydown="handleKeyDown($event, 1)" :ref="(r) => {otpCont[1] = r}"
                 @paste="paste"
                 type="text" required placeholder="" maxlength="1"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
          <input v-model="formEmailCheck.f2" @keydown="handleKeyDown($event, 2)" :ref="(r) => {otpCont[2] = r}"
                 type="text" required placeholder="" maxlength="1"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
          <input v-model="formEmailCheck.f3" @keydown="handleKeyDown($event, 3)" :ref="(r) => {otpCont[3] = r}"
                 type="text" required placeholder="" maxlength="1"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
          <input v-model="formEmailCheck.f4" @keydown="handleKeyDown($event, 4)" :ref="(r) => {otpCont[4] = r}"
                 type="text" required placeholder="" maxlength="1"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
          <input v-model="formEmailCheck.f5" @keydown="handleKeyDown($event, 5)" :ref="(r) => {otpCont[5] = r}"
                 type="text" required placeholder="" maxlength="1"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
          <input v-model="formEmailCheck.f6" @keydown="handleKeyDown($event, 6)" :ref="(r) => {otpCont[6] = r}"
                 type="text" required placeholder="" maxlength="1"
                 :disabled="isFormLoading"
                 class="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 disabled:cursor-not-allowed">
        </div>
        <div v-if="errorMessage !== ''">
          <span class="ml-2 text-sm font-normal text-red-600">
            {{ errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1) }}
          </span>
        </div>
        <div>
          <button type="submit" :autofocus="formEmailCheck.f6 !== ''"
                  :disabled="isFormLoading || !isAllFieldEmailCheck"
                  class="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded text-sm font-bold text-gray-50 transition duration-200 disabled:opacity-40 disabled:cursor-wait">
            {{ !isFormLoading ? 'Подтвердить ' : 'Загрузка' }}
          </button>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped>

</style>