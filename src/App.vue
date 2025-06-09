<script setup lang="ts">
import { RouterView } from 'vue-router'
import SunMoonIcon from '@/components/icon/SunMoonIcon.vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div
    class="antialiased bg-neutral-50 dark:bg-neutral-900"
    :class="{ dark: theme === 'dark' }"
  >
    <nav
      class="flex bg-white border-b border-neutral-200 px-4 py-2.5
    dark:bg-neutral-800 dark:border-neutral-700
    fixed left-0 right-0 top-0 z-50 justify-between"
    >
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            class="p-2 mr-2 text-neutral-600 rounded-lg cursor-pointer md:hidden hover:text-neutral-900 hover:bg-neutral-100 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:ring-2 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              aria-hidden="true"
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>

          <RouterLink
            to="/"
            class="flex items-center justify-between mr-4 text-black dark:text-white font-semibold text-lg"
          >
            Vusion
          </RouterLink>
        </div>
      </div>

      <button
        class="group dark:hover:bg-neutral-900 hover:bg-neutral-100
        transition-all duration-200 p-1 rounded-sm "
        @click="toggleTheme"
      >
        <SunMoonIcon
          class="size-8 text-black dark:text-white group-active:scale-90 transition duration-400"
        />
      </button>
    </nav>

    <!-- Sidebar -->
    <aside
      id="drawer-navigation"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -tranneutral-x-full bg-white border-r border-neutral-200 md:tranneutral-x-0 dark:bg-neutral-800 dark:border-neutral-700"
      aria-label="Sidenav"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-neutral-800">
        <ul class="space-y-2">
          <li>
            <RouterLink
              to="/"
              class="flex items-center p-2 text-base font-medium text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
            >
              <span class="ml-3">Home</span>
            </RouterLink>

            <RouterLink
              to="/components/button"
              class="flex items-center p-2 text-base font-medium text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
            >
              <span class="ml-3">Button</span>
            </RouterLink>

            <RouterLink
              to="/components/checkbox"
              class="flex items-center p-2 text-base font-medium text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
            >
              <span class="ml-3">Checkbox</span>
            </RouterLink>

            <RouterLink
              to="/components/select"
              class="flex items-center p-2 text-base font-medium text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
            >
              <span class="ml-3">Select</span>
            </RouterLink>

            <RouterLink
              to="/components/datepicker"
              class="flex items-center p-2 text-base font-medium text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
            >
              <span class="ml-3">Datepicker</span>
            </RouterLink>

            <RouterLink
              to="/components/dialog"
              class="flex items-center p-2 text-base font-medium text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
            >
              <span class="ml-3">Dialog</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </aside>

    <main class="p-4 md:ml-64 h-auto pt-20">
      <RouterView />
    </main>
  </div>
</template>
