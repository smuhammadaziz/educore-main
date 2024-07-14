import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';

import { MdViewList } from 'react-icons/md';

export default function AllGroupsListTeacher() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.Data.reverse();

        // console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My <span className="underline">Groups</span>
          </h2>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-left text-center font-bold text-xl text-gray-900 dark:text-gray-100 mb-10">
            Select one course to see your groups
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {courses && courses.length > 0 ? (
              courses.map((e: any) => (
                <div
                  className="bg-white dark:bg-strokedark dark:text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  key={e.course_id}
                >
                  <img
                    src={`${backurl}upload/${e.image}`}
                    alt={e.title}
                    className="w-full h-50 object-cover mb-5"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
                    {e.title}
                  </h2>
                  <NavLink
                    to={`/dashboard/teacher/group/${e.course_id}`}
                    className="flex items-center font-bold w-full mx-auto justify-center text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <span className="me-3">
                      <MdViewList />
                    </span>
                    View Groups
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full col-span-full">
                <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
                  <p className="text-xl font-medium text-gray-700 dark:text-white">
                    You have no courses
                  </p>
                  <p className="text-xl font-medium text-gray-700 dark:text-white mt-3">
                    If you want to add first your course,{' '}
                    <NavLink
                      to="/dashboard/teacher/my/courses"
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
    </>
  );
}
