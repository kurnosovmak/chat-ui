<script setup>
import AuthAdapter from "../adapters/auth-adapter.js";
import {useRouter} from "vue-router";
import {ERROR_ROUTE, LOGIN_ROUTE, MESSANGER_ROUTE} from "../router/router.js";
import ProfileAdapter from "../adapters/profile-adapter.js";
import {onBeforeUnmount, onMounted} from "vue";
import Echo from "laravel-echo"
import {useAuthStore} from "../stores/auth.js";

const authAdapter = AuthAdapter.create()
const profileAdapter = ProfileAdapter.create()
const router = useRouter()

const logout = () => {
  authAdapter.logout()
  router.push(LOGIN_ROUTE)
}

onMounted(() => {
  profileAdapter.me()
  socketInit()

})

onBeforeUnmount(() => {
  socketClear()
})

const authStore = useAuthStore();

const socketInit = async () => {
  await new Promise(r => setTimeout(r, 2000));
  window.Echo.private('private-laravel_database_users.' + authStore.getUserId)
      .listen('.users.new-message', (e) => {
        console.log(e.user);
      });
  console.log('socket init')
}

</script>

<template>
  <div class="h-screen w-screen flex bg-gray-100">
    <!-- left menu -->
    <aside
        class="hidden fixed lg:flex flex-col items-center bg-white text-gray-700 shadow
		h-full">
      <!-- Side Nav Bar-->

      <div class="h-16 flex items-center w-full">
        <!-- Logo Section -->
        <router-link class="h-6 w-6 mx-auto" to="/">
          <img
              class="h-6 w-6 mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
              alt="svelte logo"/>
        </router-link>
      </div>

      <ul>
        <!-- Items Section -->
        <li class="hover:bg-gray-100">
          <router-link
              :to="MESSANGER_ROUTE"
              active-class="text-orange-500"
              class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
              <polyline
                  points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
              <path
                  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
							2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0
							0-1.79 1.11z"></path>
            </svg>

          </router-link>
        </li>

        <li class="hover:bg-gray-100">
          <router-link
              :to="ERROR_ROUTE"
              active-class="text-orange-500"
              class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
              <path
                  d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>

          </router-link>
        </li>

        <li class="hover:bg-gray-100">
          <a
              href="."
              class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path
                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
							0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
							0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
							2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
							0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
							0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
							0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
							0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
							1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
							1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
							0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
							1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
							2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
							0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
							1.65 0 0 0-1.51 1z"></path>
            </svg>
          </a>
        </li>

      </ul>

      <div class="mt-auto h-16 flex items-center w-full">
        <!-- Action Section -->
        <button
            @click="logout"
            class="h-16 w-10 mx-auto flex flex justify-center items-center
				w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none">
          <svg
              class="h-5 w-5 text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>

        </button>
      </div>

    </aside>

    <div class="pl-0 mb-[46px] lg:pl-[68px] w-full">
      <router-view/>
    </div>
    <!--     for mobile-->
    <nav
        class="fixed bottom-0 w-full border bg-white lg:hidden flex
		overflow-x-auto">
      <!-- Bottom Icon Navigation Menu -->

      <a
          href="."
          class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500">

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path
              d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
					2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
        </svg>

        <span class="hidden text-sm capitalize">Inbox</span>
      </a>

      <a
          href="."
          class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 text-orange-500">

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-github">
          <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0
					0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77
					5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7
					0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0
					0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>

        <span class="text-sm capitalize">github</span>
      </a>

      <a
          href="."
          class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500">

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-bookmark">
          <path
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>

        <span class="hidden text-sm capitalize">bookmark</span>
      </a>

      <a
          href="."
          class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500">

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83
					2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65
					0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0
					0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2
					2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
					0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0
					4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2
					0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0
					1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1
					1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0
					0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0
					1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0
					0-1.51 1z"></path>
        </svg>

        <span class="hidden text-sm capitalize">Settings</span>
      </a>

    </nav>
  </div>
</template>

<style scoped>

</style>