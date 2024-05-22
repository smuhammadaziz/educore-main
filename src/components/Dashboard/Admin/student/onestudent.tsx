import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';
import { useParams } from 'react-router-dom';

function OneStudentGetAdmin() {
  const [teachers, setTeachers] = useState([]);

  const { user_id } = useParams();

  const token = localStorage.getItem('TOKEN');
  useEffect(() => {
    async function fetchCourses() {
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

        const reversedData = data.Student;

        setTeachers(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <DefaultLayoutAdmin>
      <div className="mb-5 text-center mx-auto text-2xl">
        {' '}
        <span className="underline">Teacher info</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src={`${backurl}upload/${
            teachers == null
              ? teachers['img']
              : '128-1280406_view-user-icon-png-user-circle-icon-png.png'
          }`}
          alt="image"
          width="200"
          className="mx-auto block my-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <h2 className="text-xl font-bold">
            Full Name: {teachers && teachers['name']}{' '}
            {teachers && teachers['l_name']}
          </h2>
          <h2 className="text-xl font-bold">
            About student:{' '}
            {teachers['about_me'] ? teachers['about_me'] : "Don't have any bio"}
          </h2>
          <h2 className="text-xl font-bold">
            Address: {teachers['adress'] ? teachers['adress'] : 'Toshkent'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <h2 className="text-xl font-bold">
            Birth day:{' '}
            {teachers['birth_date'] ? teachers['birth_date'] : '19.05.2006'}
          </h2>
          <h2 className="text-xl font-bold">
            Created time:{' '}
            {teachers['created_at'] ? teachers['created_at'] : '19/04/2024'}
          </h2>
          <h2 className="text-xl font-bold">
            Education:{' '}
            {teachers['education']
              ? teachers['education']
              : 'Yangi Ozbekiston 2-kurs'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <h2 className="text-xl font-bold">
            Email: {teachers['email'] ? teachers['email'] : 'example@gmail.com'}
          </h2>
          <h2 className="text-xl font-bold">
            Languages:{' '}
            {teachers['languages'] ? teachers['languages'] : 'English, Russian'}
          </h2>
          <h2 className="text-xl font-bold">
            Location: {teachers['location'] ? teachers['location'] : 'Toshkent'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <h2 className="text-xl font-bold">
            Main_subject:{' '}
            {teachers['main_subject'] ? teachers['main_subject'] : 'SAT'}
          </h2>
          <h2 className="text-xl font-bold">
            Phone Number:{' '}
            {teachers['phone'] ? teachers['phone'] : '+998700141010'}
          </h2>
          <h2 className="text-xl font-bold">
            Rating: {teachers['rating'] ? teachers['rating'] : 'good'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <h2 className="text-xl font-bold">
            Role: {teachers['role'] ? teachers['role'] : 'teacher'}
          </h2>
          <h2 className="text-xl font-bold">
            Skills:{' '}
            {teachers['skills'] ? teachers['skills'] : 'Creative, Intelligent'}
          </h2>
          <h2 className="text-xl font-bold">
            Username Tg:{' '}
            {teachers['username_tg'] ? teachers['username_tg'] : '@username'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <h2 className="text-xl font-bold">
            user_id: {teachers['user_id'] ? teachers['user_id'] : '123'}
          </h2>
          <h2 className="text-xl font-bold">
            Vpn: {teachers['vpn'] ? teachers['vpn'] : 'false'}
          </h2>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneStudentGetAdmin;
