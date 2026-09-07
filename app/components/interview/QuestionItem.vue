<script setup lang="ts">
import type { NavigationItem } from '~/types/interview'

const props = defineProps<{
  item: NavigationItem
}>()

const route = useRoute()
const localePath = useLocalePath()
// item.path приходит из content без сегмента локали (см. content.config.ts),
// а route.path на en/uz его содержит (/en/frontend/...) — поэтому сравнивать
// нужно с localePath(item.path), а не с самим item.path напрямую.
const isActive = computed(() => route.path === localePath(props.item.path))
</script>

<template>
  <NuxtLinkLocale
    :to="item.path"
    class="block rounded-md px-3 py-1.5 text-sm transition-colors"
    :class="isActive
      ? 'bg-primary/10 text-primary font-medium'
      : 'text-muted hover:text-highlighted hover:bg-elevated/50'"
  >
    {{ item.title }}
  </NuxtLinkLocale>
</template>
