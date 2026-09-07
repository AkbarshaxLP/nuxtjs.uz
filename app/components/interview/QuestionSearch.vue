<script setup lang="ts">
// Глобальный поиск по всем направлениям и вопросам (Ctrl/Cmd+\).
// Ищет по title/description/tags/содержимому — секции строит
// queryCollectionSearchSections, дальше всё делает UContentSearch (Fuse.js).
//
// Открытие/закрытие модалки не пробрасываем через свой v-model:open —
// UContentSearch не принимает "open" как проп, а хранит его во внутреннем
// shared-composable useContentSearch() из @nuxt/ui. Внешний v-model:open
// молча ничего не делал (компонент его не объявляет), поэтому кнопка
// в шапке не открывала поиск, а после выбора варианта модалка не
// закрывалась. Управление — через тот же useContentSearch() (см. AppHeader).
//
// Шорткат сменён с Cmd/Ctrl+K на Cmd/Ctrl+\ — Ctrl+K часто перехватывается
// браузером/редактором (адресная строка, command palette) раньше, чем
// событие доходит до страницы.
const { files, navigation } = await useQuestionSearch()
</script>

<template>
  <ClientOnly>
    <LazyUContentSearch
      shortcut="meta_\"
      :files="files"
      :navigation="navigation"
      :fuse="{ resultLimit: 20 }"
    />
  </ClientOnly>
</template>
