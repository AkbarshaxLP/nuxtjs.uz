// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // @nuxt/content — единственный источник данных для вопросов/ответов.
  // @nuxt/ui — компоненты + Tailwind CSS "из коробки" (ускоряет разработку).
  // @nuxtjs/i18n — мультиязычность (ru/en/uz), см. i18n.config.ts.
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],

  // ru — язык по умолчанию, без префикса в URL (/frontend/...).
  // uz получает префикс (/uz/frontend/...).
  // Сообщения UI лежат в i18n/i18n.config.ts, контент — в content/<locale>/.
  //
  // en временно скрыт (не в списке locales — значит не роутится и не
  // показывается в переключателе), пока не переведён весь контент.
  // Контент content/en/ и коллекции *_en в content.config.ts не удалены —
  // чтобы включить обратно, достаточно вернуть { code: 'en', name: 'English' }.
  i18n: {
    locales: [
      { code: 'ru', name: 'Русский' },
      { code: 'uz', name: "O'zbekcha" }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default'
  },

  content: {
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
