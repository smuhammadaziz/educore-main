import { AllTeachersList } from '../../../../components/Dashboard/Admin/Teachers/teachers';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllTeachersPage() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllTeachersList />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllTeachersPage;
