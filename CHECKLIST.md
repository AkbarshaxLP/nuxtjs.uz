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
- [x] Глобальный поиск Cmd+K (`UContentSearch`, поиск по title/description/tags/содержимому)
- [x] Composables вынесены из компонентов (`useContentNavigation`, `useQuestionSidebar`, `useQuestionNavigation`, `useQuestionSearch`)
- [x] `npx nuxi typecheck` — 0 ошибок

## Frontend направление — наполнено и работает

- [x] HTML — 4 вопроса (семантика, доступность, формы, DOM)
- [x] CSS — 6 вопросов (flexbox, grid, специфичность, позиционирование, единицы измерения, SCSS mixin)
- [x] JavaScript — 14 вопросов (closures, event loop, promises, prototypes, синтаксический сахар, ES6+, callbacks, Web API, Babel, var/let/const, this, storage/cookies, ==/===, debounce)
- [x] TypeScript — 5 вопросов (generics, utility types, interface vs type, any/unknown/never, readonly)
- [x] Vue.js — 5 вопросов (Composition API, реактивность, жизненный цикл, компоненты, computed vs watch)
- [x] Nuxt.js — 5 вопросов (SSR, CSR, composables, middleware, server API)
- [x] HTTP — 2 вопроса (методы запросов, PUT vs PATCH)
- [x] Breadcrumb, метаданные (Difficulty/Category/Tags), связанные вопросы, навигация "← Предыдущий / Следующий →"
- [ ] По желанию — добавить больше вопросов в существующие категории (просто новый `.md` файл, без правок кода)

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
