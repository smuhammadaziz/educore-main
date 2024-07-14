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
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data.Getmygroups || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <DefaultLayoutStudent>
      <h2 className="text-3xl font-bold mx-auto text-center">My Groups</h2>
      <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {data.map((product: any) => (
              <div
                key={product.group_id}
                className="group bg-white p-8 py-10 px-8 dark:bg-slate-700 dark:text-white rounded-xl shadow-xl hover:shadow-2xl"
              >
                <h2 className="text-center text-2xl font-bold">
                  About your group
                </h2>
                <hr className="mt-5" />
                <h3 className="mt-4 text-lg text-gray-700 dark:text-white">
                  <span className="font-bold me-1">Group name:</span>{' '}
                  {product.g_name}
                </h3>
                <p className="mt-3 text-lg text-gray-900 dark:text-white">
                  <span className="font-bold me-1">Which days:</span>{' '}
                  {product.l_days}
                </p>
                <p className="mt-3 text-lg text-gray-500 dark:text-white text-left">
                  <span className="font-bold me-1">Lesson time:</span>{' '}
                  {product.subj_start} - {product.subj_end}
                </p>
                <p className="mt-3 text-lg text-gray-900 dark:text-white">
                  <span className="font-bold me-1">
                    Maximum students limit:
                  </span>{' '}
                  {product.user_count}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-xl text-gray-700 dark:text-white">
              You don't have any groups
            </p>
          </div>
        )}
      </div>
    </DefaultLayoutStudent>
  );
}

export default GetMyGroupStudent;
