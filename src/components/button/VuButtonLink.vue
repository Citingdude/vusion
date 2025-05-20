<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { buttonStyle } from '@/components/button/VuButton.style'

const props = defineProps<{
  to: string
  label: string
  isDisabled?: boolean
}>()

const buttonClass = computed(() => {
  return buttonStyle({
    disabled: props.isDisabled,
  })
})
</script>

<template>
  <RouterLink
    :to="props.to"
    :class="buttonClass.base()"
    :disabled="props.isDisabled"
  >
    <slot name="leadingIcon" />

    <span :class="buttonClass.label()">
      {{ props.label }}
    </span>

    <slot name="trailingIcon" />
  </RouterLink>
</template>
