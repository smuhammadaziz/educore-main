import React, { FormEvent, useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OneTeacherGetAdmin() {
  const [teacher, setTeacher] = useState({});
  const [company, setCompany] = useState({});
  const [status, setStatus] = useState(true);

  const { user_id } = useParams();

  const token = localStorage.getItem('TOKEN');
  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await fetch(
          `${backurl}api/admin/get/teacher/${user_id}`,
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

        // console.log(data);

        setTeacher(data.Teacher);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeacher();
  }, []);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await fetch(
          `${backurl}api/admin/get/teacher/company/${user_id}`,
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

        // console.log(data);

        setCompany(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeacher();
  }, []);

  const getImageSrc = () => {
    return teacher.img
      ? `${backurl}upload/${teacher.img}`
      : 'https://via.placeholder.com/200';
  };

  const handleChange = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('boolean', status ? 'true' : 'false');

    try {
      const response = await fetch(
        `${backurl}api/cadmin/update/status/user/${user_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const contentType = response.headers.get('Content-Type');

      if (response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          // console.log(data);
        } else {
          const text = await response.text();
          // console.log(text);
        }
        toast.success('Status successfully updated', {
          position: 'top-right',
        });
      } else {
        const errorData =
          contentType && contentType.includes('application/json')
            ? await response.json()
            : await response.text();
        throw new Error(errorData);
      }
    } catch (error: any) {
      console.error('Error submitting the form', error);
      toast.warning(error.message, {
        position: 'top-right',
      });
    }
  };

  return (
    <DefaultLayoutAdmin>
      <ToastContainer></ToastContainer>
      <div className="mb-5 text-center mx-auto text-3xl font-semibold">
        <span className="underline">Teacher Info</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-center mb-10">
          {teacher.img ? (
            <img
              src={getImageSrc()}
              alt="Teacher"
              width="200"
              className="rounded-full shadow-lg"
            />
          ) : (
            <FaUserCircle size={200} className="text-gray-400" />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Full Name:</h2>
            <p>
              {teacher.name} {teacher.l_name}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">About Teacher:</h2>
            <p>{teacher.about_me || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Address:</h2>
            <p>{teacher.adress || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Birth Day:</h2>
            <p>{teacher.birth_date || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Created Time:</h2>
            <p>{moment(teacher.created_at || 'No data').format('lll')}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Education:</h2>
            <p>{teacher.education || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Email:</h2>
            <p>{teacher.email || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Languages:</h2>
            <p>{teacher.languages || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Company:</h2>
            <p>{company.name || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Main Subject:</h2>
            <p>{teacher.main_subject || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Phone Number:</h2>
            <p>{teacher.phone || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Rating:</h2>
            <p>{teacher.rating || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Role:</h2>
            <p>{teacher.role || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Skills:</h2>
            <p>{teacher.skills || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Username Tg:</h2>
            <p>{teacher.username_tg || 'No data'}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Active:</h2>
          <p>
            {teacher.active
              ? 'this teacher is active'
              : 'this teacher is not active'}
          </p>
        </div>
        <form onSubmit={handleChange} className="inline-block ms-3">
          <select
            value={status ? 'active' : 'inactive'}
            onChange={(e) => setStatus(e.target.value === 'active')}
            className="mt-4 px-4 py-2 font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
          <button
            type="submit"
            className="ml-3 mt-4 px-4 py-2 font-medium bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update Status
          </button>
        </form>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneTeacherGetAdmin;
