import type { H3Event } from 'h3'
// Явный импорт server-сигнатуры queryCollection(event, collection) — авто-импорт
// в server/ иногда резолвится в клиентскую (без event) и ломает typecheck.
import { queryCollection } from '@nuxt/content/server'

export interface SitemapUrlEntry {
  loc: string
  alternatives: { hreflang: string, href: string }[]
}

const DIRECTIONS = ['frontend', 'backend'] as const
const LOCALES = ['ru', 'uz'] as const

// Совпадает с site.url / i18n.baseUrl в nuxt.config.ts.
export const SITE_URL = 'https://nuxtjs.uz'

function localizedPath(path: string, locale: (typeof LOCALES)[number]) {
  return locale === 'ru' ? path : `/uz${path}`
}

// Коллекции content именуются как <направление>_<локаль> (frontend_ru,
// frontend_uz, ...) — собираем список урлов сайта вручную, обходя все
// коллекции напрямую, вместо того чтобы полагаться на автообнаружение
// маршрутов через краулинг (на этой машине оно падает при билде на Windows,
// см. историю в чате/памяти про "file:///_entry.js" в nitro-пререндере).
//
// Заодно проставляем hreflang-альтернативы между ru/uz версиями одного и
// того же вопроса — без этого поисковики считают их дублями контента.
export async function collectSitemapUrls(event: H3Event): Promise<SitemapUrlEntry[]> {
  // path в content не содержит направление-index — добавляем его вручную,
  // т.к. /frontend и /uz/frontend это обычные Nuxt-страницы ([direction]/index.vue),
  // не привязанные к отдельному content-документу.
  const pathsByLocale = new Map<string, Partial<Record<(typeof LOCALES)[number], true>>>()
  for (const direction of DIRECTIONS) {
    pathsByLocale.set(`/${direction}`, { ru: true, uz: true })
  }

  for (const direction of DIRECTIONS) {
    for (const locale of LOCALES) {
      const collection = `${direction}_${locale}` as const
      const items = await queryCollection(event, collection)
        .where('extension', '=', 'md')
        .select('path')
        .all()

      for (const item of items) {
        const entry = pathsByLocale.get(item.path) ?? {}
        entry[locale] = true
        pathsByLocale.set(item.path, entry)
      }
    }
  }

  const urls: SitemapUrlEntry[] = []
  for (const [path, presentLocales] of pathsByLocale) {
    const alternatives: SitemapUrlEntry['alternatives'] = LOCALES.filter(locale => presentLocales[locale]).map(locale => ({
      hreflang: locale,
      href: `${SITE_URL}${localizedPath(path, locale)}`
    }))
    if (presentLocales.ru) {
      alternatives.push({ hreflang: 'x-default', href: `${SITE_URL}${path}` })
    }

    for (const locale of LOCALES) {
      if (presentLocales[locale]) {
        urls.push({ loc: localizedPath(path, locale), alternatives })
      }
    }
  }

  return urls
}
