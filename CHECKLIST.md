# Interview Prep — чеклист

## Архитектура и инфраструктура

- [x] Nuxt 4 + Vue 3 + TypeScript (strict, `any` не используется)
- [x] `@nuxt/content` v3 — единственный источник контента (без БД)
- [x] `@nuxt/ui` v4 + Tailwind CSS v4 (+ `@tailwindcss/typography` для чтения)
- [x] `content.config.ts` со схемой вопроса на Zod (title, description, category, order, difficulty, tags, related)
- [x] Сайдбар строится автоматически через `queryCollectionNavigation` — без ручных списков категорий
- [x] `.navigation.yml` в папках технологий задаёт название/иконку категории
- [x] Числовые префиксы файлов/папок (`1.html`, `2.css`, ...) задают порядок и не попадают в URL
- [x] Роутинг `/[direction]`, `/[direction]/index.vue`, `/[direction]/[...slug].vue`
- [x] Кастомная страница 404 / `error.vue`
- [x] Тёмная и светлая тема
- [x] Desktop: sticky sidebar. Mobile: Drawer (`USlideover`)
- [x] Глобальный поиск Ctrl/Cmd+\ (`UContentSearch`, поиск по title/description/tags/содержимому; шорткат сменён с Cmd+K — часто перехватывается браузером/редактором)
- [x] Composables вынесены из компонентов (`useContentNavigation`, `useQuestionSidebar`, `useQuestionNavigation`, `useQuestionSearch`)
- [x] `npx nuxi typecheck` — 0 ошибок

## Frontend направление — наполнено и работает

- [x] HTML — 11 вопросов (семантика, доступность, формы, DOM, основы, категории тегов, атрибуты, `<head>`/метаданные, изображения/медиа, ссылки/навигация, таблицы/списки)
- [x] CSS — 14 вопросов (flexbox, grid, специфичность, позиционирование, единицы измерения, SCSS mixin, основы, цвета/шрифты/текст, box model, responsive, анимации/переходы, современные возможности, псевдоклассы/псевдоэлементы, каскад/наследование)
- [x] JavaScript — 20 вопросов (closures, event loop, promises, prototypes, синтаксический сахар, ES6+, callbacks, Web API, Babel, var/let/const, this, storage/cookies, ==/===, debounce, основы языка, функции, массивы и структуры данных, классы, ошибки/отладка, продвинутые темы)
- [x] TypeScript — 13 вопросов (generics, utility types, interface vs type, any/unknown/never, readonly, основы, типизация функций, массивы/коллекции, union/intersection, продвинутые типы, классы и ООП, type narrowing/guards, антипаттерны)
- [x] Vue.js — 14 вопросов (Composition API, реактивность, жизненный цикл, компоненты, computed vs watch, основы, состояние и данные, директивы, формы/события, Vue Router, Pinia, слоты, оптимизация, тестирование)
- [x] Nuxt.js — 5 вопросов (SSR, CSR, composables, middleware, server API)
- [x] HTTP — 2 вопроса (методы запросов, PUT vs PATCH)
- [x] Frontend инструменты — 8 вопросов (бандлеры, пакетные менеджеры, CSS-препроцессоры, линтеры/форматтеры, тестирование, производительность, Storybook, аналитика)
- [x] SEO — 6 вопросов (основы, семантическая вёрстка, on-page, off-page, technical SEO, производительность/скорость)
- [x] Breadcrumb, метаданные (Difficulty/Category/Tags), связанные вопросы, навигация "← Предыдущий / Следующий →"
- [ ] По желанию — добавить больше вопросов в существующие категории (просто новый `.md` файл, без правок кода)

## Мультиязычность (ru/en/uz) — ru + uz активны, en скрыт

- [x] `@nuxtjs/i18n`, `strategy: 'prefix_except_default'` — ru без префикса (`/frontend/...`), uz с префиксом (`/uz/frontend/...`)
- [x] Сообщения UI в `i18n/i18n.config.ts` (важно: модуль ищет файл именно в папке `i18n/`, не в корне проекта)
- [x] Контент разложен по `content/<locale>/<direction>/`; коллекции `<direction>_<locale>` в `content.config.ts` используют `source.prefix`, поэтому `path` вопроса не содержит локаль и одинаков для всех языков
- [x] `useContentNavigation`/`useQuestionSearch` реактивно следят за локалью и перезапрашивают нужную коллекцию
- [x] Переключатель языка — `<SwitchLocalePathLink>` (официальный компонент `@nuxtjs/i18n`, не ручной `switchLocalePath()`)
- [x] Внутренние ссылки — `<NuxtLinkLocale>` / `useLocalePath()` везде, где раньше был обычный `NuxtLink`/`:to=`, иначе локаль сбрасывалась на ru при переходе
- [x] Активное состояние сайдбара (`QuestionItem.vue`, `useQuestionSidebar.ts`) сравнивает `route.path` с `localePath(item.path)`, а не с самим `item.path`
- [x] HTML, CSS, JavaScript, TypeScript, Vue.js, Nuxt.js, HTTP, Frontend инструменты, SEO — переведены на узбекский (93 вопроса)
- [ ] English — контент и коллекции (`content/en/`, `*_en` в content.config.ts) существуют, но `en` временно убран из `locales` в `nuxt.config.ts` (не роутится, не в переключателе) — переведена только категория HTTP; включить обратно: вернуть `{ code: 'en', name: 'English' }`

## Backend направление — структура готова, контент не наполнен

> По ТЗ: сначала работает только Frontend. Backend уже подключён (роутинг, layout, заглушка "в разработке"), осталось наполнить контентом.

- [ ] Node.js
- [ ] NestJS
- [ ] PostgreSQL
- [ ] Databases (общее)
- [ ] Prisma
- [ ] REST API
- [ ] Authentication

## Заложено архитектурно, не активировано

- [ ] Фильтр по Difficulty (Junior/Middle/Senior) — типы и `UBadge` уже есть в `QuestionMeta.vue`
- [ ] Фильтр по Tags — теги уже приходят из схемы контента
- [ ] Прогресс "✓ Изучено" — нужен composable + localStorage/Pinia/API (сейчас не реализовано намеренно)
- [ ] Полноценная аутентификация пользователей

## Будущие направления (расширяемость проверена архитектурой)

Чтобы добавить новое направление, не трогая существующий код:
1. Добавить запись в `useDirections.ts`.
2. Добавить коллекцию в `content.config.ts`.
3. Создать `content/<slug>/` с папками технологий.

Список направлений из ТЗ:

- [ ] DevOps
- [ ] Mobile
- [ ] QA
- [ ] Python
- [ ] Java
- [ ] React
- [ ] Angular
- [ ] System Design
- [ ] HR Questions
