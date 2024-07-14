import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import { PiContactlessPaymentBold } from 'react-icons/pi';
import { SlFire } from 'react-icons/sl';

function InboxForTeachers() {
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/notefs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // console.log(data);

        setCourses(data.message.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayoutTeacher>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Inbox</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {courses.length > 0 ? (
            courses.map((message: any) => (
              <div
                key={message.notef_id}
                className={`group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl rounded-lg hover:shadow-2xl`}
              >
                {/* <div className="mb-5">
                  {message.free_trial ? (
                    <SlFire size={25} />
                  ) : (
                    <PiContactlessPaymentBold size={25} />
                  )}
                </div> */}
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-white">
                    {message.name} {message.l_name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {moment(message.created_at).fromNow()}
                  </span>
                </div>
                <div className="flex flex-row items-center mt-2">
                  <p
                    className={`mt-1 text-sm font-bold uppercase text-gray-500 inline-block text-white p-1 px-2 rounded my-2 ${
                      message.status === 'checked'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {message.status}
                  </p>
                  <p
                    className={`ms-3 mt-1 font-bold uppercase text-sm text-gray-500 inline-block text-white p-1 rounded my-2 ${
                      message.free_trial ? 'bg-blue-500' : 'bg-blue-500'
                    }`}
                  >
                    {message.free_trial ? 'free trial' : 'paid'}
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {moment(message.created_at).format('LT')},{' '}
                  {moment(message.created_at).format('l')}
                </p>
                <NavLink
                  to={`/dashboard/teacher/inbox/${message.notef_id}`}
                  className="text-center items-center block w-full text-white mt-5 inline-block bg-green-600 hover:bg-green-800 py-2 px-5 rounded-full"
                >
                  View
                </NavLink>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full col-span-full">
              <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
                <p className="text-xl font-medium text-gray-700 dark:text-white">
                  You don't have any new students yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default InboxForTeachers;
