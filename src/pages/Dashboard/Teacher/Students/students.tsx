import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

import AllStudentListTeacher from '../../../../components/Dashboard/Teacher/Students/students';

function AllStudentPageTeacher() {
  return (
    <DefaultLayoutTeacher>
      <div>
        <AllStudentListTeacher />
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AllStudentPageTeacher;
