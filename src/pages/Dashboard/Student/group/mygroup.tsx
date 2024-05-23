import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';

function GetMyGroupStudent() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem('TOKEN');
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/student/get/my/group`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network se was not ok');
        }
        const data = await response.json();
        //    console.log(data);

        const allCourse = data.Getmygroups;

        console.log(allCourse);

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
      <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {data && data
            ? data.map((product: any) => (
                <div
                  key={product.group_id}
                  className="group bg-white p-8 py-10 px-8 dark:bg-slate-700 dark:text-white "
                >
                  <h2 className="text-center text-2xl">About this group</h2>
                  <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                    Group name: {product.g_name}
                  </h3>
                  <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                    which days: {product.l_days}
                  </p>
                  <p className="mt-1 text-md font-bold text-gray-500 dark:text-white text-right">
                    Lesson time: {product.subj_start}:00-{product.subj_end}:00
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                    Maximum Students Limit: {product.user_count}
                  </p>
                </div>
              ))
            : 'dont have any groups'}
        </div>
      </div>
    </DefaultLayoutStudent>
  );
}

export default GetMyGroupStudent;