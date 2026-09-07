import type { Direction } from '~/types/interview'

/**
 * Реестр направлений подготовки.
 *
 * Это единственное место в проекте, где структура "направлений" задаётся
 * вручную — потому что это верхнеуровневая архитектура сайта (какие разделы
 * вообще существуют), а не контент вопросов. Все вопросы внутри направления
 * по-прежнему целиком приходят из @nuxt/content.
 *
 * Чтобы добавить новое направление (DevOps, QA, Python, ...):
 * 1. Добавить запись сюда.
 * 2. Создать коллекцию с тем же slug в content.config.ts.
 * 3. Создать content/<slug>/ с папками технологий.
 * Sidebar, роутинг и страницы подхватят это без изменений кода.
 */
export function useDirections(): Direction[] {
  return [
    {
      slug: 'frontend',
      title: 'Frontend',
      description: 'HTML, CSS, JavaScript, TypeScript, Vue.js и Nuxt.js — вопросы и ответы для собеседований frontend-разработчиков.',
      icon: 'i-lucide-layout-panel-left',
      color: 'primary',
      technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js', 'Nuxt.js'],
      available: true
    },
    {
      slug: 'backend',
      title: 'Backend',
      description: 'Node.js, NestJS, базы данных, PostgreSQL, Prisma, REST API и аутентификация.',
      icon: 'i-lucide-server',
      color: 'neutral',
      technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Databases', 'Prisma', 'Authentication'],
      available: false
    }
  ]
}

export function useDirection(slug: string): Direction | undefined {
  return useDirections().find(direction => direction.slug === slug)
}
