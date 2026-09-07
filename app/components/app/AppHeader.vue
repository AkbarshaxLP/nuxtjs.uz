<script setup lang="ts">
const route = useRoute()
const directions = useDirections()
const mobileOpen = useMobileSidebar()
// Тот же shared-composable, что использует UContentSearch внутри себя —
// только так клик по кнопке реально открывает модалку поиска (см. QuestionSearch.vue).
const { open: searchOpen } = useContentSearch()
const { t } = useI18n()
const localePath = useLocalePath()

// Кнопка-гамбургер нужна только внутри направления, где есть сайдбар.
const hasSidebar = computed(() => directions.value.some(d => d.slug === route.params.direction))

const colorMode = useColorMode()
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default/80 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
      <UButton
        v-if="hasSidebar"
        icon="i-lucide-menu"
        variant="ghost"
        color="neutral"
        class="lg:hidden"
        :aria-label="t('header.openMenu')"
        @click="mobileOpen = true"
      />

      <NuxtLinkLocale to="/" class="flex items-center gap-2 font-semibold text-highlighted">
        <UIcon name="i-lucide-graduation-cap" class="size-5 text-primary" />
        <span class="hidden sm:inline">Interview Prep</span>
      </NuxtLinkLocale>

      <nav class="ml-2 hidden items-center gap-1 md:flex">
        <UButton
          v-for="direction in directions"
          :key="direction.slug"
          :to="direction.available ? localePath(`/${direction.slug}`) : undefined"
          :disabled="!direction.available"
          variant="ghost"
          color="neutral"
          size="sm"
        >
          {{ direction.title }}
        </UButton>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <UButton
          icon="i-lucide-search"
          variant="outline"
          color="neutral"
          size="sm"
          class="hidden sm:flex"
          @click="searchOpen = true"
        >
          {{ t('search.button') }}
          <template #trailing>
            <UKbd value="meta" />
            <UKbd value="\" />
          </template>
        </UButton>
        <UButton
          icon="i-lucide-search"
          variant="ghost"
          color="neutral"
          class="sm:hidden"
          :aria-label="t('search.button')"
          @click="searchOpen = true"
        />

        <AppLanguageSwitcher />

        <UButton
          :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
          variant="ghost"
          color="neutral"
          :aria-label="t('header.toggleTheme')"
          @click="toggleColorMode"
        />
      </div>
    </div>
  </header>
</template>
