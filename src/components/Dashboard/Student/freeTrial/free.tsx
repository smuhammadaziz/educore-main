import React from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { useParams } from 'react-router-dom';

function UseFreeTrialPageStudent() {
  const { course_id } = useParams();
  return (
    <DefaultLayoutStudent>
      <div>free {course_id}</div>
    </DefaultLayoutStudent>
  );
}

export default UseFreeTrialPageStudent;
