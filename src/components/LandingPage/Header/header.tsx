import { useEffect, useState } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

import Logo from '../../../images/logo/logo-1.svg';
import LogoIcon from '../../../images/logo/logo-icon-1.svg';

import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';
import backurl from '../../../links';

import { jwtDecode } from 'jwt-decode';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useLang();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      const decodedToken: { role: string } = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  const getDashboardLink = () => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'student':
        return '/dashboard/student';
      case 'teacher':
        return '/dashboard/teacher';
      case 'comp_admin':
        return '/dashboard/sodiq-academy';
      default:
        return '/';
    }
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img className="h-17 w-auto" src={Logo} alt="site logo" />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/about/us"
            className="text-md font-semibold leading-6 text-gray-900 hover:text-black hover:underline"
          >
            {content[selectedLanguage as string].header.about}
          </NavLink>
          <NavLink
            to="/all/courses"
            className="text-md font-semibold leading-6 text-gray-900 hover:text-black hover:underline"
          >
            {content[selectedLanguage as string].header.courses}
          </NavLink>
          <NavLink
            to="/partners"
            className="text-md font-semibold leading-6 text-gray-900 hover:text-black hover:underline"
          >
            {content[selectedLanguage as string].header.partner}
          </NavLink>
          <NavLink
            to="/all/blogs"
            className="text-md font-semibold leading-6 text-gray-900 hover:text-black hover:underline"
          >
            {content[selectedLanguage as string].header.blogs}
          </NavLink>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <select
            className="border rounded px-2 py-1 outline-none border-none me-6"
            value={selectedLanguage as string}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
            }}
          >
            <option value="en">
              {content[selectedLanguage as string].header.english}
            </option>
            <option value="uz">
              {content[selectedLanguage as string].header.uzbek}
            </option>
            <option value="ru">
              {content[selectedLanguage as string].header.russian}
            </option>
          </select>
          {role ? (
            <a
              href={getDashboardLink()}
              className="text-md border-2 py-2 px-5 border-fuchsia-900 text-fuchsia-950 rounded-xl font-semibold leading-6 text-gray-900 hover:bg-fuchsia-900 hover:text-white transition duration-300"
            >
              {content[selectedLanguage as string].header.go}
            </a>
          ) : (
            <>
              <NavLink
                to="/auth/signin"
                className="text-md font-semibold leading-6 text-gray-900 hover:underline"
              >
                {content[selectedLanguage as string].header.login}
              </NavLink>
              <NavLink
                to="/auth/signup"
                className="ms-3 text-sm font-semibold leading-6 text-gray-900 primary bg-fuchsia-800 text-white px-5 py-2 rounded-full hover:bg-fuchsia-950 active:bg-fuchsia-500 focus:outline-none focus:ring focus:ring-violet-300"
              >
                {content[selectedLanguage as string].header.register}
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-ms-7">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto"
                src={LogoIcon}
                alt="Educore logo icon"
              />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink
                  to="/about/us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-black"
                >
                  {content[selectedLanguage as string].header.about}
                </NavLink>
                <NavLink
                  to="/all/courses"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-black"
                >
                  {content[selectedLanguage as string].header.courses}
                </NavLink>
                <NavLink
                  to="/partners"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-black"
                >
                  {content[selectedLanguage as string].header.partner}
                </NavLink>
                <NavLink
                  to="/all/blogs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-black"
                >
                  {content[selectedLanguage as string].header.blogs}
                </NavLink>
              </div>
              <div className="py-6">
                <select
                  className="border rounded px-2 py-1 outline-none border-none"
                  value={selectedLanguage as string}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedLanguage(e.target.value)
                  }
                >
                  <option value="en">
                    {content[selectedLanguage as string].header.english}
                  </option>
                  <option value="uz">
                    {content[selectedLanguage as string].header.uzbek}
                  </option>
                  <option value="ru">
                    {content[selectedLanguage as string].header.russian}
                  </option>
                </select>
                <div className="mt-10">
                  {role ? (
                    <a
                      href={getDashboardLink()}
                      className="text-md border-2 py-2 px-5 border-fuchsia-900 text-fuchsia-950 rounded-xl font-semibold leading-6 text-gray-900 hover:bg-fuchsia-900 hover:text-white transition duration-300"
                    >
                      {content[selectedLanguage as string].header.go}
                    </a>
                  ) : (
                    <>
                      <NavLink
                        to="/auth/signin"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        {content[selectedLanguage as string].header.login}
                      </NavLink>
                      <NavLink
                        to="/auth/signup"
                        className="ms-3 text-sm font-semibold leading-6 text-gray-900 primary bg-fuchsia-800 text-white px-5 py-2 rounded-full hover:bg-fuchsia-950 active:bg-fuchsia-500 focus:outline-none focus:ring focus:ring-violet-300"
                      >
                        {content[selectedLanguage as string].header.register}
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
