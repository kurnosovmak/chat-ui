<script setup>
import message from './message.vue'
import {useSelectedStore} from "../../stores/selected.js";
import {onMounted, reactive, ref, watch} from "vue";
import {useConversationsStore} from "../../stores/conversations.js";
import MessangerAdapter from "../../adapters/messanger-adapter.js";
import {useMessangerStore} from "../../stores/messager.js";
import {MAX_CHAT_ID, MAX_USER_ID, MIN_CHAT_ID, MIN_USER_ID} from "../../consts/ranges.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "../../stores/auth.js";

const messagerAdapter = MessangerAdapter.create()


const authStore = useAuthStore()
const selectedStore = useSelectedStore()
const conversationsStore = useConversationsStore()
const messageStore = useMessangerStore()

const {selectedChat} = storeToRefs(selectedStore)

const messageModel = ref('')
const history = ref([])

watch(() => selectedChat, async (newValue) => {
  await refresh()
}, { deep: true})

onMounted(async () => {
  if (selectedChat.value === null || selectedChat.value.id === null) {
    return
  }
  await refresh()
})

const refresh = async () => {
  console.log('refresh')
  if (selectedChat.value === null || selectedChat.value.id === null) {
    return
  }
  const chat = conversationsStore.chats[selectedChat.value.id] ?? null
  if (chat === null) {
    await messagerAdapter.getChats()
  }
  const resp = await messagerAdapter.getHistory(selectedChat.value.id, 0, 100)
  history.value = Object.values(messageStore.messages[selectedChat.value.id])
}

const getTitle = () => {
  if (MIN_USER_ID <= selectedChat.value.id && selectedChat.value.id <= MAX_USER_ID) {
    const user = conversationsStore.users[selectedChat.value.id] ?? null
    if (user === null || user === undefined) {
      return 'undefined';
    }
    return user.name.charAt(0).toUpperCase() + user.name.slice(1) + ' ' +
        user.family.charAt(0).toUpperCase() + user.family.slice(1)
  }

  if (MIN_CHAT_ID <= selectedChat.value.id && selectedChat.value.id <= MAX_CHAT_ID) {
    const chat = conversationsStore.chats[selectedChat.value.id]
    if (chat === null || chat === undefined) {
      return 'undefined';
    }
    // @todo chat title by type chat
    const userId = chat.first_user_id !== authStore.getUserId
        ? chat.first_user_id : chat.second_user_id

    const user = conversationsStore.users[userId];
    if (user === null || user === undefined) {
      return 'undefined';
    }

    return user.name.charAt(0).toUpperCase() + user.name.slice(1) + ' ' +
        user.family.charAt(0).toUpperCase() + user.family.slice(1)
  }
}


const sendMessage = async () => {
  const message = messageModel.value
  const resp = await messagerAdapter.sendMessage(selectedStore.selectedChat.id, message)
  messageModel.value = ''
  refresh()
}

</script>

<template>
  <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
    <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div class="relative flex items-center space-x-4">
        <div class="relative">
            <span class="absolute text-green-500 right-0 bottom-0">
               <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span>
          <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full">
        </div>
        <div class="flex flex-col leading-tight">
          <div class="text-2xl mt-1 flex items-center">
            <span class="text-gray-700 mr-3 truncate max-w-[400px]">{{ getTitle() }}</span>
          </div>
          <span class="text-gray-700 mr-3 opacity-60">Личная переписка</span>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button type="button"
                class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <button type="button"
                class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
        <button type="button"
                class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </button>
      </div>
    </div>

    <div id="messages"
         class="h-full flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch justify-end">
      <message v-for="message in Object.values(messageStore.messages[selectedChat.id] ?? {})" :message="message"/>
    </div>
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
         <span class="absolute inset-y-0 flex items-center">
            <button type="button"
                    class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
               </svg>
            </button>
         </span>
        <input v-model="messageModel" type="text" placeholder="Write your message!"
               class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3">
        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button type="button"
                  class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 class="h-6 w-6 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
            </svg>
          </button>
          <button type="button"
                  class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 class="h-6 w-6 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
          <button type="button"
                  class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 class="h-6 w-6 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
          <button type="button" @click="sendMessage"
                  class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
            <span class="font-bold">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 class="h-6 w-6 ml-2 transform rotate-90">
              <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>