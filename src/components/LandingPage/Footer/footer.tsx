import {
  EarthIcon,
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  SendIcon,
} from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/educore_org',
    icon: <InstagramIcon />,
  },
  {
    name: 'Telegram',
    link: 'https://t.me/educore_org',
    icon: <SendIcon />,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/company/educore-org/',
    icon: <LinkedinIcon />,
  },
  {
    name: 'Website',
    link: 'https://www.educore-org.uz/',
    icon: <EarthIcon />,
  },
];

const description = '';

import Logo from '../../../images/logo/logo-light-1.svg';

import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

const Footer = () => {
  const [selectledLang] = useLang();
  return (
    <footer className="relative bg-[#191F33] z-50">
      <div className="px-4 py-12 flex flex-col items-center">
        {/* app logo */}
        <div>
          <a
            href="/"
            className="flex justify-center items-center gap-5 mb-8 text-white"
          >
            <img src={Logo} className="w-50" alt="Logo" />
          </a>
          <p className="text-white max-w-xl text-center font-medium text-lg">
            {description}
          </p>
        </div>

        {/* social links */}
        <div className="mt-8 mx-auto justify-center block">
          <span className="text-[#767E94] block text-center mb-6 font-medium text-lg">
            {content[selectledLang as string].footer.follow}
          </span>
          <ul className="flex gap-6 items-center mx-auto justify-center block">
            {socialLinks.map(({ name, icon, link }) => (
              <li key={name}>
                <a
                  href={link}
                  title={name}
                  className="text-white hover:text-[#767e94]"
                  target="_blank"
                >
                  {icon}
                </a>
                <span className="sr-only">{name} account</span>
              </li>
            ))}
          </ul>
        </div>

        {/* email */}
        <div className="text-white mt-6 mb-2 flex gap-2 items-center flex-col">
          <span className="text-lg font-medium hover:opacity-50 hover:cursor-pointer">
            educoreorg@gmail.com
          </span>
          {/* <span className="text-lg font-medium">+998 (99) 000-00-00</span> */}
        </div>
      </div>

      <div className="bg-[#2E3447]">
        <div className="text-center px-3 py-3">
          <span className="text-[#767E94]">
            © 2024 Educore™️. {content[selectledLang as string].footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
