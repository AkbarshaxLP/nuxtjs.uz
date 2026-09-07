<script setup lang="ts">
import type { FlatQuestionRef } from '~/types/interview'

defineProps<{
  prev?: FlatQuestionRef
  next?: FlatQuestionRef
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-3 border-t border-default pt-6 sm:grid-cols-2">
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="group flex flex-col rounded-lg border border-default p-4 transition-colors hover:border-primary"
    >
      <span class="flex items-center gap-1 text-xs text-muted">
        <UIcon name="i-lucide-arrow-left" class="size-3.5" />
        Предыдущий вопрос
      </span>
      <span class="mt-1 font-medium text-highlighted group-hover:text-primary">{{ prev.title }}</span>
    </NuxtLink>
    <div v-else class="hidden sm:block" />

    <NuxtLink
      v-if="next"
      :to="next.path"
      class="group flex flex-col items-end rounded-lg border border-default p-4 text-right transition-colors hover:border-primary"
    >
      <span class="flex items-center gap-1 text-xs text-muted">
        Следующий вопрос
        <UIcon name="i-lucide-arrow-right" class="size-3.5" />
      </span>
      <span class="mt-1 font-medium text-highlighted group-hover:text-primary">{{ next.title }}</span>
    </NuxtLink>
  </div>
</template>
