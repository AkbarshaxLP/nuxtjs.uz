import type { Direction } from '~/types/interview'

/**
 * Реестр направлений подготовки.
 *
 * Это единственное место в проекте, где структура "направлений" задаётся
 * вручную — потому что это верхнеуровневая архитектура сайта (какие разделы
 * вообще существуют), а не контент вопросов. Все вопросы внутри направления
 * по-прежнему целиком приходят из @nuxt/content.
 *
 * title/description локализованы через i18n.config.ts (ключ directions.*),
 * поэтому это computed — чтобы переключение языка обновляло эти строки
 * реактивно, даже если компонент, вызвавший useDirections(), не размонтируется
 * заново при смене локали (напр. AppHeader живёт в layout).
 *
 * Чтобы добавить новое направление (DevOps, QA, Python, ...):
 * 1. Добавить запись сюда + переводы directions.<slug>.title/description в i18n.config.ts.
 * 2. Создать коллекции `<slug>_ru`/`<slug>_en`/`<slug>_uz` в content.config.ts.
 * 3. Создать content/<locale>/<slug>/ с папками технологий.
 * Sidebar, роутинг и страницы подхватят это без изменений кода.
 */
export function useDirections() {
  const { t } = useI18n()

  return computed<Direction[]>(() => [
    {
      slug: 'frontend',
      title: t('directions.frontend.title'),
      description: t('directions.frontend.description'),
      icon: 'i-lucide-layout-panel-left',
      color: 'primary',
      technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js', 'Nuxt.js'],
      available: true
    },
    {
      slug: 'backend',
      title: t('directions.backend.title'),
      description: t('directions.backend.description'),
      icon: 'i-lucide-server',
      color: 'neutral',
      technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Databases', 'Prisma', 'Authentication'],
      available: false
    }
  ])
}

export function useDirection(slug: string): Direction | undefined {
  return useDirections().value.find(direction => direction.slug === slug)
}
