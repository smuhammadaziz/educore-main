import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';
import moment from 'moment';

function GetAllLessonsStudent() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}api/student/get/lessons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses((data.Lessons || []).reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayoutStudent>
      <div>
        <h2 className="text-3xl font-bold mx-auto text-center">All Lessons</h2>
      </div>
      <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {courses.map((product: any) => (
              <div
                key={product.lesson_id}
                className="group bg-white p-5 dark:bg-slate-700 dark:text-white rounded-xl shadow-xl hover:shadow-2xl"
              >
                <h3 className="mt-4 text-2xl text-gray-700 dark:text-white">
                  {product.title}
                </h3>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {product.l_desc}
                </p>
                <p className="mt-5 text-md font-medium text-gray-900 dark:text-white text-left">
                  <span className="font-bold">Lesson Status:</span>
                  <span
                    className={`ms-2 mt-1 py-1 px-2 rounded-full w-25 text-md font-bold text-white dark:text-white text-center ${
                      product.procces_lesson === 'active'
                        ? 'bg-green-500'
                        : product.procces_lesson === 'pending'
                        ? 'bg-yellow-500'
                        : product.procces_lesson === 'inactive'
                        ? 'bg-red-500'
                        : ''
                    }`}
                  >
                    {product.procces_lesson}
                  </span>
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 text-left mt-5 dark:text-white">
                  <span className="font-bold">Created time:</span>{' '}
                  {moment(product.created_at).format('LT')},{' '}
                  {moment(product.created_at).format('l')}
                </p>
                <hr className="mt-5" />
                <p className=" text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                  <a
                    href={product.l_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 rounded-full inline-block text-white px-8 py-2 hover:underline hover:bg-blue-500"
                  >
                    join the lesson →
                  </a>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-xl text-gray-700 dark:text-white">
              You don't have any lessons
            </p>
          </div>
        )}
      </div>
    </DefaultLayoutStudent>
  );
}

export default GetAllLessonsStudent;
