import { NavLink } from 'react-router-dom';

type Content = {
  [key: string]: {
    header: {
      about: string;
      courses: string;
      blogs: string;
      english: string;
      uzbek: string;
      russian: string;
      login: string;
      register: string;
      gotodashboard: string;
      teacher: string;
      go: string;
      partner: string;
    };
    intro: {
      heading: JSX.Element;
      p: JSX.Element;
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
    blogs: {
      blogs: string;
      btn: string;
      more: string;
    };
    aboutIntro: {
      learn: string;
      desc: string;
    };
    coursesPage: {
      find: string;
      course: string;
      rating: string;
      price: string;
      previous: string;
      next: string;
    };
    blogsPage: {
      blogs: string;
      more: string;
    };
    log: {
      start: string;
      login: string;
      email: string;
      pass: string;
      signin: string;
      dont: string;
      signup: string;
      register: string;
      fname: string;
      lname: string;
      phone: string;
      age: string;
      address: string;
      tg: string;
      create: string;
      already: string;
    };
    buy: {
      about: string;
      period: string;
      month: string;
      teacher: string;
      buy: string;
      free: string;
    };
    partner: {
      part: string;
    };
    marathon: {
      until: string;
      miss: string;
      register: string;
    };
    video: {
      team: string;
      text: string;
      watch: string;
    };
    sodiq: {
      enrol: string;
      today: string;
    };
  };
};

const content: Content = {
  en: {
    header: {
      about: 'About Us',
      courses: 'Courses',
      blogs: 'Blogs',
      english: 'English',
      uzbek: 'Uzbek',
      russian: 'Russian',
      login: 'Sign in',
      register: 'Register Now',
      gotodashboard: 'Go to dashboard →',
      teacher: 'For teachers',
      go: 'Go to Dashboard',
      partner: 'Partners',
    },
    intro: {
      heading: (
        <span className="">
          Learn anything <span className="underline">easy</span> and{' '}
          <span className="underline">remote</span> with Educore
        </span>
      ),
      p: (
        <span className="leading-20">
          Connect with Qualified Tutors from around the world and book your
          First {''}
          <NavLink to="/all/courses">
            <span className="font-bold underline"> Free Trial</span>
          </NavLink>{' '}
          session.
        </span>
      ),
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
    blogs: {
      blogs: 'Blogs',
      btn: 'See all blogs',
      more: 'Read more',
    },
    aboutIntro: {
      learn: 'Learn with us',
      desc: '“Educore – will be connecting tutors from around the globe and developing innovative teaching environment, we are willing to create a platform which will let people study from their home.”',
    },
    coursesPage: {
      find: 'Find your first course',
      course: 'Select Course',
      rating: 'Select Rating',
      price: 'Price',
      previous: 'Previous',
      next: 'Next',
    },
    blogsPage: {
      blogs: 'Blogs',
      more: 'Read More',
    },
    log: {
      start: 'Start for free',
      login: 'Sign In to Educore',
      email: 'Email',
      pass: 'Password',
      signin: 'Sign In',
      dont: 'Don’t have any account?',
      signup: 'Sign Up',
      register: 'Sign Up to Educore',
      fname: 'First Name',
      lname: 'Last Name',
      phone: 'Phone',
      age: 'Age',
      address: 'Address',
      tg: 'Telegram Username (optional)',
      create: 'Create an account',
      already: 'Already have an account?',
    },
    buy: {
      about: 'About the course',
      period: 'Period:',
      month: 'months',
      teacher: 'About the Course Teacher',
      buy: 'Buy now',
      free: 'Use Free Trial',
    },
    partner: {
      part: 'Our Partners',
    },
    marathon: {
      until: 'The marathon has begun!',
      miss: `Don't miss the opportunity. Click register Button`,
      register: 'Register now',
    },
    video: {
      team: 'Educore Team',
      text: 'How to Register and Buy your first course?',
      watch: 'watch video',
    },
    sodiq: {
      enrol: 'Enroll Now for SAT Prep at Sodiq Academy!',
      today:
        'Enroll today at Sodiq Academy for comprehensive SAT prep courses.',
    },
  },
  uz: {
    header: {
      about: 'Biz haqimizda',
      courses: 'Kurslar',
      blogs: 'Bloglar',
      english: 'Ingliz',
      uzbek: 'O`zbek',
      russian: 'Rus',
      login: 'Tizimga kirish',
      register: 'Ro`yhatdan o`tish',
      gotodashboard: 'Dashboardga o`tish →',
      teacher: 'Ustozlar uchun',
      go: 'Kirish',
      partner: 'Hamkorlarimiz',
    },
    intro: {
      heading: (
        <span className="leading-20">
          Educoreda barcha kurslarni <span className="underline">oson</span> va{' '}
          <span className="underline">masofadan</span> o`rganing
        </span>
      ),
      p: (
        <span className="leading-20">
          Dunyo bo'ylab malakali o'qituvchilar bilan bog'laning va birinchi
          <NavLink to="/all/courses">
            <span className="font-bold underline"> bepul sinov</span>
          </NavLink>{' '}
          darsingizni bron qiling.
        </span>
      ),
      get: 'Boshlash',
      about: 'Biz haqimizda',
    },
    popularCourse: {
      popularcourses: 'Mashhur kurslar',
      more: 'batafsil',
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
    blogs: {
      blogs: 'Bloglar',
      btn: 'Barcha bloglarni ko`rish',
      more: 'Batafsil o`qish',
    },
    aboutIntro: {
      learn: 'Biz bilan o`rganing',
      desc: '"Educore - butun dunyo bo`ylab repetitorlarni bog`laydi va innovatsion o`qitish muhitini rivojlantiradi, biz odamlarga o`z uylaridan turib o`qish imkonini beradigan platforma yaratishga tayyormiz."',
    },
    coursesPage: {
      find: 'Birinchi kursingizni toping',
      course: 'Kurs turini tanlang',
      rating: 'Reytingni tanlang',
      price: 'Narxi',
      previous: 'Oldingi',
      next: 'Keyingi',
    },
    blogsPage: {
      blogs: 'Bloglar',
      more: 'Ko`proq o`qish',
    },
    log: {
      start: 'Bepul boshlang',
      login: 'Educore tizimiga kiring',
      email: 'Email',
      pass: 'Parol',
      signin: 'Tizimga kirish',
      dont: 'Hisobingiz yo`qmi?',
      signup: 'Ro`yxatdan o`tish',
      register: 'Educoredan ro`yxatdan o`ting',
      fname: 'Ism',
      lname: 'Familiya',
      phone: 'Telefon raqam',
      age: 'Yosh',
      address: 'Yashash manzil',
      tg: 'Telegram Username (ixtiyoriy)',
      create: 'Akkaunt yaratish',
      already: 'Hisobingiz bormi?',
    },
    buy: {
      about: 'Kurs haqida',
      period: 'Kurs davomiyligi:',
      month: 'oy',
      teacher: 'Ustoz haqida ',
      buy: 'Hozir sotib olish',
      free: 'Free Trialdan foydalanish',
    },
    partner: {
      part: 'Bizning hamkorlarimiz',
    },
    marathon: {
      until: 'Marafon boshlandi!',
      miss: 'Imkoniyatingizni qo`ldan boy bermang. Ro`yhatdan o`tish tugmasini bosing',
      register: 'Hoziroq roʻyxatdan oʻting',
    },
    video: {
      team: 'Educore Jamoasi',
      text: 'Qanday qilib ro`yxatdan o`tish va birinchi kursni sotib olish mumkin?',
      watch: 'Videoni ko`rish',
    },
    sodiq: {
      enrol: 'Sodiq Akademiyasida SATga hoziroq yoziling!',
      today:
        'Bugunoq Sodiq Akademiyasida keng qamrovli SAT tayyorlov kurslariga yoziling.',
    },
  },
  ru: {
    header: {
      about: 'О нас',
      courses: 'Курсы',
      blogs: 'Блоги',
      english: 'Английский',
      uzbek: 'Узбекский',
      russian: 'Русский',
      login: 'Войти',
      register: 'Зарегистрироваться',
      gotodashboard: 'Перейти к dashboard →',
      teacher: 'Для учителей',
      go: 'Войти',
      partner: 'Партнеры',
    },
    intro: {
      heading: (
        <span className="leading-20">
          Научитесь всему <span className="underline">легко</span> и{' '}
          <span className="underline">удаленно</span>в Educore
        </span>
      ),
      p: (
        <span className="leading-20">
          Получите доступ к Квалифицированным Преподавателям со всего мира и
          запланируйте свое первое
          <NavLink to="/all/courses">
            <span className="font-bold underline"> Бесплатное пробное</span>
          </NavLink>{' '}
          занятие
        </span>
      ),
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
    blogs: {
      blogs: 'Блоги',
      btn: 'Посмотреть все блоги',
      more: 'Читать больше',
    },
    aboutIntro: {
      learn: 'Учитесь вместе с нами',
      desc: '«Educore – будет объединять репетиторов со всего мира и развивать инновационную среду обучения. Мы готовы создать платформу, которая позволит людям учиться, не выходя из дома».',
    },
    coursesPage: {
      find: 'Найдите свой первый курс',
      course: 'Выберите тип курса',
      rating: 'Выберите рейтинг',
      price: 'Цена',
      previous: 'Предыдущий',
      next: 'Следующий',
    },
    blogsPage: {
      blogs: 'Блоги',
      more: 'Читать далее',
    },
    log: {
      start: 'Начните бесплатно',
      login: 'Войти в Educore',
      email: 'Электронная почта',
      pass: 'Пароль',
      signin: 'Войти',
      dont: 'У вас нет учетной записи?',
      signup: 'Зарегистрироваться',
      register: 'Зарегистрируйтесь в Educore',
      fname: 'Имя',
      lname: 'Фамилия',
      phone: 'Номер телефона',
      age: 'Возраст',
      address: 'Адрес',
      tg: 'Имя пользователя Telegram (необязательно)',
      create: 'Завести аккаунт',
      already: 'У тебя есть аккаунт?',
    },
    buy: {
      about: 'О курсе',
      period: 'Длительность курса:',
      month: 'месяцев',
      teacher: 'Об учителе ',
      buy: 'Купить сейчас',
      free: 'Использование Free Trial',
    },
    partner: {
      part: 'Наши партнеры',
    },
    marathon: {
      until: 'Марафон начался!',
      miss: 'Не упустите возможность. Нажмите кнопку регистрации',
      register: 'Зарегистрироваться',
    },
    video: {
      team: 'Команда Educore',
      text: 'Как зарегистрироваться и купить свой первый курс?',
      watch: 'Смотреть видео',
    },
    sodiq: {
      enrol: 'Запишитесь сейчас на подготовку к SAT в Sodiq Academy!',
      today:
        'Запишитесь сегодня в Sodiq Academy на комплексные курсы подготовки к SAT.',
    },
  },
};

export default content;
