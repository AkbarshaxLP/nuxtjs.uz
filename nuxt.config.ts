// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // @nuxt/content — единственный источник данных для вопросов/ответов.
  // @nuxt/ui — компоненты + Tailwind CSS "из коробки" (ускоряет разработку).
  // @nuxtjs/i18n — мультиязычность (ru/en/uz), см. i18n.config.ts.
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      meta: [
        { property: 'og:site_name', content: 'Interview Prep' },
        { name: 'twitter:card', content: 'summary' }
      ]
    }
  },

  // ru — язык по умолчанию, без префикса в URL (/frontend/...).
  // uz получает префикс (/uz/frontend/...).
  // Сообщения UI лежат в i18n/i18n.config.ts, контент — в content/<locale>/.
  //
  // en временно скрыт (не в списке locales — значит не роутится и не
  // показывается в переключателе), пока не переведён весь контент.
  // Контент content/en/ и коллекции *_en в content.config.ts не удалены —
  // чтобы включить обратно, достаточно вернуть { code: 'en', name: 'English' }.
  i18n: {
    baseUrl: 'https://nuxtjs.uz',
    locales: [
      { code: 'ru', name: 'Русский', language: 'ru-RU' },
      { code: 'uz', name: "O'zbekcha", language: 'uz-UZ' }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default'
  },

  content: {
    // На части shared-хостингов (напр. cPanel на CentOS/CloudLinux 7) системный
    // glibc старее 2.29 — под него не грузится прекомпилированный бинарник
    // better-sqlite3 (по умолчанию), и ЛЮБОЙ SQL-запрос к контенту молча падает
    // (см. историю в памяти/чате: "GLIBC_2.29 not found"), из-за чего вопросы
    // и разделы отдают 404. node:sqlite — часть самого Node.js (>=22.5),
    // собран внутри его официальных Linux-бинарников под куда более старый
    // glibc, поэтому не зависит от системных библиотек хостинга.
    experimental: {
      sqliteConnector: 'native'
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: ['js', 'ts', 'vue', 'html', 'css', 'json', 'bash', 'sql', 'tsx', 'jsx']
        }
      }
    }
  },

  future: { compatibilityVersion: 4 },

  typescript: {
    strict: true
  }
})
