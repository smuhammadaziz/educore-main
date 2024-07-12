import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';

export default function GetAllGroupsFromCourseStudent() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('TOKEN');
  const { course_id } = useParams();

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

        console.log(data);

        setData(data.getidbycourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [course_id, token]);

  return (
    <DefaultLayoutStudent>
      <div className="py-10 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
          Select a Group to Buy
        </h2>
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {data && data.length > 0 ? (
              data.map((product: any) => (
                <div
                  key={product.group_id}
                  className="group dark:bg-strokedark dark:text-white bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <NavLink
                    to={`/dashboard/student/courses/buy/${course_id}/${product.group_id}`}
                    className="block p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      {product.g_name}
                    </h3>
                    <hr className="my-3 border-gray-300 dark:border-gray-600" />
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Days:</span>{' '}
                      {product.l_days}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Teacher:</span>{' '}
                      {product.name} {product.l_name}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Price:</span>{' '}
                      {product.price} UZS
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Period:</span>{' '}
                      {product.period} months
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Time:</span>{' '}
                      {product.subj_start} - {product.subj_end}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Subject:</span>{' '}
                      {product.subject}
                    </p>
                    {product.main_sub && (
                      <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-medium">Main Subject:</span>{' '}
                        {product.main_sub}
                      </p>
                    )}
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Max Students:</span>{' '}
                      {product.user_count}
                    </p>
                  </NavLink>
                  <div className="px-6 pb-6">
                    <NavLink
                      to={`/dashboard/student/courses/buy/${course_id}/${product.group_id}`}
                      className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition-colors duration-300"
                    >
                      Join this group
                    </NavLink>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-200 col-span-full">
                Don't have any groups
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
}
