import React from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import GetAllCompaniesAdmin from '../../../../components/Dashboard/Admin/Companies/companies';

function AllCompanyPageAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <GetAllCompaniesAdmin />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllCompanyPageAdmin;
