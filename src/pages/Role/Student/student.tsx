import React from 'react';
import DefaultLayoutStudent from '../../../layout/DefaultStudent';
import { NavLink } from 'react-router-dom';

import GuideComponentForStudent from '../../../components/Dashboard/Reminder/forstudent';

const Student: React.FC = () => {
  return (
    <DefaultLayoutStudent>
      <h2 className="text-3xl text-center mb-5 font-medium dark:text-white">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Student</span>
      </h2>

      <div>
        <GuideComponentForStudent />
      </div>
      <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 dark:text-white">
        <NavLink
          to="/dashboard/student/courses"
          className="st1 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          See all courses →
        </NavLink>
        <NavLink
          to="/dashboard/student/groups"
          className="st2 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My group list →
        </NavLink>
        <NavLink
          to="/dashboard/student/lessons"
          className="st3 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My lessons →
        </NavLink>
        <NavLink
          to="/dashboard/student/homeworks"
          className="st4 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My homeworks →
        </NavLink>
        <NavLink
          to="/dashboard/student/payments"
          className="st5 dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My payments →
        </NavLink>
      </div>
    </DefaultLayoutStudent>
  );
};

export default Student;
