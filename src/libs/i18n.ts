export type Locale = 'en' | 'es';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'welcome': 'Welcome',
    'intro': 'Hi, I\'m <b class="font-bold">Heyner Javier Marmol</b>, a full stack and android developer passionate about technology and programming, always looking for new challenges and improving my skills.',
    'about_me_title': 'About me',
    'about_me_desc_1': 'I\'m a full stack software developer from Colombia 🇨🇴.',
    'about_me_desc_2': 'As a freelancer, I have specialized in Android and web application development.',
    'about_me_stack': 'Some of the tech stacks I work with include:',
    'backend': 'Backend',
    'frontend': 'Frontend',
    'android': 'Android',
    'contacts_title': 'Let\'s work together',
    'socials': 'Socials',
    'timezone_title': 'Time zone',
    'now_title': 'Now',
    'now_whats_that': 'what\'s that ?',
    'now_status': 'Currently working as freelancer',
    'footer_made_with': 'Made with lots of ♥️.',
  },
  es: {
    'welcome': 'Bienvenido',
    'intro': 'Hola, Soy <b class="font-bold">Heyner Javier Marmol</b>, full stack y android developer apasionado por la tecnología y la programación, siempre buscando nuevos retos y mejorar mis habilidades.',
    'about_me_title': 'Acerca de mi',
    'about_me_desc_1': 'Soy un full stack software developer de Colombia 🇨🇴.',
    'about_me_desc_2': 'Como freelance, me he especializado en desarrollo de aplicaciones Android y web.',
    'about_me_stack': 'Dentro de los stack que utilizo se encuentran las siguientes tecnologías:',
    'backend': 'Backend',
    'frontend': 'Frontend',
    'android': 'Android',
    'contacts_title': 'Trabajemos juntos',
    'socials': 'Redes Sociales',
    'timezone_title': 'Zona horaria',
    'now_title': 'Ahora',
    'now_whats_that': '¿qué es esto?',
    'now_status': 'Actualmente trabajando como freelancer',
    'footer_made_with': 'Hecho con mucho ♥️.',
  },
} as const;

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es' || lang === 'en') return lang as Locale;
  return defaultLang;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
