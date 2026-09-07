import type { ContentNavigationItem } from '~/types/interview'

/**
 * Имена коллекций content. Расширяется вместе с content.config.ts
 * при добавлении нового направления (DevOps, QA, ...).
 */
export type DirectionSlug = 'frontend' | 'backend'

/**
 * Тонкая обёртка над queryCollectionNavigation.
 *
 * Это единственное место, где мы обращаемся к Nuxt Content за структурой
 * навигации. Дерево строится автоматически из файловой структуры
 * content/<direction>/**, порядок — из числовых префиксов папок/файлов,
 * заголовки категорий — из .navigation.yml. Добавление нового .md файла
 * или новой папки с вопросами не требует изменений в этом composable.
 */
export async function useContentNavigation(direction: DirectionSlug) {
  const { data } = await useAsyncData(`navigation-${direction}`, () =>
    queryCollectionNavigation(direction)
  )

  return computed<ContentNavigationItem[]>(() => (data.value ?? []) as ContentNavigationItem[])
}
