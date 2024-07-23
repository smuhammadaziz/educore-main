import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';

function AllQuizAdmin() {
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/admin/get/quizs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.Data.reverse();

        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayoutAdmin>
      <div className="p-6">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
          Quiz List
        </h2>
        <h2 className="text-3xl font-medium mb-6 text-center text-gray-800 dark:text-white">
          Number of quiz solved: {courses.length} times
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-slate-800 shadow-md rounded-lg dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="py-6 px-6 text-left text-gray-600 dark:text-gray-300 font-semibold">
                  Quiz No.
                </th>
                <th className="py-6 px-6 text-left text-gray-600 dark:text-gray-300 font-semibold">
                  Student Name
                </th>
                <th className="py-6 px-6 text-left text-gray-600 dark:text-gray-300 font-semibold">
                  Student Email
                </th>
                <th className="py-6 px-6 text-left text-gray-600 dark:text-gray-300 font-semibold">
                  Quiz Subject
                </th>
                <th className="py-6 px-6 text-left text-gray-600 dark:text-gray-300 font-semibold">
                  Correct Answers
                </th>
                <th className="py-6 px-6 text-left text-gray-600 dark:text-gray-300 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((quiz: any, index: any) => (
                  <tr
                    key={quiz.quiz_id}
                    className="border-b font-medium border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-6 font-medium px-6 text-gray-700 dark:text-gray-200">
                      {index + 1}/{courses.length}
                    </td>
                    <td className="py-6 font-medium px-6 text-gray-700 dark:text-gray-200">
                      {quiz.name} {quiz.l_name}
                    </td>
                    <td className="py-6 font-medium px-6 text-gray-700 dark:text-gray-200">
                      {quiz.email}
                    </td>
                    <td className="py-6 font-medium px-6 text-gray-700 dark:text-gray-200">
                      {quiz.subject}
                    </td>
                    <td className="py-6 font-medium px-6 text-gray-700 dark:text-gray-200">
                      {quiz.correct}/
                      {Number(quiz.correct) + Number(quiz.incorrect)}
                    </td>
                    <td className="py-6 px-6">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                          quiz.finish
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {quiz.finish ? 'Finished' : 'Not Finished'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"
                  >
                    You don't have any new students yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllQuizAdmin;
