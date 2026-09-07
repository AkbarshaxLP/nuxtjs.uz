<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useI18n()

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription')
})

const directions = useDirections()
</script>

<template>
  <div class="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <UBadge color="primary" variant="subtle" class="mb-4">{{ t('home.badge') }}</UBadge>
      <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
        {{ t('home.title') }}
      </h1>
      <p class="mt-4 text-lg text-muted">
        {{ t('home.subtitle') }}
      </p>
    </div>

    <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
      <InterviewDirectionCard v-for="direction in directions" :key="direction.slug" :direction="direction" />
    </div>
  </div>
</template>
