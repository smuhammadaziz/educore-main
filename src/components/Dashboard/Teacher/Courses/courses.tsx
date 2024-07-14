import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backurl from '../../../../links';
import moment from 'moment';

import { CiCircleMore } from 'react-icons/ci';
import { CgDetailsMore } from 'react-icons/cg';
import { RiAddCircleFill } from 'react-icons/ri';

export default function AllCoursesListTeacher() {
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
        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="text-center mx-auto my-8">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          My <span className="underline">Courses</span>
        </h2>
        <NavLink
          to="/dashboard/teacher/add/new/course"
          className="flex items-center w-50 mx-auto inline-block text-sm py-3 px-8 bg-blue-700 text-white rounded hover:bg-blue-500 transition duration-300"
        >
          <span className="me-2">
            <RiAddCircleFill />
          </span>
          Add New Course
        </NavLink>
      </div>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 ">
          <div className="grid lg:grid-cols-3 gap-8">
            {courses && courses.length > 0 ? (
              courses.map((course: any) => (
                <div
                  className="bg-white dark:bg-strokedark dark:text-white rounded-lg shadow-md overflow-hidden"
                  key={course.course_id}
                >
                  <img
                    src={`${backurl}upload/${course.image}`}
                    alt={course.title}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {moment(course.created_at).format('LLL')}
                    </p>
                    <NavLink
                      to={`/dashboard/teacher/course/${course.course_id}`}
                      className="flex items-center w-27 text-center inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
                    >
                      <span className="me-2">
                        <CgDetailsMore />
                      </span>
                      More
                    </NavLink>
                  </div>
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
                      to="/dashboard/teacher/add/new/course"
                      className="text-primary"
                    >
                      click here
                    </NavLink>{' '}
                    or click the button above
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
