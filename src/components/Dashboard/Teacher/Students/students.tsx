import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import backurl from '../../../../links';
import { BsFillPeopleFill } from 'react-icons/bs';

const AllStudentListTeacher = () => {
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
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl mb-5 font-bold dark:text-white">
          All <span className="underline">Students</span> List
        </h2>
      </div>
      <div className="bg-gray-100 py-20">
        <h2 className="text-xl font-bold text-center uppercase mb-5 dark:text-white">
          Select one group to see your students
        </h2>
        <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((group) => (
              <div
                key={group.group_id}
                className="bg-white dark:bg-strokedark dark:text-white rounded-xl shadow-xl hover:shadow-2xl p-6"
              >
                <h2 className="text-xl font-bold mb-4">{group.g_name}</h2>
                <p className="text-sm text-gray-700 mb-4">
                  Lesson time: {group.subj_start} - {group.subj_end}
                </p>
                <NavLink
                  to={`/dashboard/teacher/group/students/${group.group_id}`}
                  className="flex items-center bg-blue-600 py-2 px-5 text-white rounded hover:bg-blue-800 transition duration-300"
                >
                  <BsFillPeopleFill className="text-xl mr-2" />
                  See all students
                </NavLink>
              </div>
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
    </>
  );
};

export default AllStudentListTeacher;
