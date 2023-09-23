<script setup lang="ts">
import UserLogoMin from "./user-logo-min.vue";
import {defineProps} from "vue";

defineProps<{
  url: string,
  name: string,
  family: string,
}>()

</script>

<template>
  <div class="flex items-center gap-2">
    <UserLogoMin :url="url"/>
    <span>
      {{name.charAt(0).toUpperCase() + name.slice(1)}}
      {{family.charAt(0).toUpperCase() + family.slice(1)}}
    </span>
  </div>
</template>

<style scoped>

</style>