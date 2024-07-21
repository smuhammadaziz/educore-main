import React from 'react';
import { NavLink } from 'react-router-dom';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';

import { FaQuestion } from 'react-icons/fa';

const subjects = [
  { name: 'Business', path: '/dashboard/student/quiz/business', count: '10' },
  { name: 'Biology', path: '/dashboard/quiz/biology', count: '10' },
  { name: 'Chemistry', path: '/quiz/chemistry', count: '10' },
  { name: 'Math', path: '/quiz/math', count: '10' },
  { name: 'Science', path: '/quiz/science', count: '10' },
  { name: 'English', path: '/quiz/english', count: '10' },
  { name: 'SAT', path: '/quiz/sat', count: '10' },
  { name: 'A-level', path: '/quiz/a-level', count: '10' },
  { name: 'History', path: '/quiz/history', count: '10' },
];

const QuizForStudents: React.FC = () => {
  return (
    <DefaultLayoutStudent>
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">
          Select one subject and take your test
        </h2>
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <NavLink
              key={index}
              to={subject.path}
              className="flex hover:bg-slate-200 justify-between items-center rounded-xl p-4 bg-white border-2 border-slate-200 rounded shadow-sm"
              //     activeClassName="bg-green-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
                  <FaQuestion />
                </div>
                <span className="text-xl font-medium">{subject.name}</span>
              </div>
              <div className="text-md font-medium text-gray-500">
                {subject.count} questions
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </DefaultLayoutStudent>
  );
};

export default QuizForStudents;
