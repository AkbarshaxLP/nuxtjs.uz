import { collectionName, type LocaleCode } from '~/composables/useContentNavigation'

/**
 * Данные для глобального поиска (Ctrl/Cmd+\), собранные по всем направлениям
 * для текущего языка интерфейса.
 *
 * queryCollectionSearchSections разбивает каждый вопрос на секции по
 * заголовкам (title/description/tags попадают в secion через extraFields),
 * поэтому поиск работает не только по названию, но и по содержимому.
 *
 * Реактивно следит за локалью — при переключении языка пересобирает индекс
 * поиска из коллекций нужного языка.
 */
export async function useQuestionSearch() {
  const { locale } = useI18n()
  const localeCode = computed(() => locale.value as LocaleCode)

  const [{ data: frontendFiles }, { data: backendFiles }, { data: frontendNav }, { data: backendNav }] =
    await Promise.all([
      useAsyncData(
        () => `search-sections-frontend-${localeCode.value}`,
        () => queryCollectionSearchSections(collectionName('frontend', localeCode.value), {
          ignoredTags: ['style'],
          extraFields: ['description', 'tags', 'category', 'difficulty']
        }),
        { watch: [localeCode] }
      ),
      useAsyncData(
        () => `search-sections-backend-${localeCode.value}`,
        () => queryCollectionSearchSections(collectionName('backend', localeCode.value), {
          ignoredTags: ['style'],
          extraFields: ['description', 'tags', 'category', 'difficulty']
        }),
        { watch: [localeCode] }
      ),
      useAsyncData(
        () => `search-navigation-frontend-${localeCode.value}`,
        () => queryCollectionNavigation(collectionName('frontend', localeCode.value)),
        { watch: [localeCode] }
      ),
      useAsyncData(
        () => `search-navigation-backend-${localeCode.value}`,
        () => queryCollectionNavigation(collectionName('backend', localeCode.value)),
        { watch: [localeCode] }
      )
    ])

  const files = computed(() => [...(frontendFiles.value ?? []), ...(backendFiles.value ?? [])])
  const navigation = computed(() => [...(frontendNav.value ?? []), ...(backendNav.value ?? [])])

  return { files, navigation }
}
