import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

import React from 'react';
import AllGroupsListTeacher from '../../../../components/Dashboard/Teacher/Groups/groups';

function AllGroupsPageTeacher() {
  return (
    <DefaultLayoutTeacher>
      <div>
        <AllGroupsListTeacher />
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AllGroupsPageTeacher;
