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

export default defineContentConfig({
  collections: {
    // Каждое направление — своя коллекция типа "page":
    // 1 markdown-файл = 1 страница, путь генерируется из структуры папок.
    // Источник включает *.md (вопросы/index) и .navigation.yml (метаданные
    // категорий — заголовок/иконка, см. nuxt/content#3092: без .yml в glob
    // Nuxt Content их игнорирует). Специально НЕ используется '**' целиком,
    // чтобы в коллекцию случайно не попали посторонние файлы (изображения,
    // скрипты и т.д.), которые могут лежать в content/ вне структуры вопросов.
    frontend: defineCollection({
      type: 'page',
      source: 'frontend/**/*.{md,yml}',
      schema: questionSchema
    }),
    backend: defineCollection({
      type: 'page',
      source: 'backend/**/*.{md,yml}',
      schema: questionSchema
    })
  }
})
