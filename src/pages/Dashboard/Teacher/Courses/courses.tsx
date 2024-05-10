import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import AllCoursesListTeacher from '../../../../components/Dashboard/Teacher/Courses/courses';

import React from 'react';

function AllCoursePageTeacher() {
  return (
    <DefaultLayoutTeacher>
      <div>
        <AllCoursesListTeacher />
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AllCoursePageTeacher;
