import type { ContentNavigationItem, FlatQuestionRef } from '~/types/interview'

/**
 * Разворачивает дерево навигации направления в плоский список вопросов
 * (в порядке чтения: категория за категорией) и вычисляет соседние
 * вопросы для кнопок "Предыдущий / Следующий" на странице вопроса.
 */
export function useQuestionNavigation(
  navigation: Ref<ContentNavigationItem[]>,
  currentPath: Ref<string> | string
) {
  const flatQuestions = computed<FlatQuestionRef[]>(() => {
    const root = navigation.value[0]
    const categories = root?.children ?? []
    return categories.flatMap(category =>
      (category.children ?? []).map(item => ({
        title: item.title,
        path: item.path,
        category: category.title
      }))
    )
  })

  const path = computed(() => unref(currentPath))
  const currentIndex = computed(() => flatQuestions.value.findIndex(q => q.path === path.value))

  const prev = computed<FlatQuestionRef | undefined>(() =>
    currentIndex.value > 0 ? flatQuestions.value[currentIndex.value - 1] : undefined
  )
  const next = computed<FlatQuestionRef | undefined>(() =>
    currentIndex.value >= 0 && currentIndex.value < flatQuestions.value.length - 1
      ? flatQuestions.value[currentIndex.value + 1]
      : undefined
  )

  return { flatQuestions, prev, next }
}
