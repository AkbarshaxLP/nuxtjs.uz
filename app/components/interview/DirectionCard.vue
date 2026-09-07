<script setup lang="ts">
import type { Direction } from '~/types/interview'

defineProps<{
  direction: Direction
}>()

const { t } = useI18n()
</script>

<template>
  <NuxtLinkLocale
    :to="direction.available ? `/${direction.slug}` : undefined"
    class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-default bg-default p-8 transition-all"
    :class="direction.available
      ? 'hover:-translate-y-1 hover:border-primary hover:shadow-lg'
      : 'cursor-not-allowed opacity-60'"
  >
    <div>
      <div class="mb-5 flex items-center justify-between">
        <div class="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UIcon :name="direction.icon" class="size-6" />
        </div>
        <UBadge v-if="!direction.available" color="neutral" variant="subtle">{{ t('direction.comingSoonBadge') }}</UBadge>
      </div>

      <h2 class="text-2xl font-semibold text-highlighted">{{ direction.title }}</h2>
      <p class="mt-2 text-muted">{{ direction.description }}</p>

      <ul class="mt-5 flex flex-wrap gap-2">
        <li
          v-for="tech in direction.technologies"
          :key="tech"
          class="rounded-full bg-elevated px-3 py-1 text-xs font-medium text-toned"
        >
          {{ tech }}
        </li>
      </ul>
    </div>

    <div class="mt-8 flex items-center gap-1.5 text-sm font-medium text-primary">
      <template v-if="direction.available">
        {{ t('direction.start') }}
        <UIcon name="i-lucide-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
      </template>
      <span v-else class="text-muted">{{ t('direction.inProgress') }}</span>
    </div>
  </NuxtLinkLocale>
</template>
