import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import backurl from '../../../links';

interface Teacher {
  about_me: string;
  active: boolean;
  adress: string;
  age: string;
  birth_date: string;
  checked: boolean;
  company_id: string;
  created_at: string;
  education: string;
  email: string;
  free_trial: boolean;
  group_id: string | null;
  image: string;
  ip_add: string | null;
  isdelete: boolean;
  l_name: string;
  languages: string | null;
  location: string | null;
  main_subject: string;
  name: string;
  password: string;
  pay_status: string | null;
  phone: string;
  rating: string;
  role: string;
  skills: string | null;
  token: string | null;
  updated_at: string;
  user_id: string;
  username_tg: string;
  vpn: boolean;
}

function OneTeacherInfoSodiqAcademy() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const token = localStorage.getItem('TOKEN');
  const { user_id } = useParams<{ user_id: string }>();

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

        console.log(data);

        setTeacher(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, [token, user_id]);

  return (
    <DefaultLayoutSodiqAcademy>
      <div className="flex flex-col items-center p-4">
        {teacher && (
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-6 text-black">
              <img
                className="w-36 h-36 rounded-full"
                src={`${backurl}upload/${teacher.image}`}
                alt={teacher.name}
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {teacher.name} {teacher.l_name}
                </h2>
                <p className="text-gray-500">@{teacher.username_tg}</p>
                <p className="text-gray-500">
                  Member since:{' '}
                  {new Date(teacher.created_at).toLocaleDateString()}
                </p>
                <NavLink
                  to={`/dashboard/sodiq-academy/teacher/courses/${teacher.user_id}`}
                  className="mt-4 px-4 py-2 font-medium bg-blue-500 mt-5 inline-block text-white rounded hover:bg-blue-600"
                >
                  View Courses
                </NavLink>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10 text-black font-medium text-md">
              <div>
                <h3 className="text-lg font-semibold">Official Information</h3>
                <p>Email: {teacher.email}</p>
                <p>Phone Number: {teacher.phone}</p>
                <p>Address: {teacher.adress}</p>
                <p>Main Subject: {teacher.main_subject}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <p>Telegram: {teacher.username_tg}</p>
                <p>Phone Number: {teacher.phone}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayoutSodiqAcademy>
  );
}

export default OneTeacherInfoSodiqAcademy;
