import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function OneStudentGetTeacherPage() {
  const [student, setStudent] = useState({});

  const { user_id } = useParams();

  const token = localStorage.getItem('TOKEN');
  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await fetch(
          `${backurl}api/admin/get/student/${user_id}`,
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
        setStudent(data.Student);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudent();
  }, [user_id, token]);

  const getImageSrc = () => {
    return student.img
      ? `${backurl}upload/${student.img}`
      : 'https://via.placeholder.com/200';
  };

  return (
    <DefaultLayoutTeacher>
      <div className="mb-5 text-center mx-auto text-3xl font-semibold">
        <span className="underline">Student Info</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-center mb-10">
          {student.img ? (
            <img
              src={getImageSrc()}
              alt="Student"
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
              {student.name} {student.l_name}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">About Student:</h2>
            <p>{student.about_me || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Address:</h2>
            <p>{student.adress || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Birth Day:</h2>
            <p>{student.birth_date || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Created Time:</h2>
            <p>{student.created_at || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Education:</h2>
            <p>{student.education || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Email:</h2>
            <p>{student.email || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Languages:</h2>
            <p>{student.languages || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Location:</h2>
            <p>{student.location || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Main Subject:</h2>
            <p>{student.main_subject || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Phone Number:</h2>
            <p>{student.phone || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Rating:</h2>
            <p>{student.rating || 'No data'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold">Role:</h2>
            <p>{student.role || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Skills:</h2>
            <p>{student.skills || 'No data'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Username Tg:</h2>
            <p>{student.username_tg || 'No data'}</p>
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default OneStudentGetTeacherPage;
