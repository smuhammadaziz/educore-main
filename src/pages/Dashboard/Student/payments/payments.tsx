import React from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import ViewAllTypesCouseStudent from '../../../../components/Dashboard/Student/viewCourse/view';

import AllPaymentsViewStudent from '../../../../components/Dashboard/Student/payments/payments';

function ViewAllPaymentsStudent() {
  return (
    <DefaultLayoutStudent>
      <div>
        <AllPaymentsViewStudent />
      </div>
    </DefaultLayoutStudent>
  );
}

export default ViewAllPaymentsStudent;
