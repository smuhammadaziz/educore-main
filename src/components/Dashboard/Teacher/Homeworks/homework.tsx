import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';

import moment from 'moment';

import { MdAddCircle } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';

function GetAllHomeworksTeacher() {
  const { group_id } = useParams();
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/teacher/group/homeworks/${group_id}`,
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
      <div className="right-0 top-0 mx-auto mb-10">
        <h2 className="text-2xl mb-5 mx-auto text-center">
          My <span className="underline">Homeworks</span> List
        </h2>
        <NavLink
          to={`/dashboard/teacher/add/new/homework/${group_id}`}
          className="text-sm flex items-center w-64 mx-auto text-center  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          <span className="me-2">
            <MdAddCircle />
          </span>
          Add new Homework
        </NavLink>
      </div>
      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {courses && courses ? (
              courses.map((homework: any) => (
                <div
                  key={homework.homework_id}
                  className="group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl rounded"
                >
                  <h3 className="mt-4 text-xl text-gray-700 dark:text-white font-bold">
                    {homework.title}
                  </h3>
                  <hr className="my-4" />
                  <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                    {homework.h_desc}
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 text-left mt-5 dark:text-white">
                    Created: {moment(homework.created_at).format('LT')},{' '}
                    {moment(homework.created_at).format('l')}
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 text-right dark:text-white">
                    <NavLink
                      to={`/dashboard/teacher/homework/${homework.homework_id}`}
                      className="flex items-center w-25 text-white mt-5 inline-block bg-green-700 hover:underline hover:bg-green-500 py-2 px-5 rounded-full"
                    >
                      <span className="me-2">
                        <CgDetailsMore />
                      </span>
                      more
                    </NavLink>
                  </p>
                </div>
              ))
            ) : (
              <div>
                <p>you have no homeworks </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetAllHomeworksTeacher;
