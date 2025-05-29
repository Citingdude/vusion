<script setup lang="ts">
import { ref } from 'vue'
import VuButton from '@/components/button/VuButton.vue'
import ArrowUpRightIcon from '@/components/icon/ArrowUpRightIcon.vue'

const label = ref<string>('Read more')
const isDisabled = ref<boolean>(false)
const isPending = ref<boolean>(false)
const hasLeadingIcon = ref<boolean>(false)
const hasTrailingIcon = ref<boolean>(false)
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

      <div class="flex gap-4">
        <!-- Disabled -->
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

        <!-- Pending -->
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

        <!-- Leading icon -->
        <div class="max-w-fit">
          <label
            for="label"
            class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
          >
            Leading icon
          </label>
          <input
            id="label"
            v-model="hasLeadingIcon"
            type="checkbox"
            class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg
        block w-full p-2.5
        dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white
        focus-visible:outline-2
    focus-visible:outline-black dark:focus-visible:outline-white"
          >
        </div>

        <!-- Trailing icon -->
        <div class="max-w-fit">
          <label
            for="label"
            class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
          >
            Trailing icon
          </label>
          <input
            id="label"
            v-model="hasTrailingIcon"
            type="checkbox"
            class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg
        block w-full p-2.5
        dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white
        focus-visible:outline-2
    focus-visible:outline-black dark:focus-visible:outline-white"
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-8">
      <VuButton
        :label="label"
        :is-disabled="isDisabled"
        :is-pending="isPending"
        @click="isPending = !isPending"
      >
        <template v-if="hasLeadingIcon" #leadingIcon>
          <ArrowUpRightIcon class="size-4" />
        </template>

        <template v-if="hasTrailingIcon" #trailingIcon>
          <ArrowUpRightIcon class="size-4" />
        </template>
      </VuButton>
    </div>
  </div>
</template>
