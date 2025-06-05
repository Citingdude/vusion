<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: '',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  range: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const showCalendar = ref(false)
const today = new Date()
const year = ref(props.modelValue ? Number(props.modelValue.split('-')[0]) : today.getFullYear())
const month = ref(props.modelValue ? Number(props.modelValue.split('-')[1]) - 1 : today.getMonth())
const day = ref(props.modelValue ? Number(props.modelValue.split('-')[2]) : today.getDate())

const days = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
]
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate()
})
const firstDayOfMonth = computed(() => {
  return new Date(year.value, month.value, 1).getDay()
})

const rangeStart = ref<string | null>(null)
const rangeEnd = ref<string | null>(null)
const selectingRange = ref(false)
const isDragging = ref(false)

const isRange = computed(() => props.range)

const displayValue = computed(() => {
  if (isRange.value) {
    if (rangeStart.value && rangeEnd.value) {
      return `${rangeStart.value} - ${rangeEnd.value}`
    }
    else if (rangeStart.value) {
      return `${rangeStart.value} - `
    }
    return ''
  }
  else {
    if (!props.modelValue) {
      return ''
    }
    return props.modelValue
  }
})

function selectDate(d: number) {
  const mm = String(month.value + 1).padStart(2, '0')
  const dd = String(d).padStart(2, '0')
  const val = `${year.value}-${mm}-${dd}`
  if (isRange.value) {
    if (!selectingRange.value || (rangeStart.value && rangeEnd.value)) {
      rangeStart.value = val
      rangeEnd.value = null
      selectingRange.value = true
      return
    }
    if (selectingRange.value && !rangeEnd.value) {
      if (rangeStart.value && val < rangeStart.value) {
        rangeEnd.value = rangeStart.value
        rangeStart.value = val
      }
      else {
        rangeEnd.value = val
      }
      selectingRange.value = false
      emit('update:modelValue', `${rangeStart.value} - ${rangeEnd.value}`)
      // Do not close the calendar for range mode
      // showCalendar.value = false
      return
    }
    return
  }
  emit('update:modelValue', val)
  showCalendar.value = false
}

function isSelected(d: number) {
  const mm = String(month.value + 1).padStart(2, '0')
  const dd = String(d).padStart(2, '0')
  const val = `${year.value}-${mm}-${dd}`
  if (isRange.value) {
    if (rangeStart.value && rangeEnd.value) {
      return val === rangeStart.value || val === rangeEnd.value
    }
    if (rangeStart.value && !rangeEnd.value) {
      return val === rangeStart.value
    }
    return false
  }
  if (!props.modelValue) {
    return false
  }
  const [y, m, d2] = props.modelValue.split('-').map(Number)
  return y === year.value && m === month.value + 1 && d2 === d
}

function isInRange(d: number) {
  if (!isRange.value || !rangeStart.value || !rangeEnd.value) {
    return false
  }
  const mm = String(month.value + 1).padStart(2, '0')
  const dd = String(d).padStart(2, '0')
  const val = `${year.value}-${mm}-${dd}`
  return val > rangeStart.value && val < rangeEnd.value
}

function prevMonth() {
  if (month.value === 0) {
    month.value = 11
    year.value--
    return
  }
  month.value--
}
function nextMonth() {
  if (month.value === 11) {
    month.value = 0
    year.value++
    return
  }
  month.value++
}

function onInput(_e: Event) {
  // Optionally allow manual input parsing here
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) {
    showCalendar.value = false
  }
}

function onDayMouseDown(d: number) {
  if (!isRange.value) {
    return
  }
  const mm = String(month.value + 1).padStart(2, '0')
  const dd = String(d).padStart(2, '0')
  const val = `${year.value}-${mm}-${dd}`
  rangeStart.value = val
  rangeEnd.value = null
  selectingRange.value = true
  isDragging.value = true
}

function onDayMouseEnter(d: number) {
  if (!isRange.value || !isDragging.value || !rangeStart.value) {
    return
  }
  const mm = String(month.value + 1).padStart(2, '0')
  const dd = String(d).padStart(2, '0')
  const val = `${year.value}-${mm}-${dd}`
  if (val < rangeStart.value) {
    rangeEnd.value = rangeStart.value
    rangeStart.value = val
  }
  else {
    rangeEnd.value = val
  }
}

function onDayMouseUp() {
  if (!isRange.value || !isDragging.value) {
    return
  }
  isDragging.value = false
  selectingRange.value = false
  if (rangeStart.value && rangeEnd.value) {
    emit('update:modelValue', `${rangeStart.value} - ${rangeEnd.value}`)
    // Do not close the calendar for range mode
    // showCalendar.value = false
  }
}

