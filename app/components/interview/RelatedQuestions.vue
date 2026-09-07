<script setup lang="ts">
import type { NavigationItem } from '~/types/interview'

// Компонент чисто презентационный: разрешение путей из frontmatter `related`
// в реальные заголовки происходит на уровне страницы, где уже есть
// полный список вопросов направления.
defineProps<{
  questions: NavigationItem[]
}>()
</script>

<template>
  <div v-if="questions.length" class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold text-highlighted">Связанные вопросы</h2>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="question in questions"
        :key="question.path"
        :to="question.path"
        class="rounded-full border border-default px-3 py-1.5 text-sm text-muted transition-colors hover:border-primary hover:text-primary"
      >
        {{ question.title }}
      </NuxtLink>
    </div>
  </div>
</template>
