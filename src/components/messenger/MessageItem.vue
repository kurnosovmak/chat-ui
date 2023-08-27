<script setup>
import {useAuthStore} from "../../stores/auth.js";
import {onMounted} from "vue";
// import {useConversationsStore} from "../../stores/conversations.js";
const authStore = useAuthStore()
// const conversationsStore = useConversationsStore()

const {chatId, messageId, message} = defineProps({
  chatId: {
    type:Number
  },
  messageId: {
    type:Number
  },
  message: {
    required: true,
  }
})

const authUserId = authStore.getUserId

</script>

<template>
  <div class="chat-message">
    <div class="flex items-end" :class="{'justify-end': message.sender_user === authUserId}">
      <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 items-start"
           :class="{'order-2': message.sender_user !== authUserId}">
        <div><span class="px-4 py-2 rounded-lg inline-block"
                   :class="{'bg-blue-600 text-white': message.sender_user === authUserId,
                       'bg-gray-300 text-gray-600': message.sender_user !== authUserId}">
              {{ message.body }}
            </span></div>
      </div>
      <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="My profile" class="w-6 h-6 rounded-full order-1">
    </div>
  </div>
</template>

<style scoped>

</style>