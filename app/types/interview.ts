/**
 * Доменные типы платформы подготовки к собеседованиям.
 * Единственный источник контента — @nuxt/content, поэтому большинство
 * типов здесь — это форма данных, которые Content возвращает нам,
 * а не то, что мы храним сами.
 */

export type DifficultyLevel = 'junior' | 'middle' | 'senior'

/** Верхнеуровневое направление подготовки (Frontend, Backend, ...). */
export interface Direction {
  /** Слаг = имя коллекции Content = сегмент URL (/frontend, /backend). */
  slug: string
  title: string
  description: string
  icon: string
  color: string
  /** Список технологий для превью на карточке главной страницы. */
  technologies: string[]
  /** Готово ли направление к использованию (для будущих DevOps/QA/... ). */
  available: boolean
}

/** Один вопрос-ответ, каким он приходит из content-файла. */
export interface Question {
  path: string
  title: string
  description?: string
  category?: string
  order: number
  difficulty?: DifficultyLevel
  tags: string[]
  related: string[]
  body?: unknown
}

/** Узел дерева навигации, построенного из структуры папок content/. */
export interface ContentNavigationItem {
  title: string
  path: string
  icon?: string
  children?: ContentNavigationItem[]
}

/** Категория (технология) в сайдбаре, напр. "JavaScript" со списком вопросов. */
export interface SidebarGroup {
  title: string
  path: string
  icon?: string
  items: NavigationItem[]
}

/** Один пункт-вопрос в сайдбаре. */
export interface NavigationItem {
  title: string
  path: string
}

/** Плоский элемент для вычисления prev/next и поиска по всему направлению. */
export interface FlatQuestionRef {
  title: string
  path: string
  category: string
}
