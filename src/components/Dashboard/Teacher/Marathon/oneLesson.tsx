import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OneMarathonLessonTeacher() {
  const [contact, setContact] = useState({});

  const token = localStorage.getItem('TOKEN');
  const { maraphonel_id } = useParams();

  //   console.log(maraphone_id);

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

  async function deleteItem() {
    try {
      const response = await fetch(
        `${backurl}api/delete/maraphone/lesson/${maraphonel_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      //  console.log(response);

      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }
      toast.success('Successfully deleted lesson', {
        position: 'top-right',
      });
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Failed to delete lesson', {
        position: 'top-right',
      });
    }
  }

  return (
    <DefaultLayoutTeacher>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Lesson Details
          </h2>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Title:</h3>
            <p className="text-lg">{contact.title}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Lesson Url:</h3>
            <p className="text-lg">{contact.m_url || 'N/A'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Created:</h3>
            <p className="text-lg">
              {moment(contact.created_at).format('LLL') || 'N/A'}
            </p>
          </div>
          <div className="text-center">
            <NavLink
              to="/dashboard/teacher/marathon"
              className="inline-block mt-5 bg-blue-700 hover:bg-blue-800 rounded px-5 py-2 text-white"
            >
              Go back
            </NavLink>
            <NavLink
              onClick={deleteItem}
              to="/dashboard/teacher/marathon"
              className="ms-3 inline-block mt-5 bg-red-700 hover:bg-red-800 rounded px-5 py-2 text-white"
            >
              Delete
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default OneMarathonLessonTeacher;
