import React from 'react';

import DefaultLayout from '../../../layout/DefaultLayout';
import DefaultLayoutAdmin from '../../../layout/DefaultAdmin';
import { NavLink } from 'react-router-dom';

const Admin: React.FC = () => {
  return (
    <DefaultLayoutAdmin>
      <h2 className="text-3xl text-center mb-5 font-medium">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Admin</span>
      </h2>
    </DefaultLayoutAdmin>
  );
};

export default Admin;
