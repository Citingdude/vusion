<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { computed } from 'vue'
import CircleLoaderIcon from '@/components/icon/CircleLoaderIcon.vue'

const props = defineProps<{
  label: string
  type?: 'button' | 'reset' | 'submit'
  isDisabled?: boolean
  isPending?: boolean
}>()

const button = tv({
  base: `text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5
  focus-visible:outline-2 focus-visible:outline-offset-4
focus-visible:outline-black dark:focus-visible:outline-white
hover:brightness-90 active:scale-95
dark:bg-white dark:text-black w-fit
transition duration-100`,
  variants: {
    disabled: {
      true: 'opacity-50 pointer-events-none',
      false: '',
    },
  },
})

const buttonClass = computed(() => {
  return button({
    disabled: props.isDisabled,
  })
})
</script>

<template>
  <button
    :type="props.type"
    :class="buttonClass"
    :disabled="props.isDisabled"
    class="flex gap-2 items-center"
  >
    <CircleLoaderIcon
      v-if="props.isPending"
      aria-hidden="true"
      class="size-4 animate-spin"
    />

    <slot v-if="!props.isPending" name="leadingIcon" />

    <span class="max-w-xs overflow-ellipsis overflow-hidden text-nowrap">
      {{ props.label }}
    </span>

    <slot name="trailingIcon" />
  </button>
</template>
