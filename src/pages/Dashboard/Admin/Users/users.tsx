import { AllUsersTable } from '../../../../components/Dashboard/Admin/AllUsers/users';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllUsers() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllUsersTable />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllUsers;
