import React from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import ViewAllTypesCouseStudent from '../../../../components/Dashboard/Student/viewCourse/view';

function ViewAllCourseStudent() {
  return (
    <DefaultLayoutStudent>
      <div>
        <ViewAllTypesCouseStudent />
      </div>
    </DefaultLayoutStudent>
  );
}

export default ViewAllCourseStudent;
