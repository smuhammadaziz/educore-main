import React, { useEffect, useState } from 'react';

import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

function OneMarathonLessonStudent() {
  const [contact, setContact] = useState({});

  const token = localStorage.getItem('TOKEN');
  const { maraphonel_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${backurl}api/get/maraphone/lesson/${maraphonel_id}`,
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
        setContact(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, [maraphonel_id, token]);

  console.log(contact);

  return (
    <DefaultLayoutStudent>
      <div className="lg:w-4/4 text-black h-full lg:sticky lg:top-0 bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 mb-8 lg:mb-0">
        <h2 className="text-2xl font-semibold mb-5 text-left text-gray-800 dark:text-white">
          Lesson Details
        </h2>
        <div className="flex flex-row items-center text-gray-700 dark:text-white mb-2">
          <h3 className="text-xl font-bold me-2">Lesson title: </h3>
          <p className="text-lg">{contact.title}</p>
        </div>
        <div className="flex flex-row items-center text-gray-700 dark:text-white mb-2">
          <h3 className="text-xl font-bold me-2">Lesson Status:</h3>
          <p className="text-lg py-1 px-5 text-white mt-1 bg-green-600 inline-block rounded-full">
            {contact.process_m || 'N/A'}
          </p>
        </div>
        <div className="flex flex-row items-center text-gray-700 dark:text-white mb-2">
          <h3 className="text-xl font-bold me-2">Created:</h3>
          <p className="text-lg">
            {moment(contact.created_at || 'N/A').format('lll')}
          </p>
        </div>
        <div className="text-gray-700 dark:text-white mb-2">
          <a
            href={contact.m_url}
            target="_blank"
            className="text-lg uppercase font-semibold bg-blue-600 py-3 px-10 mt-5 text-white inline-block hover:bg-blue-800 rounded"
          >
            JOIN the lesson
          </a>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
}

export default OneMarathonLessonStudent;
