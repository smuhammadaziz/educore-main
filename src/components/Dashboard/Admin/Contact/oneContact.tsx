import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

function OneContactGetAdmin() {
  const [contact, setContact] = useState({});

  const token = localStorage.getItem('TOKEN');
  const { contact_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
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
        setContact(data.Contact);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, [contact_id, token]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Contact Details
        </h2>
        <div className="text-gray-700 dark:text-white mb-4">
          <h3 className="text-xl font-bold">Full Name:</h3>
          <p className="text-lg">
            {contact.name} {contact.l_name}
          </p>
        </div>
        <div className="text-gray-700 dark:text-white mb-4">
          <h3 className="text-xl font-bold">Phone Number:</h3>
          <p className="text-lg">{contact.phone || 'N/A'}</p>
        </div>
        <div className="text-gray-700 dark:text-white mb-4">
          <h3 className="text-xl font-bold">Email:</h3>
          <p className="text-lg">{contact.email || 'N/A'}</p>
        </div>
        <div className="text-gray-700 dark:text-white mb-4">
          <h3 className="text-xl font-bold">Message:</h3>
          <p className="text-lg">{contact.message || 'N/A'}</p>
        </div>
        <div className="text-gray-700 dark:text-white mb-4">
          <h3 className="text-xl font-bold">Created Time:</h3>
          <p className="text-lg">
            {moment(contact.created_at).format('LLL') || 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <NavLink
            to="/dashboard/contact"
            className="inline-block mt-5 bg-blue-700 hover:bg-blue-800 rounded px-5 py-2 text-white"
          >
            Go back
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default OneContactGetAdmin;
