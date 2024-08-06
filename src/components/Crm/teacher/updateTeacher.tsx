import React, { FormEvent, useEffect, useState } from 'react';
import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import { useParams } from 'react-router-dom';
import backurl from '../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateTeacherSodiq() {
  const [email, setEmail] = useState('');
  const token = localStorage.getItem('TOKEN');
  const { user_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${backurl}/api/cadmin/get/teacher/by/${user_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmail(data.email);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, [token, user_id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('email', email);

    try {
      const response = await fetch(
        `${backurl}api/cadmin/update/user/${user_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success('User successfully updated', {
          position: 'top-right',
        });
        setEmail(result.email);
      } else {
        console.error('Failed to update profile');
        toast.error(result.message, {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile', {
        position: 'top-right',
      });
    }
  };

  return (
    <DefaultLayoutSodiqAcademy>
      <ToastContainer />
      <div className="my-5 text-2xl font-semibold text-center">
        Update Teacher Email
      </div>
      <form
        onSubmit={handleSubmit}
        className="dark:text-white p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto"
      >
        <div className="mb-4">
          <label className="mb-2 block text-lg font-medium text-black dark:text-white">
            Current Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new Email"
            className="w-full bg-white rounded border-[1.5px] border-stroke py-3 px-4 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="flex justify-between">
          <a
            href="/dashboard/sodiq-academy/teachers"
            className="inline-block rounded bg-red-600 px-6 py-2 text-white font-medium hover:bg-red-700 transition"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-block rounded bg-green-600 px-6 py-2 text-white font-medium hover:bg-green-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </DefaultLayoutSodiqAcademy>
  );
}

export default UpdateTeacherSodiq;
