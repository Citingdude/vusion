<script setup lang="ts">
import { computed } from 'vue'
import { buttonStyle } from '@/components/button/VuButton.style'
import CircleLoaderIcon from '@/components/icon/CircleLoaderIcon.vue'

const props = defineProps<{
  label: string
  type?: 'button' | 'reset' | 'submit'
  isDisabled?: boolean
  isPending?: boolean
}>()

const buttonClass = computed(() => {
  return buttonStyle({
    disabled: props.isDisabled,
  })
})
</script>

<template>
  <button
    class="relative"
    :type="props.type"
    :class="buttonClass.base()"
    :disabled="props.isDisabled"
  >
    <Transition
      enter-from-class="opacity-0 scale-50"
      leave-to-class="opacity-0 scale-50"
      enter-active-class="transition ease-in-out duration-200"
      leave-active-class="transition ease-in-out duration-100"
    >
      <div
        v-if="props.isPending"
        key="loader"
        class="absolute size-4 flex items-center justify-center left-0
        translate-x-3"
      >
        <CircleLoaderIcon
          aria-hidden="true"
          class="size-4 animate-spin"
        />
      </div>
    </Transition>

    <template v-if="!props.isPending">
      <slot name="leadingIcon" />
    </template>

    <span
      class="transition-[padding] duration-200 ease-in-out"
      :class="[
        buttonClass.label(),
        { 'pl-4': props.isPending },
      ]"
    >
      {{ props.label }}
    </span>

    <slot name="trailingIcon" />
  </button>
</template>
