import React from 'react';

import DefaultLayout from '../../../layout/DefaultLayout';
import DefaultLayoutAdmin from '../../../layout/DefaultAdmin';

const Admin: React.FC = () => {
  return (
    <DefaultLayoutAdmin>
      <h2 className="text-3xl text-center mb-5 font-medium">
        Welcome to Educore Dashboard for Admins
      </h2>
    </DefaultLayoutAdmin>
  );
};

export default Admin;
