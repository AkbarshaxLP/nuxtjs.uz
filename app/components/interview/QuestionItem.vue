<script setup lang="ts">
import type { NavigationItem } from '~/types/interview'

const props = defineProps<{
  item: NavigationItem
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.item.path)
</script>

<template>
  <NuxtLink
    :to="item.path"
    class="block rounded-md px-3 py-1.5 text-sm transition-colors"
    :class="isActive
      ? 'bg-primary/10 text-primary font-medium'
      : 'text-muted hover:text-highlighted hover:bg-elevated/50'"
  >
    {{ item.title }}
  </NuxtLink>
</template>
