import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from '../../images/logo/logo-light-1.svg';

import backurl from '../../links';

import { PiStudentFill } from 'react-icons/pi';
import { MdPlayLesson } from 'react-icons/md';
import { TbHomeSearch } from 'react-icons/tb';
import { FaLayerGroup } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { MdVideoLibrary } from 'react-icons/md';
import { BiMessageRoundedDetail } from 'react-icons/bi';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
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
  const [teacher, setTeacher] = useState('');

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
        const teacherName = data.Profil.name;

        // console.log(userId);
        setTeacher(teacherName);
        setProfileData(userId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [inboxData, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/notefs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // console.log(data);

        setCourses(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filtered = inboxData.filter((el: any) => el.status == 'unchecked');

  // console.log();

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-purple-900 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" width="180" />
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
            <h1 className="mb-4 ml-4 text-lg font-semibold text-white">
              Welcome {teacher}
            </h1>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard/teacher"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-purple-500 dark:bg-meta-4'
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
                  to="/dashboard/teacher/my/courses"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard/teacher/my/courses') &&
                    'bg-purple-500 dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <FaBookmark size={20} />
                  </span>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/teacher/my/groups"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard/teacher/my/groups') &&
                    'bg-purple-500 dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <FaLayerGroup size={20} />
                  </span>
                  Groups
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/teacher/my/all/lessons"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard/teacher/my/all/lessons') &&
                    'bg-purple-500 dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <MdPlayLesson size={20} />
                  </span>
                  Lessons
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/teacher/my/all/homeworks"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard/teacher/my/all/homeworks') &&
                    'bg-purple-500 dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <TbHomeSearch size={20} />
                  </span>
                  Homeworks
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/teacher/my/students"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard/teacher/my/students') &&
                    'bg-purple-500 dark:bg-meta-4'
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
                  to="/dashboard/teacher/marathon"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard/teacher/marathon') &&
                    'bg-purple-500 dark:bg-meta-4'
                  }`}
                >
                  <span>
                    <MdVideoLibrary size={20} />
                  </span>
                  Marathon
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/teacher/inbox"
                  className={`group relative flex items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-purple-600 dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard/teacher/inbox') &&
                    'bg-purple-500 dark:bg-meta-4'
                  }`}
                >
                  <span className="flex flex-row items-center">
                    <span className="me-2.5">
                      <BiMessageRoundedDetail size={20} />
                    </span>
                    Inbox
                  </span>
                  <span className="font-bold text-xs rounded-full py-1 px-1.5 bg-white text-black">
                    +{filtered.length}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
