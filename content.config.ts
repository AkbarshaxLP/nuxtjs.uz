import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Общая схема вопроса. Используется и для "вопросов", и для index.md
// направлений/технологий — поэтому предметные поля опциональны:
// у index.md, как правило, есть только title/description.
const questionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(), // человекочитаемое имя технологии, напр. "JavaScript"
  order: z.number().default(0), // порядок внутри категории (доп. к порядку файлов)
  difficulty: z.enum(['junior', 'middle', 'senior']).optional(),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]) // заголовки/ссылки на связанные вопросы
})

// Поддерживаемые локали сайта. Должны совпадать с `locales` в nuxt.config.ts.
const locales = ['ru', 'en', 'uz'] as const

// Направления (совпадают с папками content/<locale>/<direction>/).
const directions = ['frontend', 'backend'] as const

/**
 * i18n для контента: физически файлы разложены по content/<locale>/<direction>/…,
 * но коллекция для КАЖДОЙ локали объявляет `prefix: '/<direction>'` — то есть
 * итоговый `path` вопроса не содержит сегмента локали и одинаков для всех
 * языков (например, "/frontend/http/http-methods" что для ru, что для en).
 * Именно поэтому существующие страницы/роутинг (app/pages/[direction]/…)
 * не знают о локали вообще — её выбирает только то, какую коллекцию
 * (`<direction>_<locale>`) запросить, см. useContentNavigation.ts.
 */
function buildCollections() {
  const collections: Record<string, ReturnType<typeof defineCollection>> = {}

  for (const direction of directions) {
    for (const locale of locales) {
      collections[`${direction}_${locale}`] = defineCollection({
        type: 'page',
        source: {
          include: `${locale}/${direction}/**/*.{md,yml}`,
          prefix: `/${direction}`
        },
        schema: questionSchema
      })
    }
  }

  return collections
}

export default defineContentConfig({
  collections: buildCollections()
})
