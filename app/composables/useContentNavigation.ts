import type { ContentNavigationItem } from '~/types/interview'

/**
 * Имена направлений content. Расширяется вместе с content.config.ts
 * при добавлении нового направления (DevOps, QA, ...).
 */
export type DirectionSlug = 'frontend' | 'backend'

/** Локали сайта — должны совпадать с `locales` в nuxt.config.ts и content.config.ts. */
export type LocaleCode = 'ru' | 'en' | 'uz'

/**
 * Имя коллекции content для конкретного направления и локали, напр.
 * "frontend_ru". Контент физически разложен по content/<locale>/<direction>/,
 * но у каждой из них выставлен один и тот же `prefix` в content.config.ts,
 * поэтому `path` вопроса не содержит сегмента локали и одинаков для всех
 * языков — локаль влияет только на то, какую коллекцию мы запрашиваем.
 */
export function collectionName(direction: DirectionSlug, locale: LocaleCode) {
  return `${direction}_${locale}` as const
}

/**
 * Тонкая обёртка над queryCollectionNavigation.
 *
 * Это единственное место, где мы обращаемся к Nuxt Content за структурой
 * навигации. Дерево строится автоматически из файловой структуры
 * content/<locale>/<direction>/**, порядок — из числовых префиксов папок/
 * файлов, заголовки категорий — из .navigation.yml. Добавление нового .md
 * файла или новой папки с вопросами не требует изменений в этом composable.
 *
 * Реактивно следит за текущей локалью (useI18n().locale) — при переключении
 * языка автоматически перезапрашивает навигацию нужной коллекции.
 */
export async function useContentNavigation(direction: DirectionSlug) {
  const { locale } = useI18n()

  const { data } = await useAsyncData(
    () => `navigation-${direction}-${locale.value}`,
    () => queryCollectionNavigation(collectionName(direction, locale.value as LocaleCode)),
    { watch: [locale] }
  )

  return computed<ContentNavigationItem[]>(() => (data.value ?? []) as ContentNavigationItem[])
}
