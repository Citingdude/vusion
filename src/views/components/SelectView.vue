<script setup lang="ts">
import type { SelectOption } from '@/components/select/VuSelect.vue'
import { ref } from 'vue'
import VuSelect from '@/components/select/VuSelect.vue'

const label = ref<string>('Label')
const selectValue = ref<string | null>(null)
const options = ref<SelectOption[]>([
  {
    label: 'Option 1',
    value: 'option-1',
  },
  {
    label: 'Option 2',
    value: 'option-2',
  },
])
</script>

<template>
  <div class="min-h-screen flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <div class="max-w-fit">
        <label
          for="label"
          class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
        >
          Label
        </label>
        <input
          id="label"
          v-model="label"
          type="text"
          class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg
        block w-full p-2.5
        dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white
        focus-visible:outline-2
    focus-visible:outline-black dark:focus-visible:outline-white"
          placeholder="Set label"
        >
      </div>
    </div>

    {{ selectValue }}

    <div class="flex flex-col gap-8">
      <VuSelect
        id="checkbox"
        :model-value="selectValue"
        :label="label"
        :options="options"
        @update:model-value="(value) => selectValue = value"
      />
    </div>
  </div>
</template>
