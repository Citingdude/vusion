<script setup lang="ts">
import CheckIcon from '@/components/icon/CheckIcon.vue'

defineProps<{
  id: string
  label: string
}>()

defineEmits(['update:modelValue'])

const model = defineModel<boolean>({
  required: true,
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
      :checked="model"
      class="peer sr-only"
      :aria-checked="model"
      role="checkbox"
    >
    <div
      class="size-5 flex items-center justify-center border rounded-sm
      transition-colors border-black dark:border-white"
    >
      <Transition
        enter-from-class="opacity-0 scale-50"
        leave-to-class="opacity-0 scale-50"
        enter-active-class="transition duration-200 ease-in-out"
        leave-active-class="transition duration-200 ease-in-out"
      >
        <CheckIcon
          v-if="model"
          class="text-black dark:text-white size-3"
        />
      </Transition>

    </div>
    <span class="text-black dark:text-white">
      {{ label }}
    </span>
  </label>
</template>
