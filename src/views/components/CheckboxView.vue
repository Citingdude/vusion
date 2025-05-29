<script setup lang="ts">
import { ref } from 'vue'
import VuCheckbox from '@/components/checkbox/VuCheckbox.vue'

const label = ref<string>('Label')
const isChecked = ref<boolean>(false)
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

    <div class="flex flex-col gap-8">
      <VuCheckbox
        id="checkbox"
        v-model="isChecked"
        :label="label"
      />
    </div>
  </div>
</template>
