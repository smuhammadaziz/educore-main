import AllCoursesList from '../../../../components/Dashboard/Admin/courses/courses';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllCoursesPageAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllCoursesList />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllCoursesPageAdmin;
