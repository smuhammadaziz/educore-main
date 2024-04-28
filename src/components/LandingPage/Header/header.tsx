import { useState } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import Logo from '../../../images/logo/logo no back.svg';

import { NavLink } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  //   const handleLanguageChange = (language) => {
  //     setSelectedLanguage(language);
  //     // Here you can implement logic to change the language in your application
  //   };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Educore</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
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
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-black"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-black"
          >
            Courses
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-black"
          >
            Company
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <select
            className="border rounded px-2 py-1 outline-none border-none me-6"
            value={selectedLanguage}
            //   onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Uzbek</option>
            <option value="French">Russian</option>
          </select>
          <NavLink
            to="/auth/signin"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Sign in
          </NavLink>
          <NavLink
            to="/auth/signup"
            className="ms-3 text-sm font-semibold leading-6 text-gray-900 primary bg-primary text-white px-5 py-2 rounded-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          >
            Register now
          </NavLink>
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
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
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-black"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-black"
                >
                  Courses
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-black"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <select
                  className="border rounded px-2 py-1 outline-none border-none"
                  value={selectedLanguage}
                  //   onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Uzbek</option>
                  <option value="French">Russian</option>
                </select>
                <div className="mt-10">
                  <NavLink
                    to="/auth/signin"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/auth/signup"
                    className="ms-3 text-sm font-semibold leading-6 text-gray-900 primary bg-primary text-white px-5 py-2 rounded-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                  >
                    Register now
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
