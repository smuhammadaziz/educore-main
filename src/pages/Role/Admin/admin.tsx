import React from 'react';

import DefaultLayout from '../../../layout/DefaultLayout';
import DefaultLayoutAdmin from '../../../layout/DefaultAdmin';
import { NavLink } from 'react-router-dom';

const Admin: React.FC = () => {
  return (
    <DefaultLayoutAdmin>
      <h2 className="text-3xl text-center mb-5 font-medium dark:text-white">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Admin</span>
      </h2>
      <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 dark:text-white">
        <NavLink
          to="/dashboard/teachers"
          className="dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          See all teachers →
        </NavLink>
        <NavLink
          to="/dashboard/students"
          className="dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          See all students →
        </NavLink>
        <NavLink
          to="/dashboard/contact"
          className="dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          See all contacts →
        </NavLink>
        <NavLink
          to="/dashboard/payments"
          className="dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          See all payments →
        </NavLink>
        <NavLink
          to="/dashboard/blogs"
          className="dark:bg-black dark:border-stone-500 dark:border-2 bg-white py-5 sm:py-10 text-lg sm:text-2xl px-5 sm:px-15 hover:underline shadow-2xl rounded-md m-2.5"
        >
          See all blogs →
        </NavLink>
      </div>
    </DefaultLayoutAdmin>
  );
};

export default Admin;
