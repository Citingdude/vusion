<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

defineProps<{
  id: string
  label: string
}>()

const model = defineModel<boolean>({ required: true })

const pathRef = useTemplateRef('path')

const dasharray = computed<number>(() => {
  if (!pathRef.value) {
    return 0
  }

  return pathRef.value.getTotalLength()
})

const dashoffset = computed<number>(() => {
  if (model.value) {
    return 0
  }

  return dasharray.value
})
</script>

<template>
  <label
    class="flex items-center space-x-2 cursor-pointer select-none w-fit"
    :for="id"
  >
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      class="peer sr-only"
      :aria-checked="model"
      role="checkbox"
    >

    <div
      class="size-5 flex items-center justify-center border rounded-sm
      transition-colors border-black dark:border-white"
    >
      <svg
        viewBox="0 0 24 24"
        class="text-black dark:text-white size-3"
      >

        <path
          ref="path"
          class="ease transition-[stroke-dashoffset] duration-200"
          :style="{
            strokeDasharray: dasharray,
            strokeDashoffset: dashoffset,
          }"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M20 6L9 17l-5-5"
        />
      </svg>
    </div>

    <span class="text-black dark:text-white">
      {{ label }}
    </span>
  </label>
</template>
