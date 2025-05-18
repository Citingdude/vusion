<script setup lang="ts">
import { ref } from 'vue'
import VuButton from '@/components/button/VuButton.vue'
import ArrowUpRightIcon from '@/components/icon/ArrowUpRightIcon.vue'

const label = ref<string>('Read more')
const isDisabled = ref<boolean>(false)
const isPending = ref<boolean>(false)
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

      <div class="max-w-fit">
        <label
          for="label"
          class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
        >
          Disabled
        </label>
        <input
          id="label"
          v-model="isDisabled"
          type="checkbox"
          class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg
        block w-full p-2.5
        dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white
        focus-visible:outline-2
    focus-visible:outline-black dark:focus-visible:outline-white"
        >
      </div>

      <div class="max-w-fit">
        <label
          for="label"
          class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
        >
          Pending
        </label>
        <input
          id="label"
          v-model="isPending"
          type="checkbox"
          class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg
        block w-full p-2.5
        dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white
        focus-visible:outline-2
    focus-visible:outline-black dark:focus-visible:outline-white"
        >
      </div>
    </div>

    <div>
      <VuButton
        :label="label"
        :is-disabled="isDisabled"
        :is-pending="isPending"
        tag="button"
      >
        <template #trailingIcon>
          <ArrowUpRightIcon class="size-4" />
        </template>
      </VuButton>
    </div>
  </div>
</template>
