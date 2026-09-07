/** Открыт ли мобильный Drawer с навигацией. Общий стейт для Header и Drawer. */
export function useMobileSidebar() {
  return useState('mobile-sidebar-open', () => false)
}
