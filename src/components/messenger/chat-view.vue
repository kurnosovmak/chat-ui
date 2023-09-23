<script setup lang="ts">
import {onMounted, ref, Ref} from "vue";
import MinUser from "./ui/user/min-user.vue";
import Back from "./ui/buttons/back.vue";
import Phone from "./ui/buttons/phone.vue";
import Attach from "./ui/buttons/attach.vue";
import MessegerUiInput from "./ui/input/index.vue";
import Smile from "./ui/buttons/smile.vue";
import Dictafone from "./ui/buttons/dictafone.vue";
import Send from "./ui/buttons/send.vue";
import Message from "./ui/message.vue";
interface Chat {
  id: number
}

const chatActive = ref<Ref<Chat>>(null)
const isLoading = ref<Ref<boolean>>(false)

const message = ref<Ref<string>>('')

onMounted(() => {
  chatActive.value = {
    id: 1
  }
})

</script>

<template>
  <div class="h-full bg-white-dark">
    <div class="h-full w-full" v-if="!isLoading">

      <div v-if="chatActive !== null" class="h-full flex justify-between flex-col p-4">
        <div class="bg-white rounded-[8px] px-4 py-2 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <Back/>
            <MinUser name="Arsen" family="Mikailov" url="https://i.postimg.cc/yNVdpNTb/image.png"/>
          </div>
          <Phone/>
        </div>
        <div class="w-full h-full max-h-[calc(100vh-120px)] overflow-y-auto">
          <div v-if="false" class="w-full h-full flex justify-center items-center">
            <span class="text-[15px] text-black-light/70 opacity-50 text-center">Напиши что-нибудь  для <br/>начала общения</span>
          </div>
          <div v-else class="w-full h-full flex justify-end flex-col gap-2">
            <Message :back_user_id="null" :next_user_id="1" :message="{user_id:2,body:'Чату привет! По ThumbBlur ME-43784 вчера созвонился с клиентами, в итоге многое переиграли (в частности, делаем только для аттачей пока).  По результатам совзовна вносил правки, отправил на ревью новый MR По ME-45554 попросил Сашу с прода получить данные что приходят юзерам для отладки По ME-43304 на следующем спринте скорее всего доберутся на iOS проверить  функционал Пока переключился на ME-42337, пилю RPC getPeerMessages на v2',updated_at:'12:31'}"/>
            <Message :back_user_id="2" :next_user_id="1" :message="{user_id:1,body:'Чату привет! По ThumbBlur ME-43784 вчера созвонился с клиентами, в итоге многое переиграли (в частности, делаем только для аттачей пока).  По результатам совзовна вносил правки, отправил на ревью новый MR По ME-45554 попросил Сашу с прода получить данные что приходят юзерам для отладки По ME-43304 на следующем спринте скорее всего доберутся на iOS проверить  функционал Пока переключился на ME-42337, пилю RPC getPeerMessages на v2',updated_at:'12:31'}"/>
<!--            <Message :back_user_id="1" next_user_id="1" :message="{user_id:1,body:'Чату привет! По ThumbBlur ME-43784 вчера созвонился с клиентами, в итоге многое переиграли (в частности, делаем только для аттачей пока).  По результатам совзовна вносил правки, отправил на ревью новый MR По ME-45554 попросил Сашу с прода получить данные что приходят юзерам для отладки По ME-43304 на следующем спринте скорее всего доберутся на iOS проверить  функционал Пока переключился на ME-42337, пилю RPC getPeerMessages на v2',updated_at:'12:31'}"/>-->
<!--            <Message :back_user_id="1" next_user_id="1" :message="{user_id:1,body:'Чату привет! По ThumbBlur ME-43784 вчера созвонился с клиентами, в итоге многое переиграли (в частности, делаем только для аттачей пока).  По результатам совзовна вносил правки, отправил на ревью новый MR По ME-45554 попросил Сашу с прода получить данные что приходят юзерам для отладки По ME-43304 на следующем спринте скорее всего доберутся на iOS проверить  функционал Пока переключился на ME-42337, пилю RPC getPeerMessages на v2',updated_at:'12:31'}"/>-->
            <Message :back_user_id="1" :next_user_id="null" :message="{user_id:1,body:'Чату привет! По ThumbBlur ME-43784 вчера созвонился с клиентами, в итоге многое переиграли (в частности, делаем только для аттачей пока).  По результатам совзовна вносил правки, отправил на ревью новый MR По ME-45554 попросил Сашу с прода получить данные что приходят юзерам для отладки По ME-43304 на следующем спринте скорее всего доберутся на iOS проверить  функционал Пока переключился на ME-42337, пилю RPC getPeerMessages на v2',updated_at:'12:31'}"/>
            <div class="mt-4"></div>
          </div>
        </div>
        <div class="bg-white rounded-[8px] px-4 py-2 flex items-center gap-2">
          <Attach/>
          <MessegerUiInput v-model="message" placeholder="Напишите сообщение... "/>
          <Smile/>
          <Dictafone v-if="message === ''" />
          <Send v-else />
        </div>
      </div>
      <div v-else class="flex flex-col gap-2 justify-center items-center w-full h-full opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
              d="M33.75 14.185C35.2233 14.6583 36.25 16.065 36.25 17.68V24.8233C36.25 26.7167 34.8383 28.3233 32.95 28.4783C32.3833 28.5233 31.8167 28.565 31.25 28.5983V33.75L26.25 28.75C23.9933 28.75 21.76 28.6583 19.55 28.4783C19.0689 28.4394 18.6009 28.3022 18.175 28.075M33.75 14.185C33.4925 14.1021 33.2263 14.049 32.9567 14.0267C28.4932 13.6561 24.0068 13.6561 19.5433 14.0267C17.6583 14.1833 16.25 15.7883 16.25 17.68V24.8233C16.25 26.2183 17.0167 27.4567 18.175 28.075M33.75 14.185V11.0617C33.75 8.36 31.83 6.01834 29.15 5.67C25.7014 5.22299 22.2275 4.99919 18.75 5C15.225 5 11.7533 5.22834 8.35 5.67C5.67 6.01834 3.75 8.36 3.75 11.0617V21.4383C3.75 24.14 5.67 26.4817 8.35 26.83C9.31167 26.955 10.2783 27.0633 11.25 27.1533V35L18.175 28.075"
              stroke="#2C2C2C" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-[15px] text-black-light/70">Чат не выбран </span>
      </div>
    </div>
    <div v-else class="flex flex-col gap-2 justify-center items-center w-full h-full opacity-50">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"
           class="w-16 h-16">
        <path class="fill-primary"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
          <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"/>
        </path>
      </svg>
    </div>

  </div>
</template>

<style scoped>

</style>