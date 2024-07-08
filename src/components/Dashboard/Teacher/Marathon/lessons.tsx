import React, { useEffect, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

import { MdAddCircle } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';
import { HiViewGridAdd } from 'react-icons/hi';

function AllLessonMarathonTeacher() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');

  const { maraphone_id } = useParams();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}api/get/all/maraphone/lesson/${maraphone_id}`,
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

        const reversedData = data.message.reverse();

        //    console.log(reversedData);

        setContacts(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <DefaultLayoutTeacher>
      <div>Marathon Lessons</div>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Marathons</span>
        </h2>
        <NavLink
          to={`/dashboard/teacher/add/new/marathon/lesson/${maraphone_id}`}
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new lesson
        </NavLink>
      </div>
      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {contacts && contacts ? (
              contacts.map((product: any) => (
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
                        product.process_m === 'active'
                          ? 'bg-green-500'
                          : product.procces_lesson === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {product.process_m}
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

export default AllLessonMarathonTeacher;
