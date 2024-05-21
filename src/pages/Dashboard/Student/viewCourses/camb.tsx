import React from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';

import ViewAllCourseCambStudent from '../../../../components/Dashboard/Student/viewCourse/camb';

function ViewAllCoursesListCambStudent() {
  return (
    <DefaultLayoutStudent>
      <div>
        <ViewAllCourseCambStudent />
      </div>
    </DefaultLayoutStudent>
  );
}

export default ViewAllCoursesListCambStudent;
