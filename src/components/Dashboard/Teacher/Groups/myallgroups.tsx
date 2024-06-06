import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

function GetMyAllGroupsTeacher() {
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

        //    console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <DefaultLayoutTeacher>
      <div className="text-3xl text-center font-bold dark:text-white">
        My all Groups List
      </div>
      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {courses && courses ? (
              courses.map((product) => (
                <NavLink
                  key={product.group_id}
                  to={`/dashboard/teacher/my/all/groups/${product.group_id}`}
                  className="group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl hover:shadow-2xl rounded"
                >
                  <h3 className="mt-4 font-bold text-xl text-gray-700 dark:text-white">
                    {product.g_name}
                  </h3>

                  <hr className="my-5" />

                  <p className="mt-1 text-md font-medium text-gray-900 text-left mt-5 dark:text-white">
                    Lesson time: {product.subj_start} - {product.subj_end}
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 text-left mt-5 dark:text-white">
                    Created time: {moment(product.created_at).format('LLL')}
                  </p>
                </NavLink>
              ))
            ) : (
              <p>you don't have any courses</p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetMyAllGroupsTeacher;
