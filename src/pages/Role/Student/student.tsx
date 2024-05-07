import React from 'react';

import DefaultLayoutStudent from '../../../layout/DefaultStudent';

const Student: React.FC = () => {
  return (
    <DefaultLayoutStudent>
      <h2 className="text-3xl text-center mb-5 font-medium">
        Welcome to Educore Dashboard for{' '}
        <span className="underline font-bold">Student</span>
      </h2>
    </DefaultLayoutStudent>
  );
};

export default Student;
