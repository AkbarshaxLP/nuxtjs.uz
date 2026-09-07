<script setup lang="ts">
// Глобальный поиск по всем направлениям и вопросам (Cmd+K).
// Ищет по title/description/tags/содержимому — секции строит
// queryCollectionSearchSections, дальше всё делает UContentSearch (Fuse.js).
const open = useSearchPalette()
const { files, navigation } = await useQuestionSearch()
</script>

<template>
  <ClientOnly>
    <LazyUContentSearch
      v-model:open="open"
      :files="files"
      :navigation="navigation"
      :fuse="{ resultLimit: 20 }"
    />
  </ClientOnly>
</template>
