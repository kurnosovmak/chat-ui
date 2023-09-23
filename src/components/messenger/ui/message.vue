<script setup lang="ts">

import {defineProps} from "vue";
import UserLogoMin from "./user/user-logo-min.vue";

interface Message {
  user_id: number
  body: string
  updated_at: any
}

const {message, back_user_id, next_user_id} = defineProps<{
  message: Message
  back_user_id: number|null
  next_user_id: number|null
}>()


</script>

<template>
  <div class="w-full">
    <div class="flex gap-2">
      <div class="flex flex-col justify-end">
        <UserLogoMin v-if="next_user_id !== message.user_id " url="https://i.postimg.cc/yNVdpNTb/image.png"/>
        <div v-else class="w-[28px] h-[28px]"></div>
      </div>
      <div class="bg-white p-2.5 rounded-[8px] max-w-[60%]">
        <span v-if="back_user_id !== message.user_id " class="text-primary text-[15px] font-medium cursor-pointer block mb-1">Александр Курносов</span>
        <span
            class="text-[15px] font-normal leading-[20px]"
            v-for="(line,lineNumber) in message.body.split('\n')"
            v-bind:key="lineNumber">
          {{ line }}<br/>
        </span>
        <span>{{message.updated_at}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>