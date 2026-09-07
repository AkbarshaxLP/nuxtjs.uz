<script setup lang="ts">
// Переключатель языка сайта (ru/en/uz). SwitchLocalePathLink — компонент
// @nuxtjs/i18n именно для этой задачи: сам строит корректный URL текущей
// страницы для другой локали (с учётом strategy: 'prefix_except_default' —
// ru без префикса, en/uz с /en, /uz) и сам решает навигацию, поэтому
// не нужно вручную вызывать switchLocalePath() и собирать items.
const { locale, locales, t } = useI18n()

const availableLocales = computed(() => (locales.value as Array<{ code: string }>).map(l => l.code))
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-md border border-default p-0.5 text-xs font-medium"
    :aria-label="t('header.language')"
  >
    <SwitchLocalePathLink
      v-for="code in availableLocales"
      :key="code"
      :locale="code as 'ru' | 'uz'"
      class="rounded px-2 py-1 transition-colors"
      :class="code === locale
        ? 'bg-primary text-inverted'
        : 'text-muted hover:text-highlighted hover:bg-elevated'"
    >
      {{ code.toUpperCase() }}
    </SwitchLocalePathLink>
  </div>
</template>
