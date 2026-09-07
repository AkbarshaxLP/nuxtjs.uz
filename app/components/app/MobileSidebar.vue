<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'

const props = defineProps<{
  direction: DirectionSlug
}>()

const open = useMobileSidebar()
const route = useRoute()

// Закрываем Drawer при переходе на другой вопрос.
watch(() => route.path, () => { open.value = false })
</script>

<template>
  <USlideover v-model:open="open" side="left" title="Навигация">
    <template #body>
      <InterviewQuestionSidebar :direction="props.direction" />
    </template>
  </USlideover>
</template>
