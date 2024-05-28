import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';

function UseFreeTrialPageStudent() {
  const { course_id } = useParams();
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [data, setData] = useState([]);

  const token = localStorage.getItem('TOKEN');

  //   console.log(course_id);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}api/get/group/by/course/${course_id}`,
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
        const allCourse = data.getidbycourse;

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
      <div className="">
        <h2 className="text-2xl text-black font-bold">
          Select one group, which you want to use your FREE TRIAL SESSION.
        </h2>
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {data && data
              ? data.map((product: any) => (
                  <NavLink
                    key={product.group_id}
                    to={`/dashboard/student/courses/buy/${course_id}/${product.group_id}`}
                    className="group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-lg text-black"
                  >
                    <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                      Group name: {product.g_name}
                    </h3>
                    <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                      which days: {product.l_days}
                    </p>
                    <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                      Teacher: {product.name} {product.l_name}
                    </p>
                    <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                      Price: {product.price} UZS
                    </p>
                    <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                      Course period: {product.period} months
                    </p>
                    <p className="mt-1 text-md font-bold text-gray-500 dark:text-white text-right">
                      Lesson time: {product.subj_start}:00-{product.subj_end}:00
                    </p>
                    <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                      Main Subject: {product.subject}
                    </p>
                    <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                      Subject: {product.main_sub}
                    </p>
                    <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                      Maximum Students Limit: {product.user_count}
                    </p>

                    <NavLink
                      to={`/dashboard/student/courses/use/free-trial/${course_id}/${product.group_id}`}
                      className="inline-block mt-5 bg-green-700 rounded px-5 py-1 text-white text-right"
                    >
                      Use Free Trial
                    </NavLink>
                  </NavLink>
                ))
              : 'dont have any groups'}
          </div>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
}

export default UseFreeTrialPageStudent;
