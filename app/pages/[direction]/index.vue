<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const slug = route.params.direction as string
const { t } = useI18n()

const direction = useDirection(slug)
if (!direction) {
  throw createError({ statusCode: 404, message: t('direction.notFound') })
}

useSeoMeta({
  title: () => t('direction.pageTitle', { title: direction.title }),
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
      <p class="mt-3 font-medium text-highlighted">{{ t('direction.inProgress') }}</p>
      <p class="mt-1 text-sm text-muted">{{ t('direction.inProgressDescription', { title: direction.title }) }}</p>
    </div>

    <div v-else-if="groups.length" class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLinkLocale
        v-for="group in groups"
        :key="group.path"
        :to="group.items[0]?.path ?? group.path"
        class="rounded-xl border border-default p-5 transition-colors hover:border-primary"
      >
        <div class="flex items-center gap-2 font-semibold text-highlighted">
          <UIcon v-if="group.icon" :name="group.icon" class="size-4" />
          {{ group.title }}
        </div>
        <p class="mt-1 text-sm text-muted">{{ t('direction.questionsCount', { count: group.items.length }) }}</p>
      </NuxtLinkLocale>
    </div>

    <div v-else class="mt-10 rounded-xl border border-dashed border-default p-10 text-center text-muted">
      {{ t('direction.noContent') }}
    </div>
  </div>
</template>
