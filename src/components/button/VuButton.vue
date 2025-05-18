<script setup lang="ts">
const props = defineProps<{
  label: string
  type?: 'button' | 'reset' | 'submit'
}>()
</script>

<template>
  <button
    :type="props.type"
    class="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-black dark:focus-visible:outline-white
    hover:brightness-90 active:scale-95
    dark:bg-white dark:text-black
    transition duration-100"
  >
    {{ props.label }}
  </button>
</template>
