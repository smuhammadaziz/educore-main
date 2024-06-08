import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OneCompanyGetAdmin() {
  const [contact, setContact] = useState({});

  const token = localStorage.getItem('TOKEN');
  const { company_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${backurl}/api/admin/get/company/${company_id}`,
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

        setContact(data.Company);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, []);

  async function deleteItem() {
    try {
      const response = await fetch(
        `${backurl}/api/admin/delete/company/${company_id}`,
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
      <ToastContainer></ToastContainer>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Company Details
          </h2>
          <div className="text-gray-700 dark:text-white mb-4">
            <img
              src={`${backurl}upload/${contact ? contact.image : 'google.com'}`}
              alt={contact ? contact.name : 'image title'}
              className="w-100 h-full object-contain mx-auto mb-10"
            />
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Company Name:</h3>
            <p className="text-lg">{contact ? contact.name : 'image title'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Created Time:</h3>
            <p className="text-lg">
              {moment(contact ? contact.created_at : '12/12/2024').format(
                'LLL',
              ) || 'N/A'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <NavLink
              to="/dashboard/companies"
              className="bg-blue-700 hover:bg-blue-800 rounded px-5 py-2 text-white"
            >
              Go back
            </NavLink>
            <NavLink
              onClick={deleteItem}
              to="/dashboard/companies"
              className="bg-red-700 hover:bg-red-800 rounded px-5 py-2 text-white"
            >
              Delete company
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneCompanyGetAdmin;
