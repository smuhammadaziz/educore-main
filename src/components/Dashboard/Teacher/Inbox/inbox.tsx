import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

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
        <h1 className="text-2xl font-bold mb-4">Inbox</h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {courses.length > 0 ? (
            courses.map((message: any) => (
              <div
                key={message.notef_id}
                className="group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl rounded-lg"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-white">
                    {message.name} {message.l_name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {moment(message.created_at).fromNow()}
                  </span>
                </div>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {message.email}
                </p>
                <p className="mt-1 text-sm text-gray-500">{message.g_name}</p>
                <p
                  className={`mt-1 text-sm text-gray-500 inline-block text-white p-1 rounded my-2 ${
                    message.status === 'checked' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {message.status}
                </p>
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
            <div>
              <p>You don't have any messages.</p>
            </div>
          )}
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default InboxForTeachers;
