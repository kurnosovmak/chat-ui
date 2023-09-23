<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
  url: string
}>()


</script>

<template>
  <div class="w-[28px] h-[28px] rounded-full bg-cover bg-center" :style="'background-image: url('+url+')'">
  </div>
</template>

<style scoped>

</style>