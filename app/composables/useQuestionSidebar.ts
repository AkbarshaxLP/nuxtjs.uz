import type { ContentNavigationItem, SidebarGroup, NavigationItem } from '~/types/interview'
import type { DirectionSlug } from '~/composables/useContentNavigation'

function toNavigationItems(children: ContentNavigationItem[] = []): NavigationItem[] {
  return children.map(child => ({ title: child.title, path: child.path }))
}

/**
 * Строит группы сайдбара (категории технологий + вопросы) из дерева
 * навигации Nuxt Content и определяет, какая категория должна быть
 * раскрыта на основе текущего маршрута.
 *
 * Ничего здесь не завязано на конкретные названия технологий — новая
 * папка в content/<direction>/ автоматически станет новой группой.
 */
export async function useQuestionSidebar(direction: DirectionSlug) {
  // useRoute()/useLocalePath() должны быть вызваны до await — иначе теряется
  // контекст Nuxt (composable вызван вне Vue setup / plugin / middleware,
  // см. NUXT_E1001).
  const route = useRoute()
  const localePath = useLocalePath()
  const navigation = await useContentNavigation(direction)

  const groups = computed<SidebarGroup[]>(() => {
    const root = navigation.value[0]
    // index.md направления попадает в children как узел без потомков —
    // это не категория, а просто описание направления, скрываем его.
    const categories = (root?.children ?? []).filter(category => !!category.children?.length)
    return categories.map(category => ({
      title: category.title,
      path: category.path,
      icon: category.icon,
      items: toNavigationItems(category.children)
    }))
  })

  const activeGroupPath = computed(() => {
    // group.path приходит из content без сегмента локали, а route.path на
    // en/uz его содержит — сравниваем с localePath(group.path), см. также
    // QuestionItem.vue, где та же проблема для отдельных вопросов.
    const match = groups.value.find((group) => {
      const groupPath = localePath(group.path)
      return route.path === groupPath || route.path.startsWith(`${groupPath}/`)
    })
    return match?.path
  })

  return { navigation, groups, activeGroupPath }
}
