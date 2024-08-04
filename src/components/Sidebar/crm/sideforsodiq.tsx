import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from '../../../images/logo/logo-light-1.svg';

import backurl from '../../../links';

import { BsCashCoin } from 'react-icons/bs';
import { GoHomeFill } from 'react-icons/go';
import { MdLibraryBooks } from 'react-icons/md';
import { RiGroupFill } from 'react-icons/ri';
import { GiWhiteBook } from 'react-icons/gi';
import { GiOpenBook } from 'react-icons/gi';
import { PiPhoneOutgoingFill } from 'react-icons/pi';

import artboard from '../../../images/sodiq/Artboard 14.png';

import { FaUsers } from 'react-icons/fa6';
import { PiStudentFill } from 'react-icons/pi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { HiMiniBellAlert } from 'react-icons/hi2';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SidebarSodiqAcademy = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const [profileData, setProfileData] = useState(null);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          localStorage.removeItem('TOKEN');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const userId = data.Profil.user_id;

        // console.log(data);

        setProfileData(userId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col shadow overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/partners/sodiq-academy">
          <h2 className="text-center serif text-black font-bold mx-auto text-2xl hover:text-slate-500">
            Sodiq Academy
          </h2>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard/home/sodiq-academy"
                  className={`group relative flex items-center gap-4 rounded-sm py-3 px-4 text-lg font-medium text-black duration-300 ease-in-out hover:bg-indigo-500 hover:text-white rounded-xl ${
                    pathname.includes('/dashboard/home/sodiq-academy') &&
                    'bg-indigo-800 text-white rounded-xl dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <GoHomeFill size={20} />
                  </span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/sodiq-academy/teachers"
                  className={`group relative flex items-center gap-4 rounded-xl py-3 px-4 text-lg font-medium text-black duration-300 ease-in-out hover:bg-indigo-500 hover:text-white ${
                    pathname.includes('/dashboard/sodiq-academy/teachers') &&
                    'bg-indigo-800 text-white rounded-xl dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <FaUsers size={20} />
                  </span>
                  Teachers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/sodiq-academy/students"
                  className={`group relative flex items-center gap-4 rounded-xl py-3 px-4 text-lg font-medium text-black duration-300 ease-in-out hover:bg-indigo-500 hover:text-white ${
                    pathname.includes('/dashboard/sodiq-academy/students') &&
                    'bg-indigo-800 text-white rounded-xl dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <PiStudentFill size={20} />
                  </span>
                  Students
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/sodiq-academy/courses"
                  className={`group relative flex items-center gap-4 rounded-xl py-3 px-4 text-lg font-medium text-black duration-300 ease-in-out hover:bg-indigo-500 hover:text-white ${
                    pathname.includes('/dashboard/sodiq-academy/courses') &&
                    'bg-indigo-800 text-white rounded-xl dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <HiOutlineClipboardDocumentList size={20} />
                  </span>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/sodiq-academy/notifications"
                  className={`group  relative flex items-center gap-4 rounded-xl py-3 px-4 text-lg font-medium text-black duration-300 ease-in-out hover:bg-indigo-500 hover:text-white ${
                    pathname.includes(
                      '/dashboard/sodiq-academy/notifications',
                    ) && 'bg-indigo-800 text-white rounded-xl dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <HiMiniBellAlert size={20} />
                  </span>
                  Notifications
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarSodiqAcademy;
