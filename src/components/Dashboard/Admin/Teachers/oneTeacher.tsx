import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';

function OneTeacherGetAdmin() {
  const [teacher, setTeacher] = useState({});

  const { user_id } = useParams();

  const token = localStorage.getItem('TOKEN');
  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await fetch(
          `${backurl}/api/admin/get/teacher/${user_id}`,
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
        setTeacher(data.Teacher);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeacher();
  }, [user_id, token]);

  const getImageSrc = () => {
    return teacher.img
      ? `${backurl}upload/${teacher.img}`
      : 'https://via.placeholder.com/200';
  };

  return (
    <DefaultLayoutAdmin>
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
            <h2 className="text-xl font-bold">Location:</h2>
            <p>{teacher.location || 'No data'}</p>
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
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneTeacherGetAdmin;
