type Content = {
  [key: string]: {
    header: {
      about: string;
      courses: string;
      english: string;
      uzbek: string;
      russian: string;
      login: string;
      register: string;
    };
    intro: {
      heading: string;
      p: string;
      get: string;
      about: string;
    };
    popularCourse: {
      popularcourses: string;
      more: string;
      explore: string;
    };
    testi: {
      heading: string;
      text: string;
    };
    contact: {
      heading: string;
      text: string;
      fname: string;
      lname: string;
      phone: string;
      message: string;
      send: string;
    };
    footer: {
      follow: string;
      rights: string;
    };
  };
};

const content: Content = {
  en: {
    header: {
      about: 'About Us',
      courses: 'Courses',
      english: 'English',
      uzbek: 'Uzbek',
      russian: 'Russian',
      login: 'Sign in',
      register: 'Register Now',
    },
    intro: {
      heading: 'Learn anything easy and remote at Educore',
      p: 'Connect with Qualified Tutors from around the world and book your First Free Trial session.',
      get: 'Get started',
      about: 'About Us',
    },
    popularCourse: {
      popularcourses: 'Popular Courses',
      more: 'more',
      explore: 'Explore more courses',
    },
    testi: {
      heading: 'Learn effortlessly!',
      text: 'Access premium study materials from Educore. Elevate your learning experience with our comprehensive course selection.',
    },
    contact: {
      heading: 'Contact Us',
      text: 'You can write if you have any questions or suggestions',
      fname: 'First name',
      lname: 'Last name',
      phone: 'Phone Number',
      message: 'Message',
      send: 'Send',
    },
    footer: {
      follow: 'Follow Us',
      rights: 'All rights reserved',
    },
  },
  uz: {
    header: {
      about: 'Biz haqimizda',
      courses: 'Kurslar',
      english: 'Ingliz',
      uzbek: 'O`zbek',
      russian: 'Rus',
      login: 'Tizimga kirish',
      register: 'Ro`yhatdan o`tish',
    },
    intro: {
      heading: 'Educoreda barcha kurslarni oson va masofadan o`rganing',
      p: `Dunyo bo'ylab malakali o'qituvchilar bilan bog'laning va birinchi bepul sinov darsingizni bron qiling.`,
      get: 'Boshlash',
      about: 'Biz haqimizda',
    },
    popularCourse: {
      popularcourses: 'Mashhur kurslar',
      more: 'ko`proq',
      explore: 'Ko`proq kurslarni o`rganing',
    },
    testi: {
      heading: 'Qiyinchiliksiz o`rganing!',
      text: 'Educoredan yuqori darajadagi o`quv kurslariga kiring. Bizning keng qamrovli kurs tanlovimiz bilan o`rganish tajribangizni oshiring.',
    },
    contact: {
      heading: 'Biz bilan bog`lanish',
      text: 'Savol va takliflaringiz bo`lsa yozishingiz mumkin',
      fname: 'Ism',
      lname: 'Familiya',
      phone: 'Telefon raqam',
      message: 'Xabaringiz',
      send: 'Yuborish',
    },
    footer: {
      follow: 'Bizni kuzatib boring',
      rights: 'Barcha huquqlar himoyalangan',
    },
  },
  ru: {
    header: {
      about: 'О нас',
      courses: 'Курсы',
      english: 'Английский',
      uzbek: 'Узбекский',
      russian: 'Русский',
      login: 'Войти',
      register: 'Зарегистрироваться',
    },
    intro: {
      heading: 'Научитесь всему легко и удаленно в Educore',
      p: 'Получите доступ к Квалифицированным Преподавателям со всего мира и запланируйте свое первое Бесплатное пробное занятие.',
      get: 'Начать',
      about: 'О нас',
    },
    popularCourse: {
      popularcourses: 'Популярные курсы',
      more: 'более',
      explore: 'Посмотрите другие курсы',
    },
    testi: {
      heading: 'Учитесь без усилий!',
      text: 'Получите доступ к учебным материалам премиум-класса от Educore. Повысьте свой опыт обучения с помощью нашего обширного выбора курсов.',
    },
    contact: {
      heading: 'Связаться с нами',
      text: 'Вы можете написать, если у вас есть какие-либо вопросы или предложения',
      fname: 'Имя',
      lname: 'Фамилия',
      phone: 'Номер телефона',
      message: 'Сообщение',
      send: 'Отправлять',
    },
    footer: {
      follow: 'Подписывайтесь на нас',
      rights: 'Все права защищены',
    },
  },
};

export default content;
