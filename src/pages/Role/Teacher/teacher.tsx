import React from 'react';

import DefaultLayoutTeacher from '../../../layout/DefaultTeacher';
import { NavLink } from 'react-router-dom';

const Teacher: React.FC = () => {
  return (
    <DefaultLayoutTeacher>
      <h2 className="text-3xl text-center mb-5 font-medium">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Teacher</span>
      </h2>
      <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        <NavLink
          to="/dashboard/teacher/my/courses"
          className="dark:bg-black bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          See all courses →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/groups"
          className="dark:bg-black bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          Adding new groups →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/all/groups"
          className="dark:bg-black bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My all groups →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/all/lessons"
          className="dark:bg-black bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My lessons →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/all/homeworks"
          className="dark:bg-black bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My homeworks →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/students"
          className="dark:bg-black bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          My all students →
        </NavLink>
      </div>
    </DefaultLayoutTeacher>
  );
};

export default Teacher;
