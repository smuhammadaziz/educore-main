import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OneMarathonAdmin() {
  const [contact, setContact] = useState({});

  const token = localStorage.getItem('TOKEN');
  const { maraphone_id } = useParams();

  //   console.log(maraphone_id);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${backurl}api/admin/get/maraphone/${maraphone_id}`,
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
  }, [maraphone_id, token]);

  async function deleteItem() {
    try {
      const response = await fetch(
        `${backurl}api/admin/delete/maraphone/${maraphone_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      toast.success('Successfully deleted blog', {
        position: 'top-right',
      });
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog', {
        position: 'top-right',
      });
    }
  }

  return (
    <DefaultLayoutAdmin>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Marathon Details
          </h2>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Title:</h3>
            <p className="text-lg">{contact.title}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Descriptions:</h3>
            <p className="text-lg">{contact.descr || 'N/A'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Short info:</h3>
            <p className="text-lg">{contact.m_days || 'N/A'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Lesson time:</h3>
            <p className="text-lg">
              {contact.m_start || 'N/A'} - {contact.m_end || 'N/A'}
            </p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Marathon period:</h3>
            <p className="text-lg">{contact.m_period || 'N/A'} days</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Created:</h3>
            <p className="text-lg">
              {moment(contact.created_at).format('LLL') || 'N/A'}
            </p>
          </div>
          <div className="text-center">
            <NavLink
              to="/dashboard/marathon"
              className="inline-block mt-5 bg-blue-700 hover:bg-blue-800 rounded px-5 py-2 text-white"
            >
              Go back
            </NavLink>
            <NavLink
              onClick={deleteItem}
              to="/dashboard/marathon"
              className="ms-3 inline-block mt-5 bg-red-700 hover:bg-red-800 rounded px-5 py-2 text-white"
            >
              Delete
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneMarathonAdmin;
