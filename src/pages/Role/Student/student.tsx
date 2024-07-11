import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../layout/DefaultStudent';
import { NavLink } from 'react-router-dom';

import GuideComponentForStudent from '../../../components/Dashboard/Reminder/forstudent';

import { MdLibraryBooks } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdPlayLesson } from 'react-icons/md';
import { FaHouseChimney } from 'react-icons/fa6';
import { BsCashCoin } from 'react-icons/bs';

import illustration from '../../../images/cover/23186836_6722446.svg';
import backurl from '../../../links';

const Student: React.FC = () => {
  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${backurl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          localStorage.removeItem('TOKEN');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const user = data.Profil.name;

        setProfileData(user);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [token]);

  return (
    <DefaultLayoutStudent>
      <h2 className="text-3xl text-center mb-5 font-medium dark:text-white">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Student</span>
      </h2>

      <div>
        <GuideComponentForStudent />
      </div>
      <div className="flex flex-col md:flex-row bg-fuchsia-200 py-15 px-10 md:py-15 md:px-20 justify-center md:justify-start relative mx-auto rounded-3xl mt-10 md:mt-20 mb-10 md:mb-20">
        <div className="text-black text-center md:text-left">
          <h2 className="text-black text-2xl md:text-4xl font-bold tracking-wider">
            Welcome back{' '}
            <span className="font-semibold uppercase">{profileData}</span>
          </h2>
          <h2 className="text-fuchsia-800 text-3xl md:text-5xl mt-5 md:mt-10 font-semibold">
            Marathon: Soon
          </h2>
          <p className="text-xl md:text-2xl mb-5 md:mb-10 mt-1 md:mt-2">
            To see marathon lessons click here:{' '}
          </p>
          <NavLink
            to="/dashboard/student/marathon"
            className="bg-fuchsia-800 text-white py-2 md:py-3 px-6 md:px-10 text-xl md:text-2xl rounded-lg hover:bg-fuchsia-900"
          >
            View lessons
          </NavLink>
        </div>
        <div className="hidden md:block">
          <img
            src={illustration}
            alt="illustration image"
            width={400}
            className="absolute -top-15 right-25"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 dark:text-white">
        <NavLink
          to="/dashboard/student/courses"
          className="st1 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="mb-5 block">
            <MdLibraryBooks size={50} />
          </span>
          See all courses →
        </NavLink>
        <NavLink
          to="/dashboard/student/groups"
          className="st2 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="mb-5 block">
            <FaPeopleGroup size={50} />
          </span>
          My group →
        </NavLink>
        <NavLink
          to="/dashboard/student/lessons"
          className="st3 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="mb-5 block">
            <MdPlayLesson size={50} />
          </span>
          My lessons →
        </NavLink>
        <NavLink
          to="/dashboard/student/homeworks"
          className="st4 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="mb-5 block">
            <FaHouseChimney size={50} />
          </span>
          My homeworks →
        </NavLink>
        <NavLink
          to="/dashboard/student/payments"
          className="st5 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="mb-5 block">
            <BsCashCoin size={50} />
          </span>
          My payments →
        </NavLink>
      </div>
    </DefaultLayoutStudent>
  );
};

export default Student;
