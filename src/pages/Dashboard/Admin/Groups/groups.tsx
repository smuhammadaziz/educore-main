import AllGroupsListAdmin from '../../../../components/Dashboard/Admin/Groups/groups';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllGroupsPageAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllGroupsListAdmin />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllGroupsPageAdmin;
