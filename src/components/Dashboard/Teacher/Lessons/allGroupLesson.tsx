import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

function GetGroupsForLessonTeacher() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/groups`, {
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
  }, [token]);

  return (
    <DefaultLayoutTeacher>
      <div className="text-2xl text-center font-bold dark:text-white mb-10">
        Select one group to see your lessons
      </div>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {courses.length > 0 ? (
              courses.map((product: any) => (
                <NavLink
                  key={product.group_id}
                  to={`/dashboard/teacher/my/all/lessons/${product.group_id}`}
                  className="group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl hover:shadow-2xl rounded-xl"
                >
                  <h3 className="mt-4 font-bold text-xl text-gray-700 dark:text-white">
                    {product.g_name}
                  </h3>
                  <hr className="my-5 border-slate-400" />
                  <p className="text-md font-medium text-gray-900 dark:text-white">
                    Lesson time: {product.subj_start} - {product.subj_end}
                  </p>
                  <p className="text-md font-medium text-gray-900 dark:text-white">
                    Created: {moment(product.created_at).format('LLL')}
                  </p>
                </NavLink>
              ))
            ) : (
              <div className="flex justify-center items-center w-full col-span-full">
                <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
                  <p className="text-xl font-medium text-gray-700 dark:text-white">
                    You have no groups
                  </p>
                  <p className="text-xl font-medium text-gray-700 dark:text-white mt-3">
                    If you want to add first your group,{' '}
                    <NavLink
                      to="/dashboard/teacher/my/groups"
                      className="text-primary"
                    >
                      click here
                    </NavLink>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetGroupsForLessonTeacher;
