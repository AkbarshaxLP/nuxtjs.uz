<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const slug = route.params.direction as string

const direction = useDirection(slug)
if (!direction) {
  throw createError({ statusCode: 404, message: 'Направление не найдено' })
}

useSeoMeta({
  title: `${direction.title} — вопросы для собеседования`,
  description: direction.description
})

const { groups } = await useQuestionSidebar(slug as DirectionSlug)
</script>

<template>
  <div class="max-w-3xl">
    <h1 class="text-3xl font-bold text-highlighted">{{ direction.title }}</h1>
    <p class="mt-3 text-lg text-muted">{{ direction.description }}</p>

    <div v-if="!direction.available" class="mt-10 rounded-xl border border-dashed border-default p-10 text-center">
      <UIcon name="i-lucide-hammer" class="mx-auto size-8 text-muted" />
      <p class="mt-3 font-medium text-highlighted">Раздел в разработке</p>
      <p class="mt-1 text-sm text-muted">Вопросы по {{ direction.title }} появятся здесь совсем скоро.</p>
    </div>

    <div v-else-if="groups.length" class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="group in groups"
        :key="group.path"
        :to="group.items[0]?.path ?? group.path"
        class="rounded-xl border border-default p-5 transition-colors hover:border-primary"
      >
        <div class="flex items-center gap-2 font-semibold text-highlighted">
          <UIcon v-if="group.icon" :name="group.icon" class="size-4" />
          {{ group.title }}
        </div>
        <p class="mt-1 text-sm text-muted">{{ group.items.length }} вопрос(ов)</p>
      </NuxtLink>
    </div>

    <div v-else class="mt-10 rounded-xl border border-dashed border-default p-10 text-center text-muted">
      Контент пока не добавлен.
    </div>
  </div>
</template>
