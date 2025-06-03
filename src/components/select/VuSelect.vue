<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CaretDownIcon from '@/components/icon/CaretDownIcon.vue'
import CheckIcon from '@/components/icon/CheckIcon.vue'

export interface SelectOption {
  label: string
  value: string
}

const props = defineProps<{
  options: SelectOption[]
  modelValue: string | null
  label: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const highlightedIndex = ref(-1)

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : 'Select an option'
})

function toggle() {
  isOpen.value = !isOpen.value
}

function open() {
  isOpen.value = true
  highlightFirst()
}

function close() {
  isOpen.value = false
}

function select(option: SelectOption) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

function highlightNext() {
  if (!isOpen.value)
    isOpen.value = true
  highlightedIndex.value = (highlightedIndex.value + 1) % props.options.length
}

function highlightFirst() {
  highlightedIndex.value = 0
}

function highlightPrev() {
  if (!isOpen.value)
    isOpen.value = true
  highlightedIndex.value
    = (highlightedIndex.value - 1 + props.options.length) % props.options.length
}

function selectHighlighted() {
  if (highlightedIndex.value >= 0) {
    select(props.options[highlightedIndex.value])
  }
}

function handleClick() {
  if (isOpen.value) {
    selectHighlighted()
    close()
  }
  else {
    open()
  }
}

function handleClickOutside(e: Event) {
  const target = e.target

  if (!(target instanceof HTMLElement)) {
    return
  }

  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

function handleTab(e: KeyboardEvent) {
  if (isOpen.value) {
    e.preventDefault()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative w-64">
    <!-- Label -->
    <label
      id="vu-select-label"
      class="mb-2 block dark:text-white"
      @click="toggle"
    >
      {{ props.label }}
    </label>

    <!-- Trigger button -->
    <button
      aria-labelledby="vu-select-label"
      type="button"
      :aria-expanded="isOpen"
      class="w-full bg-white dark:bg-neutral-800 border
      border-neutral-300 dark:border-neutral-600 rounded-sm px-4 py-2
      text-left cursor-pointer flex justify-between items-center
      focus:outline outline-black dark:text-neutral-100"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown.down.prevent="highlightNext"
      @keydown.up.prevent="highlightPrev"
      @keydown.enter.prevent="handleClick"
      @keydown.space.prevent="handleClick"
      @keydown.esc="close"
      @keydown.tab="handleTab"
    >
      <span>
        {{ selectedLabel }}
      </span>

      <CaretDownIcon
        class="w-4 h-4 ml-2 text-neutral-600 dark:text-neutral-300"
      />
    </button>

    <!-- Dropdown -->
    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 border
      border-neutral-300 dark:border-neutral-600 rounded shadow-lg max-h-60
      overflow-auto focus:outline-none dark:text-neutral-100"
      role="listbox"
    >
      <li
        v-for="(option, index) in options"
        :key="option.value"
        class="px-4 py-2 cursor-pointer flex items-center gap-2"
        :class="[
          highlightedIndex === index
            ? 'bg-neutral-100 dark:bg-neutral-700'
            : 'hover:bg-neutral-50 dark:hover:bg-neutral-700',
          option.value === modelValue
            ? 'font-semibold text-black dark:text-neutral-100'
            : '',
        ]"
        role="option"
        :aria-selected="option.value === modelValue"
        @click="select(option)"
        @mouseenter="highlightedIndex = index"
      >
        <CheckIcon v-show="option.value === modelValue" class="size-3" />

        <span>
          {{ option.label }}

        </span>
      </li>
    </ul>
  </div>
</template>
