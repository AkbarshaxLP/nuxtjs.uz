export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'ru',
  messages: {
    ru: {
      header: { openMenu: 'Открыть меню', toggleTheme: 'Переключить тему', language: 'Язык' },
      search: { button: 'Поиск' },
      error: {
        notFound: 'Страница не найдена',
        generic: 'Что-то пошло не так',
        notFoundDescription: 'Такого вопроса или раздела пока не существует.',
        home: 'На главную'
      },
      home: {
        seoTitle: 'Interview Prep — подготовка к техническим собеседованиям',
        seoDescription: 'Вопросы и ответы для подготовки к собеседованиям: Frontend и Backend разработка.',
        badge: 'Бесплатная подготовка',
        title: 'Подготовка к техническим собеседованиям',
        subtitle: 'Структурированные вопросы и ответы по ключевым технологиям. Выберите направление, чтобы начать.'
      },
      direction: {
        comingSoonBadge: 'Скоро',
        start: 'Начать подготовку',
        inProgress: 'Раздел в разработке',
        inProgressDescription: 'Вопросы по {title} появятся здесь совсем скоро.',
        notFound: 'Направление не найдено',
        questionsCount: '{count} вопрос(ов)',
        noContent: 'Контент пока не добавлен.',
        pageTitle: '{title} — вопросы для собеседования'
      },
      question: {
        notFound: 'Вопрос не найден',
        related: 'Связанные вопросы',
        prev: 'Предыдущий вопрос',
        next: 'Следующий вопрос'
      },
      sidebar: {
        ariaLabel: 'Навигация по вопросам',
        comingSoon: 'Контент скоро появится.',
        mobileTitle: 'Навигация'
      },
      directions: {
        frontend: {
          title: 'Frontend',
          description: 'HTML, CSS, JavaScript, TypeScript, Vue.js и Nuxt.js — вопросы и ответы для собеседований frontend-разработчиков.'
        },
        backend: {
          title: 'Backend',
          description: 'Node.js, NestJS, базы данных, PostgreSQL, Prisma, REST API и аутентификация.'
        }
      }
    },
    en: {
      header: { openMenu: 'Open menu', toggleTheme: 'Toggle theme', language: 'Language' },
      search: { button: 'Search' },
      error: {
        notFound: 'Page not found',
        generic: 'Something went wrong',
        notFoundDescription: "This question or section doesn't exist yet.",
        home: 'Go home'
      },
      home: {
        seoTitle: 'Interview Prep — technical interview preparation',
        seoDescription: 'Questions and answers to prepare for interviews: Frontend and Backend development.',
        badge: 'Free preparation',
        title: 'Prepare for technical interviews',
        subtitle: 'Structured questions and answers on key technologies. Choose a direction to get started.'
      },
      direction: {
        comingSoonBadge: 'Coming soon',
        start: 'Start preparing',
        inProgress: 'Section in progress',
        inProgressDescription: 'Questions on {title} will appear here soon.',
        notFound: 'Direction not found',
        questionsCount: '{count} question(s)',
        noContent: "Content hasn't been added yet.",
        pageTitle: '{title} — interview questions'
      },
      question: {
        notFound: 'Question not found',
        related: 'Related questions',
        prev: 'Previous question',
        next: 'Next question'
      },
      sidebar: {
        ariaLabel: 'Question navigation',
        comingSoon: 'Content coming soon.',
        mobileTitle: 'Navigation'
      },
      directions: {
        frontend: {
          title: 'Frontend',
          description: 'HTML, CSS, JavaScript, TypeScript, Vue.js and Nuxt.js — questions and answers for frontend developer interviews.'
        },
        backend: {
          title: 'Backend',
          description: 'Node.js, NestJS, databases, PostgreSQL, Prisma, REST API and authentication.'
        }
      }
    },
    uz: {
      header: { openMenu: 'Menyuni ochish', toggleTheme: "Mavzuni almashtirish", language: 'Til' },
      search: { button: 'Qidiruv' },
      error: {
        notFound: 'Sahifa topilmadi',
        generic: 'Nimadir xato ketdi',
        notFoundDescription: "Bunday savol yoki bo'lim hali mavjud emas.",
        home: 'Bosh sahifaga'
      },
      home: {
        seoTitle: 'Interview Prep — texnik suhbatlarga tayyorgarlik',
        seoDescription: "Frontend va Backend yo'nalishlari bo'yicha suhbatlarga tayyorgarlik uchun savol-javoblar.",
        badge: 'Bepul tayyorgarlik',
        title: 'Texnik suhbatlarga tayyorgarlik',
        subtitle: "Asosiy texnologiyalar bo'yicha tizimlashtirilgan savol-javoblar. Boshlash uchun yo'nalishni tanlang."
      },
      direction: {
        comingSoonBadge: 'Tez orada',
        start: 'Tayyorgarlikni boshlash',
        inProgress: "Bo'lim tayyorlanmoqda",
        inProgressDescription: '{title} bo\'yicha savollar tez orada shu yerda paydo bo\'ladi.',
        notFound: "Yo'nalish topilmadi",
        questionsCount: '{count} ta savol',
        noContent: "Kontent hali qo'shilmagan.",
        pageTitle: "{title} — suhbat uchun savollar"
      },
      question: {
        notFound: 'Savol topilmadi',
        related: "Bog'liq savollar",
        prev: 'Oldingi savol',
        next: 'Keyingi savol'
      },
      sidebar: {
        ariaLabel: "Savollar bo'yicha navigatsiya",
        comingSoon: "Kontent tez orada paydo bo'ladi.",
        mobileTitle: 'Navigatsiya'
      },
      directions: {
        frontend: {
          title: 'Frontend',
          description: "HTML, CSS, JavaScript, TypeScript, Vue.js va Nuxt.js — frontend dasturchilar bilan suhbat uchun savol-javoblar."
        },
        backend: {
          title: 'Backend',
          description: "Node.js, NestJS, ma'lumotlar bazalari, PostgreSQL, Prisma, REST API va autentifikatsiya."
        }
      }
    }
  }
}))
