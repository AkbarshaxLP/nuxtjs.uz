<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'

defineProps<{
  direction: DirectionSlug
}>()
</script>

<template>
  <aside class="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-default px-3 py-6 lg:block">
    <InterviewQuestionSidebar :direction="direction" />
  </aside>
</template>
