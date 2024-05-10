import AllPaymentsListAdmin from '../../../../components/Dashboard/Admin/Payments/payments';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllPaymentPageAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllPaymentsListAdmin />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllPaymentPageAdmin;
