import React, { useEffect, useState } from 'react';

import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../links';
import moment from 'moment';

function GetOneNOtificationsSodiq() {
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  const { notef_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/cadmin/get/notef/${notef_id}`,
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

        //    console.log(data);

        setCourses(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <DefaultLayoutSodiqAcademy>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Inbox Details
          </h2>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Full Name:</h3>
            <p className="text-lg">
              {courses.name} {courses.l_name}
            </p>
          </div>

          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Email:</h3>
            <p className="text-lg">{courses.email || 'N/A'}</p>
          </div>
          {/* <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Student Status: </h3>
            <p className="text-lg">{courses.status || 'N/A'} ✅</p>
          </div> */}
          {/* <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Group info:</h3>
            <p className="text-lg">
              <span>{courses.g_name || 'N/A'}</span>,{' '}
              <span>{courses.l_days || 'N/A'} </span>,{' '}
              <span>
                {courses.subj_start || 'N/A'} - {courses.subj_end || 'N/A'}
              </span>
            </p>
          </div> */}
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Created Time:</h3>
            <p className="text-lg">
              {moment(courses.created_at).format('LLL') || 'N/A'}
            </p>
          </div>
          <div className="text-center">
            <NavLink
              to="/dashboard/sodiq-academy/notifications"
              className="inline-block mt-5 bg-blue-600 hover:bg-blue-800 rounded px-5 py-2 text-white"
            >
              Go back
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutSodiqAcademy>
  );
}

export default GetOneNOtificationsSodiq;
