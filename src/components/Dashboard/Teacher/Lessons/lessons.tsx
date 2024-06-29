import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

import { MdAddCircle } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';
import { HiViewGridAdd } from 'react-icons/hi';

function GEtAllLessonsTeacher() {
  const { group_id } = useParams();
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/teacher/group/lessons/${group_id}`,
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
          My <span className="underline">Lessons</span> List
        </h2>
        <NavLink
          to={`/dashboard/teacher/add/new/lesson/${group_id}`}
          className="flex items-center w-55 mx-auto text-center text-sm py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          <span className="me-2">
            <MdAddCircle />
          </span>
          Add new Lesson
        </NavLink>
      </div>
      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {courses && courses ? (
              courses.map((product: any) => (
                <div
                  key={product.lesson_id}
                  className="group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl rounded"
                >
                  <h3 className="mt-4 text-xl text-gray-700 dark:text-white font-bold">
                    {product.title}
                  </h3>

                  <hr className="my-5" />
                  <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                    Short info: {product.l_desc}
                  </p>
                  <p className="mt-5 text-md font-medium text-gray-900 dark:text-white text-left">
                    Lesson Status:
                    <span
                      className={`ms-2 mt-1 py-1 px-2 rounded-full w-25 text-md font-bold text-white dark:text-white text-center ${
                        product.procces_lesson === 'active'
                          ? 'bg-green-500'
                          : product.procces_lesson === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {product.procces_lesson}
                    </span>
                  </p>
                  <p className="mt-1 text-md font-medium text-gray-900 text-left mt-5 dark:text-white">
                    Created: {moment(product.created_at).format('LT')},{' '}
                    {moment(product.created_at).format('l')}
                  </p>
                  <div className="flex items-center">
                    <p className="mt-1 text-md font-medium text-gray-900 text-right dark:text-white">
                      <NavLink
                        to={`/dashboard/teacher/lesson/${product.lesson_id}`}
                        className="flex items-center text-white mt-5 inline-block bg-green-700 hover:underline hover:bg-green-500 py-2 px-5 rounded-full"
                      >
                        <span className="me-2">
                          <CgDetailsMore />
                        </span>
                        more
                      </NavLink>
                    </p>
                    <p className="ms-5 mt-1 text-md font-medium text-gray-900 text-right dark:text-white">
                      <a
                        href={product.l_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white mt-5 inline-block bg-blue-700 hover:underline hover:bg-blue-500 py-2 px-5 rounded-full"
                      >
                        <span className="me-2">
                          <HiViewGridAdd />
                        </span>
                        join the lesson →
                      </a>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>you don't have no lessons</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GEtAllLessonsTeacher;
