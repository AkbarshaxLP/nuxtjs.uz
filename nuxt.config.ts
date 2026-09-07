// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // @nuxt/content — единственный источник данных для вопросов/ответов.
  // @nuxt/ui — компоненты + Tailwind CSS "из коробки" (ускоряет разработку).
  modules: ['@nuxt/content', '@nuxt/ui'],

  css: ['~/assets/css/main.css'],

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
