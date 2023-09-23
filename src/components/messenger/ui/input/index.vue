<script setup lang="ts">
import {defineProps, withDefaults, defineEmits} from 'vue';

interface Error {
  readonly message: string
}
interface IProps {
  readonly modelValue: string
  readonly disabled: boolean
  readonly required: boolean
  readonly placeholder: string
}

const {type, placeholder, error, modelValue, required} = withDefaults<IProps>(defineProps<IProps>(),{
  disabled: false,
  placeholder: '',
  required: false,
  modelValue: '',
});

defineEmits(['update:modelValue'])


</script>

<template>
  <div class="relative w-full">
    <input type="text" :placeholder="placeholder" :disabled="disabled"
           :value="modelValue" :required="required"
           @input="$emit('update:modelValue', $event.target.value)"
           class="rounded-[8px] w-full placeholder:text-black-light/70 text-[16px] text-black-light"
           :class="{'border-error ':error !== null}">
  </div>
</template>

<style scoped>

</style>