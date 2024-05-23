import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

function GetOneMyGroupsTeacher() {
  const { group_id } = useParams();
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/group/by/${group_id}`,
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

        const reversed = data.Data;

        //    console.log(data.Data);

        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayoutTeacher>
      <div className="container mx-auto px-4">
        {courses && courses.length > 0 ? (
          courses.map((product) => (
            <div
              key={product.group_id}
              className="bg-white dark:bg-gray-800 dark:text-white p-6 mb-6 rounded-lg shadow-md"
            >
              <h2 className="text-center text-2xl text-black dark:text-white mb-4">
                About Group
              </h2>
              <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                Group Name: {product.g_name}
              </h3>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Which days: {product.l_days}
              </p>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Maximum group size: {product.user_count} students
              </p>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Lesson time: {product.subj_start}:00 - {product.subj_end}:00
              </p>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Created time: {moment(product.created_at).format('l')}
              </p>

              <NavLink
                to="/dashboard/teacher/my/all/groups"
                className="underline text-blue-700 dark:text-blue-400 mt-5 inline-block"
              >
                Go to my all groups
              </NavLink>

              <div className="flex text-center flex-col md:flex-row mt-10 space-y-3 md:space-y-0 md:space-x-3">
                <NavLink
                  to={`/dashboard/teacher/my/all/groups/show/lessons/${group_id}`}
                  className="bg-green-700 py-3 px-10 text-white hover:bg-green-600 rounded"
                >
                  Show all lessons
                </NavLink>
                <NavLink
                  to={`/dashboard/teacher/my/all/groups/show/homeworks/${group_id}`}
                  className="bg-blue-700 py-3 px-10 text-white hover:bg-blue-600 rounded"
                >
                  Show all homeworks
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            You don't have any courses
          </p>
        )}
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetOneMyGroupsTeacher;
