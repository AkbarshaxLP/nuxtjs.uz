<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

function handleClear() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <UApp>
    <div class="flex min-h-screen flex-col">
      <AppHeader />
      <main class="flex flex-1 items-center justify-center px-4 py-24 text-center">
        <div>
          <p class="text-6xl font-bold text-primary">{{ props.error.statusCode }}</p>
          <h1 class="mt-4 text-2xl font-semibold text-highlighted">
            {{ props.error.statusCode === 404 ? t('error.notFound') : t('error.generic') }}
          </h1>
          <p class="mt-2 text-muted">
            {{ props.error.statusCode === 404
              ? t('error.notFoundDescription')
              : props.error.message }}
          </p>
          <UButton class="mt-6" icon="i-lucide-home" @click="handleClear">{{ t('error.home') }}</UButton>
        </div>
      </main>
    </div>
  </UApp>
</template>
