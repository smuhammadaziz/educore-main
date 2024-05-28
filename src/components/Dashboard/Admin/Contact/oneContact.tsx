import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';

import moment from 'moment';
function OneContactGetAdmin() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');

  const { contact_id } = useParams();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}/api/admin/contact/${contact_id}`,
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

        const reversedData = data.Contact;

        setContacts(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        <div
          key={contacts.contact_id}
          className="bg-white p-5 w-full sm:w-50 md:w-50 xl:w-160 lg:w-150 dark:bg-slate-700 dark:text-white "
        >
          <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
            Full name: {contacts.name} <span></span>
            {contacts.l_name}
          </h3>
          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
            Phone Number: {contacts.phone}
          </p>
          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
            Email: {contacts.email}
          </p>
          <p className="inline-block w-50 mt-1 text-lg font-medium text-gray-900 dark:text-white">
            Message: {contacts.message}
          </p>

          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
            Created time: {moment(contacts.created_at).format('LLL')}
          </p>
          <NavLink
            to={`/dashboard/contact`}
            className="inline-block mt-5 bg-blue-700 rounded px-5 py-1 text-white text-right"
          >
            Go back
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default OneContactGetAdmin;
