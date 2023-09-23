<script setup lang="ts">
import {defineProps, defineEmits} from "vue";


defineProps(['modelValue', 'disabled'])
defineEmits(['update:modelValue'])

</script>

<template>
  <div class="flex flex-row gap-2 justify-start items-center">
    <div class="relative h-5 w-5">
      <input
          :value="modelValue" :disabled="disabled"
          @input="$emit('update:modelValue', $event.target.value)"
          type="checkbox"
          class="h-5 w-5 rounded-[4px] peer accent-primary before:content[''] cursor-pointer appearance-none border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-black-light/20 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary
            disabled:opacity-75">
    </div>

    <span class="text-[13px] text-black-light font-normal leading-[13px]">
      <slot/>
    </span>
  </div>
</template>

<style scoped>

</style>