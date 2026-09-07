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
 *
 * server: false — эти запросы нужны только клиенту (сам компонент поиска
 * рендерится под ClientOnly). Без этого флага useAsyncData всё равно
 * выполнял бы queryCollectionSearchSections (полный обход + парсинг AST
 * ВСЕХ md-файлов всех направлений) на сервере при каждом SSR-рендере
 * КАЖДОЙ страницы — компонент подключён в default.vue и docs.vue, то есть
 * это происходило на каждый запрос к сайту и раздувало память Node-сервера.
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
        { watch: [localeCode], server: false }
      ),
      useAsyncData(
        () => `search-sections-backend-${localeCode.value}`,
        () => queryCollectionSearchSections(collectionName('backend', localeCode.value), {
          ignoredTags: ['style'],
          extraFields: ['description', 'tags', 'category', 'difficulty']
        }),
        { watch: [localeCode], server: false }
      ),
      useAsyncData(
        () => `search-navigation-frontend-${localeCode.value}`,
        () => queryCollectionNavigation(collectionName('frontend', localeCode.value)),
        { watch: [localeCode], server: false }
      ),
      useAsyncData(
        () => `search-navigation-backend-${localeCode.value}`,
        () => queryCollectionNavigation(collectionName('backend', localeCode.value)),
        { watch: [localeCode], server: false }
      )
    ])

  const files = computed(() => [...(frontendFiles.value ?? []), ...(backendFiles.value ?? [])])
  const navigation = computed(() => [...(frontendNav.value ?? []), ...(backendNav.value ?? [])])

  return { files, navigation }
}
