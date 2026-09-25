<script setup lang="ts">
// hreflang (alternate ru/uz) + canonical + <html lang>/dir — без этого
// поисковики считают ru- и uz-версии одной и той же страницы дублями.
// useLocaleHead() должен быть вызван синхронно в setup(), пока активен
// контекст Nuxt-приложения — внутри самого useHead() коллбэка (который
// резолвится позже, уже вне этого контекста) вызов падает с NUXT_E1001.
const i18nHead = useLocaleHead({ seo: true })
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: i18nHead.value.meta
}))
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
