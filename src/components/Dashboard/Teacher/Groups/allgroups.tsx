import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

function AllGroupViewCourseStudent() {
  const { course_id } = useParams();

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/teacher/course/groups/${course_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
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
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          My <span className="underline">Groups</span> List
        </h2>
        <NavLink
          to={`/dashboard/teacher/add/new/groups/${course_id}`}
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Group
        </NavLink>
      </div>

      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {courses && courses ? (
              courses.map((product) => (
                <a
                  key={product.group_id}
                  href="#"
                  className="group bg-white p-5 dark:bg-slate-700 dark:text-white"
                >
                  <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                    {product.g_name}
                  </h3>
                  <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                    Lesson Days: {product.l_days}
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                    Maximum group size: {product.user_count} students
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                    Lesson time: {product.subj_start}:00 - {product.subj_end}:00
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                    {/* {product.created_at} */}
                    Created time: {moment(product.created_at).format('LLL')}
                  </p>
                </a>
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

export default AllGroupViewCourseStudent;
