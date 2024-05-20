import React from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import ViewAllCourseSATStudent from '../../../../components/Dashboard/Student/viewCourse/sat';

function ViewAllCoursesListSatStudent() {
  return (
    <DefaultLayoutStudent>
      <div>
        <ViewAllCourseSATStudent />
      </div>
    </DefaultLayoutStudent>
  );
}

export default ViewAllCoursesListSatStudent;
