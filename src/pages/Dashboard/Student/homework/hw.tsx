import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

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
          throw new Error('Network se was not ok');
        }
        const data = await response.json();
        //    console.log(data);

        const allCourse = data.Homeworks;

        //    console.log(allCourse);

        setData(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <DefaultLayoutStudent>
      <h2 className="text-2xl font-bold">My Groups List</h2>
      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {data && data ? (
              data.map((product) => (
                <div
                  key={product.homework_id}
                  className="group bg-white p-5 dark:bg-slate-700 dark:text-white"
                >
                  <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                    {product.h_desc}
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                    Created time: {moment(product.created_at).format('LT')},{' '}
                    {''}
                    {moment(product.created_at).format('l')}
                  </p>
                </div>
              ))
            ) : (
              <p>you don't have any courses</p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
}

export default GetMyAllHomeworksStudent;
