<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'

const props = defineProps<{
  direction: DirectionSlug
}>()

// Вся структура категорий/вопросов приходит из content — здесь нет
// ни одного захардкоженного названия технологии.
const { groups, activeGroupPath } = await useQuestionSidebar(props.direction)
const { t } = useI18n()
</script>

<template>
  <nav class="flex flex-col gap-1" :aria-label="t('sidebar.ariaLabel')">
    <template v-if="groups.length">
      <InterviewQuestionGroup
        v-for="group in groups"
        :key="group.path"
        :group="group"
        :default-open="group.path === activeGroupPath"
      />
    </template>
    <p v-else class="px-3 py-1.5 text-sm text-muted">
      {{ t('sidebar.comingSoon') }}
    </p>
  </nav>
</template>
