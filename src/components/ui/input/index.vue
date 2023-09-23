<script setup lang="ts">
import {defineProps, withDefaults, defineEmits} from 'vue';

interface Error {
  readonly message: string
}
interface IProps {
  readonly modelValue: string
  readonly disabled: boolean
  readonly required: boolean
  readonly type: string
  readonly error: Error|null
  readonly placeholder: string
}

const {type, placeholder, error, modelValue, required} = withDefaults<IProps>(defineProps<IProps>(),{
  disabled: false,
  type: 'text',
  error: null,
  placeholder: '',
  required: false,
  modelValue: '',
});

defineEmits(['update:modelValue'])


</script>

<template>
  <div class="relative">
    <input :type="type" :placeholder="placeholder" :disabled="disabled"
           :value="modelValue" :required="required"
           @input="$emit('update:modelValue', $event.target.value)"
           class="rounded-[8px] w-full py-1.5 px-4 bg-field-primary
           placeholder:text-black-light/40 text-[14px] font-normal border border-field-primary-border disabled:opacity-75"
           :class="{'border-error ':error !== null}">
    <slot name="icon" class="text-black-light/40" :class="{'text-error':error !== null}">
    </slot>
    <span v-if="error !== null" class="text-[12px] text-error leading-[12px] ml-4">
      {{error?.message ?? ''}}
    </span>
  </div>
</template>

<style scoped>

</style>