import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import { BiSolidRocket } from 'react-icons/bi';

function AllMarathonStudent() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/get/all/maraphones`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversedData = data.message.reverse();
        setContacts(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <DefaultLayoutStudent>
      <div className="mb-5">
        <h2 className="text-2xl">Marathon</h2>
      </div>

      <div className="space-y-5">
        {contacts && contacts.length > 0 ? (
          contacts.map((course: any) => (
            <div
              key={course.maraphone_id}
              className="bg-white p-6 py-8 rounded shadow-md flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="h-16 w-16 flex-shrink-0">
                  <img
                    src={`${backurl}upload/${course.image}`}
                    alt={course.title}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="ml-4 text-black uppercase">
                  <h3 className="text-2xl font-semibold">{course.title}</h3>
                  <p className="text-xl">{course.m_days}</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <NavLink
                  to={`/dashboard/student/view/marathon/${course.maraphone_id}`}
                  className="flex flex-row uppercase items-center bg-green-600 text-white px-4 py-2 rounded-lg mt-2 inline-block hover:bg-green-700"
                >
                  <span className="me-2">
                    <BiSolidRocket />
                  </span>
                  Start now
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You don't have any courses.</p>
        )}
      </div>
    </DefaultLayoutStudent>
  );
}

export default AllMarathonStudent;
