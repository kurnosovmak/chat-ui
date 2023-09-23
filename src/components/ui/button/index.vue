<script setup lang="ts">
import {defineProps, withDefaults} from "vue";

const {type} = withDefaults(defineProps<{
  type: string
  disabled: string
}>(), {
  type: 'button',
  disabled: false
})

</script>

<template>
  <button
      :type="type" :disabled="disabled"
      class="bg-primary rounded-[8px] py-1 w-full text-white
      text-center text-[18px] font-medium ease-out	transition-colors
      hover:bg-primary-dark duration-150 disabled:opacity-75">
    <slot/>
  </button>
</template>

<style scoped>

</style>