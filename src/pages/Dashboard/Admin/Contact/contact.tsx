import AllContactFormAdmin from '../../../../components/Dashboard/Admin/Contact/contacts';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllContactPageAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllContactFormAdmin />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllContactPageAdmin;
