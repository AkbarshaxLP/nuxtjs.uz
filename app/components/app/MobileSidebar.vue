<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'

const props = defineProps<{
  direction: DirectionSlug
}>()

const open = useMobileSidebar()
const route = useRoute()
const { t } = useI18n()

// Закрываем Drawer при переходе на другой вопрос.
watch(() => route.path, () => { open.value = false })
</script>

<template>
  <USlideover v-model:open="open" side="left" :title="t('sidebar.mobileTitle')">
    <template #body>
      <InterviewQuestionSidebar :direction="props.direction" />
    </template>
  </USlideover>
</template>
