import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

import AllPaymentsListTeacher from '../../../../components/Dashboard/Teacher/Payments/payments';

function AllPaymentPageTeacher() {
  return (
    <DefaultLayoutTeacher>
      <div>
        <AllPaymentsListTeacher />
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AllPaymentPageTeacher;
