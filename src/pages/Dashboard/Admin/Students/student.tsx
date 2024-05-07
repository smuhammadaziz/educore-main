import { AllStudentsList } from '../../../../components/Dashboard/Admin/student/student';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllStudentPage() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllStudentsList />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllStudentPage;
