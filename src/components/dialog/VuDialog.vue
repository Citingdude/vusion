<script setup lang="ts">
import { ref, watch } from 'vue'
import VuButton from '@/components/button/VuButton.vue'

let escapController: AbortController | null = null

const isDialogOpen = ref<boolean>(true)

function openModal() {
  isDialogOpen.value = true
}

function closeModal() {
  isDialogOpen.value = false
}

function disableBodyScroll(): void {
  const body = window.document.body

  if (!body) {
    return
  }

  body.style.overflow = 'hidden'
}

function enableBodyScroll(): void {
  const body = window.document.body

  if (!body || !body.style || !body.style.overflow) {
    return
  }

  body.style.removeProperty('overflow')
}

function onEscapePress(event: KeyboardEvent) {
  if (event.key !== 'Escape') {
    return
  }

  closeModal()
  escapController?.abort()
}

function enableEscapeToClose() {
  const document = window.document

  escapController = new AbortController()

  if (!document) {
    return
  }

  const signal = escapController.signal

  document.addEventListener('keydown', onEscapePress, {
    signal,
  })
}

watch(isDialogOpen, (isOpen) => {
  if (isOpen) {
    disableBodyScroll()
    enableEscapeToClose()
  }
  else {
    enableBodyScroll()
  }
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <VuButton
      label="Trigger"
      @click="openModal"
    />
    <div
      v-if="isDialogOpen"
      class="bg-neutral-950/50 fixed inset-0 z-50
      flex w-full flex-col h-full items-center justify-center"
      @keydown.esc="closeModal"
    >
      <div class="absolute top-4 right-4">
        <VuButton
          label="Close"
          class="absolute"
          @click="closeModal"
        />
      </div>

      <div
        class="py-8 px-12 bg-white dark:bg-neutral-800 rounded-lg flex flex-col gap-4 w-xl"
      >
        <h2 class="text-4xl dark:text-white">
          Heading
        </h2>

        <p class="dark:text-white">
          Description
        </p>

        <div class="flex gap-2">
          <VuButton label="Label" />
          <VuButton label="Label" />
        </div>
      </div>
    </div>
  </div>
</template>
