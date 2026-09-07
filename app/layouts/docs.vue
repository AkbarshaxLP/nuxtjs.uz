<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'

// Layout переиспользуется всеми направлениями (frontend, backend, ...):
// он лишь берёт slug направления из URL и монтирует сайдбар для него.
const route = useRoute()
const direction = computed(() => route.params.direction as DirectionSlug)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-default">
    <AppHeader />
    <InterviewQuestionSearch />
    <AppMobileSidebar :direction="direction" />

    <div class="mx-auto flex w-full max-w-[1400px] flex-1 items-start px-4 sm:px-6">
      <AppSidebar :direction="direction" />
      <main class="min-w-0 flex-1 py-8 lg:pl-8">
        <slot />
      </main>
    </div>
  </div>
</template>
