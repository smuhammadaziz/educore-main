import React from 'react';

import DefaultLayoutTeacher from '../../../layout/DefaultTeacher';

const Teacher: React.FC = () => {
  return (
    <DefaultLayoutTeacher>
      <h2 className="text-3xl text-center mb-5 font-medium">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Teacher</span>
      </h2>
    </DefaultLayoutTeacher>
  );
};

export default Teacher;
