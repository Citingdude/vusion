<script setup lang="ts">
import { ref } from 'vue'
import VuCheckbox from '@/components/checkbox/VuCheckbox.vue'
import VuDatepicker from '@/components/datepicker/VuDatepicker.vue'

const date = ref('')
const isDisabled = ref(false)
const isRange = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <div class="max-w-fit">
        <VuCheckbox
          id="datepicker-disabled"
          v-model="isDisabled"
          class="mb-2"
          label="Disabled"
        />
      </div>
      <div class="max-w-fit">
        <VuCheckbox
          id="datepicker-range"
          v-model="isRange"
          class="mb-2"
          label="Range"
        />
      </div>
    </div>
    <div class="flex flex-col gap-8">
      <VuDatepicker
        v-model="date"
        label="Pick a date"
        :is-disabled="isDisabled"
        :range="isRange"
      />
      <div v-if="date" class="text-neutral-700 dark:text-white">
        Selected: {{ date }}
      </div>
    </div>
  </div>
</template>
