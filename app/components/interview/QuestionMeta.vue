<script setup lang="ts">
import type { DifficultyLevel } from '~/types/interview'

defineProps<{
  category?: string
  difficulty?: DifficultyLevel
  tags?: string[]
}>()

const difficultyLabel: Record<DifficultyLevel, string> = {
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior'
}

const difficultyColor: Record<DifficultyLevel, 'success' | 'warning' | 'error'> = {
  junior: 'success',
  middle: 'warning',
  senior: 'error'
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <UBadge v-if="difficulty" :color="difficultyColor[difficulty]" variant="subtle" size="sm">
      {{ difficultyLabel[difficulty] }}
    </UBadge>
    <UBadge v-if="category" color="neutral" variant="subtle" size="sm">
      {{ category }}
    </UBadge>
    <UBadge v-for="tag in tags" :key="tag" color="neutral" variant="outline" size="sm">
      #{{ tag }}
    </UBadge>
  </div>
</template>
