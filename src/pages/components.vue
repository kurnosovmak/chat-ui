<script setup>
import UiButton from '../components/ui/button/index.vue';
import UiLabel from '../components/ui/label/index.vue';
import UiHeader from '../components/ui/header/index.vue';
import UiInputText from '../components/ui/input/index.vue';
import UiCheckBox from '../components/ui/check-box/index.vue';

</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-[374px]">

      <div class="flex flex-row gap-[18px] justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
          <path
              d="M41.9395 29.8087V32.5034C41.9395 35.8235 39.2477 38.5153 35.9276 38.5153H6.0723C2.75178 38.5153 0.0604248 35.8235 0.0604248 32.5034V29.8087C0.0604248 33.1288 2.75178 35.8205 6.0723 35.8205H35.9276C39.2477 35.8205 41.9395 33.1288 41.9395 29.8087Z"
              fill="#FF8229"/>
          <path
              d="M41.9395 9.49662V27.3382C41.9395 30.6583 39.2477 33.3501 35.9276 33.3501H6.0723C2.75178 33.3501 0.0604248 30.6583 0.0604248 27.3382V9.49662C0.0604248 6.17652 2.75178 3.48474 6.0723 3.48474H35.9276C39.2477 3.48474 41.9395 6.17652 41.9395 9.49662Z"
              fill="#FF8229"/>
        </svg>
        <span class="text-black-light text-[36px] font-medium">чат up</span>
      </div>

      <UiHeader class="mt-5">Вход</UiHeader>

      <UiInputText required placeholder="email" class="mt-3">
        <template #icon>
          <svg class="absolute top-2 right-3 h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16" fill="none">
            <path
                d="M11 8.00002C11 8.79567 10.6839 9.55873 10.1213 10.1213C9.55871 10.6839 8.79565 11 8 11C7.20435 11 6.44129 10.6839 5.87868 10.1213C5.31607 9.55873 5 8.79567 5 8.00002C5 7.20437 5.31607 6.44131 5.87868 5.8787C6.44129 5.31609 7.20435 5.00002 8 5.00002C8.79565 5.00002 9.55871 5.31609 10.1213 5.8787C10.6839 6.44131 11 7.20437 11 8.00002ZM11 8.00002C11 9.10469 11.6713 10 12.5 10C13.3287 10 14 9.10469 14 8.00002C14 6.61189 13.5187 5.2667 12.638 4.19367C11.7574 3.12064 10.532 2.38615 9.1705 2.11535C7.80903 1.84455 6.3958 2.05419 5.17158 2.70856C3.94736 3.36293 2.98791 4.42154 2.45671 5.70401C1.9255 6.98648 1.85541 8.41346 2.25837 9.74182C2.66133 11.0702 3.51242 12.2177 4.66661 12.9889C5.82081 13.7601 7.2067 14.1072 8.58814 13.9712C9.96959 13.8351 11.2611 13.2242 12.2427 12.2427M11 8.00002V5.50002"
                stroke="#2C2C2C" stroke-opacity="0.4" stroke-linecap="round"/>
          </svg>
        </template>
      </UiInputText>

      <UiInputText required placeholder="пароль" type="password" class="mt-3">
        <template #icon>
          <svg class="absolute top-2 right-3 h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16" fill="none">
            <path
                d="M11 7V4.5C11 3.70435 10.6839 2.94129 10.1213 2.37868C9.55871 1.81607 8.79565 1.5 8 1.5C7.20435 1.5 6.44129 1.81607 5.87868 2.37868C5.31607 2.94129 5 3.70435 5 4.5V7M4.5 14.5H11.5C11.8978 14.5 12.2794 14.342 12.5607 14.0607C12.842 13.7794 13 13.3978 13 13V8.5C13 8.10218 12.842 7.72064 12.5607 7.43934C12.2794 7.15804 11.8978 7 11.5 7H4.5C4.10218 7 3.72064 7.15804 3.43934 7.43934C3.15804 7.72064 3 8.10218 3 8.5V13C3 13.3978 3.15804 13.7794 3.43934 14.0607C3.72064 14.342 4.10218 14.5 4.5 14.5Z"
                stroke="#2C2C2C" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </UiInputText>


      <UiCheckBox class="mt-3">Запомнить это устройство</UiCheckBox>

      <span class="text-[12px] text-error leading-[12px] ml-4 mt-3 inline-block">
        Ошибка сервера
      </span>

      <UiButton class="mt-3">Войти</UiButton>
      <div class="flex flex-row justify-between mt-4">
        <UiLabel>Нет аккаунта?</UiLabel>
        <UiLabel>Забыли пароль?</UiLabel>
      </div>

      <div class="h-[10vh]"></div>
    </div>
  </div>
</template>

<style scoped>

</style>