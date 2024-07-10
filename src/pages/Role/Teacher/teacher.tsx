import React from 'react';

import DefaultLayoutTeacher from '../../../layout/DefaultTeacher';
import { NavLink } from 'react-router-dom';

import { MdSubject } from 'react-icons/md';
import { MdGroups2 } from 'react-icons/md';
import { MdPlayLesson } from 'react-icons/md';
import { MdMapsHomeWork } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';

import GuideComponent from '../../../components/Dashboard/Reminder/joyride';

const Teacher: React.FC = () => {
  return (
    <DefaultLayoutTeacher>
      <h2 className="text-3xl text-center mb-5 font-medium dark:text-white">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Teacher</span>
      </h2>
      <div className="justify-start">
        <GuideComponent />
      </div>
      <div className=" mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 dark:text-white pb-20">
        <NavLink
          to="/dashboard/teacher/my/courses"
          className="link1 flex items-center dark:bg-black dark:border-stone-500 dark:border-2  bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="me-3">
            <MdSubject size="30" />
          </span>
          See all courses →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/groups"
          className="link2 flex items-center dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="me-3">
            <MdGroups2 size="30" />
          </span>
          My groups →
        </NavLink>
        {/* <NavLink
          to="/dashboard/teacher/my/all/groups"
          className="flex items-center dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="me-3">
            <MdGroups2 size="30" />
          </span>
          My all groups →
        </NavLink> */}
        <NavLink
          to="/dashboard/teacher/my/all/lessons"
          className="link3 flex items-center dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="me-3">
            <MdPlayLesson size="30" />
          </span>
          My lessons →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/all/homeworks"
          className="link4 flex items-center dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="me-3">
            <MdMapsHomeWork size="30" />
          </span>
          My homeworks →
        </NavLink>
        <NavLink
          to="/dashboard/teacher/my/students"
          className="link5 flex items-center dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          <span className="me-3">
            <PiStudentFill size="30" />
          </span>
          My all students →
        </NavLink>
      </div>
    </DefaultLayoutTeacher>
  );
};

export default Teacher;
