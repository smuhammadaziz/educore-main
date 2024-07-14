import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

function GetMyAllHomeworksStudent() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/student/get/homeworks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data.Homeworks || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <DefaultLayoutStudent>
      <h2 className="text-3xl font-bold mx-auto text-center">My Homeworks</h2>
      <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {data.map((product: any) => (
              <div
                key={product.homework_id}
                className="group bg-white p-5 dark:bg-slate-700 dark:text-white rounded-xl shadow-xl hover:shadow-2xl"
              >
                <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                  {product.title}
                </h3>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {product.h_desc}
                </p>
                <hr className="border-slate-500 mt-5" />
                <p className="mt-1 text-md font-medium text-gray-900 text-left mt-5 dark:text-white">
                  Created time: {moment(product.created_at).format('LT')},{' '}
                  {moment(product.created_at).format('l')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full col-span-full">
            <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
              <p className="text-xl font-medium text-gray-700 dark:text-white">
                You have no homeworks yet.
              </p>
              <p className="text-xl font-medium text-gray-700 dark:text-white mt-3">
                {' '}
                <NavLink
                  to="/dashboard/student/courses"
                  className="text-primary"
                >
                  Click here
                </NavLink>{' '}
                to get your first course.
              </p>
            </div>
          </div>
        )}
      </div>
    </DefaultLayoutStudent>
  );
}

export default GetMyAllHomeworksStudent;
