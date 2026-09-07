/**
 * Данные для глобального поиска (Cmd+K), собранные по всем направлениям.
 *
 * queryCollectionSearchSections разбивает каждый вопрос на секции по
 * заголовкам (title/description/tags попадают в secion через extraFields),
 * поэтому поиск работает не только по названию, но и по содержимому.
 */
export async function useQuestionSearch() {
  const [{ data: frontendFiles }, { data: backendFiles }, { data: frontendNav }, { data: backendNav }] =
    await Promise.all([
      useAsyncData('search-sections-frontend', () =>
        queryCollectionSearchSections('frontend', {
          ignoredTags: ['style'],
          extraFields: ['description', 'tags', 'category', 'difficulty']
        })
      ),
      useAsyncData('search-sections-backend', () =>
        queryCollectionSearchSections('backend', {
          ignoredTags: ['style'],
          extraFields: ['description', 'tags', 'category', 'difficulty']
        })
      ),
      useAsyncData('search-navigation-frontend', () => queryCollectionNavigation('frontend')),
      useAsyncData('search-navigation-backend', () => queryCollectionNavigation('backend'))
    ])

  const files = computed(() => [...(frontendFiles.value ?? []), ...(backendFiles.value ?? [])])
  const navigation = computed(() => [...(frontendNav.value ?? []), ...(backendNav.value ?? [])])

  return { files, navigation }
}
