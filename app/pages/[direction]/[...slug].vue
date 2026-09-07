<script setup lang="ts">
import type { DirectionSlug } from '~/composables/useContentNavigation'
import type { NavigationItem } from '~/types/interview'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const directionSlug = route.params.direction as string
const direction = useDirection(directionSlug)
if (!direction) {
  throw createError({ statusCode: 404, message: 'Направление не найдено' })
}

const slugParts = route.params.slug as string[]
const path = computed(() => `/${directionSlug}/${slugParts.join('/')}`)

const { data: question } = await useAsyncData(
  () => `question-${path.value}`,
  () => queryCollection(directionSlug as DirectionSlug).path(path.value).first()
)

if (!question.value) {
  throw createError({ statusCode: 404, message: 'Вопрос не найден' })
}

useSeoMeta({
  title: () => `${question.value?.title} — ${direction.title}`,
  description: () => question.value?.description
})

// Навигация направления нужна и для breadcrumb/категории, и для prev/next,
// и для разрешения ссылок из frontmatter `related`.
const navigation = await useContentNavigation(directionSlug as DirectionSlug)
const { flatQuestions, prev, next } = useQuestionNavigation(navigation, path)

const currentCategory = computed(
  () => flatQuestions.value.find(q => q.path === path.value)?.category
)

const relatedQuestions = computed<NavigationItem[]>(() => {
  const relatedPaths = question.value?.related ?? []
  return flatQuestions.value.filter(q => relatedPaths.includes(q.path))
})
</script>

<template>
  <article v-if="question" class="max-w-3xl">
    <UBreadcrumb
      :items="[
        { label: direction.title, to: `/${directionSlug}` },
        ...(currentCategory ? [{ label: currentCategory }] : []),
        { label: question.title }
      ]"
      class="mb-6"
    />

    <h1 class="text-3xl font-bold text-highlighted">{{ question.title }}</h1>

    <InterviewQuestionMeta
      class="mt-4"
      :category="currentCategory"
      :difficulty="question.difficulty"
      :tags="question.tags"
    />

    <div class="prose dark:prose-invert mt-8">
      <ContentRenderer :value="question" />
    </div>

    <div class="mt-10">
      <InterviewRelatedQuestions :questions="relatedQuestions" />
    </div>

    <div class="mt-10">
      <InterviewQuestionNavigation :prev="prev" :next="next" />
    </div>
  </article>
</template>