onMounted(() => {
  document.addEventListener('mouseup', onDayMouseUp)
  document.addEventListener('mouseleave', onDayMouseUp)
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mouseup', onDayMouseUp)
  document.removeEventListener('mouseleave', onDayMouseUp)
  document.removeEventListener('mousedown', handleClickOutside)
})

watch(() => props.modelValue, (val) => {
  if (isRange.value) {
    if (val && val.includes(' - ')) {
      const [start, end] = val.split(' - ')
      rangeStart.value = start
      rangeEnd.value = end
      selectingRange.value = false
    }
    else {
      rangeStart.value = null
      rangeEnd.value = null
      selectingRange.value = false
    }
  }
  else {
    if (val) {
      const [y, m, d] = val.split('-').map(Number)
      year.value = y
      month.value = m - 1
      day.value = d
    }
  }
})

// month and year are now refs, but v-model on <select> and <input> expects a value, not a ref object
// so we need to use .value for two-way binding

// Add computed wrappers for v-model
const monthProxy = computed({
  get: () => month.value,
  set: (val) => { month.value = val },
})
const yearProxy = computed({
  get: () => year.value,
  set: (val) => { year.value = val },
})

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i)

watch([month, year], () => {
  // If the selected day is out of range for the new month/year, adjust it
  const maxDay = new Date(year.value, month.value + 1, 0).getDate()
  if (day.value > maxDay) {
    day.value = maxDay
  }
  // If a date is already selected, update the modelValue to reflect the new month/year
  if (props.modelValue) {
    const mm = String(month.value + 1).padStart(2, '0')
    const dd = String(day.value).padStart(2, '0')
    const val = `${year.value}-${mm}-${dd}`
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <div class="flex flex-col gap-2 max-w-fit relative">
    <label v-if="label" class="block text-sm font-medium text-neutral-900 dark:text-white mb-2">{{ label }}</label>
    <div class="relative">
      <input
        type="text"
        :value="displayValue"
        :disabled="isDisabled"
        readonly
        placeholder="YYYY-MM-DD"
        class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 pr-10 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        @focus="showCalendar = true"
        @click="showCalendar = true"
        @input="onInput"
      >
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
      <div v-if="showCalendar" class="absolute z-10 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg p-4" @mousedown.prevent>
        <div class="flex items-center justify-between mb-2 gap-2">
          <button
            type="button"
            aria-label="Previous month"
            class="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
            @click="prevMonth"
          >
            &#8592;
          </button>
          <div class="flex items-center gap-2">
            <select
              v-model="monthProxy"
              class="appearance-auto bg-transparent border-none text-base font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
              :disabled="isDisabled"
              aria-label="Select month"
              @mousedown.stop
            >
              <option v-for="(m, idx) in months" :key="m" :value="idx">
                {{ m }}
              </option>
            </select>
            <select
              v-model="yearProxy"
              class="appearance-auto bg-transparent border border-neutral-200 dark:border-neutral-700 rounded text-base font-medium text-neutral-900 dark:text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              :disabled="isDisabled"
              aria-label="Select year"
              @mousedown.stop
            >
              <option v-for="y in yearOptions" :key="y" :value="y">
                {{ y }}
              </option>
            </select>
          </div>
          <button
            type="button"
            aria-label="Next month"
            class="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
            @click="nextMonth"
          >
            &#8594;
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 text-xs text-center mb-1">
          <span v-for="d in days" :key="d" class="font-semibold text-neutral-500 dark:text-neutral-400">{{ d }}</span>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="blank in firstDayOfMonth"
            :key="`b-${blank}`"
            class="bg-transparent border-none cursor-default"
            disabled
          />
          <button
            v-for="d in daysInMonth"
            :key="d"
            type="button"
            class="rounded p-1 w-8 h-8 text-sm transition-colors duration-150"
            :class="{
              'bg-black text-white': isSelected(d),
              'bg-neutral-200 dark:bg-neutral-700': isInRange(d),
              'hover:bg-black/10 dark:hover:bg-white/10': !isSelected(d) && !isInRange(d) && !isDisabled,
              'text-neutral-400': isDisabled,
            }"
            :draggable="false"
            @mousedown="onDayMouseDown(d)"
            @mouseenter="onDayMouseEnter(d)"
            @click="selectDate(d)"
          >
            {{ d }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Tailwind handles all styling, no <style> needed -->
