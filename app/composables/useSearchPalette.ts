/**
 * Общее состояние "открыт ли поиск" — нужно, чтобы кнопка в шапке
 * (AppHeader) и сама модалка поиска (QuestionSearch) могли жить в разных
 * компонентах, но управлять одним и тем же UContentSearch.
 */
export function useSearchPalette() {
  return useState('search-palette-open', () => false)
}
