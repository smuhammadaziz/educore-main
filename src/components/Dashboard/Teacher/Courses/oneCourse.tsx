import React, { useEffect, useState } from 'react';
// import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { useParams } from 'react-router-dom';
import backurl from '../../../../links';

import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OneCourseGetTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [blog, setBlog] = useState([]);

  const { course_id } = useParams();

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}api/get/course/by/${course_id}`,
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

        const reversedData = data.Data;
        setTeachers(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  //   async function deleleItem() {
  //     try {
  //       const response = await fetch(
  //         `${backurl}api/admin/delete/blog/${course_id}`,
  //         {
  //           method: 'DELETE',
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();

  //       //  const reversedData = data.Data;

  //       console.log(data);

  //       //  setTeachers(reversedData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  return (
    <DefaultLayoutTeacher>
      <ToastContainer></ToastContainer>
      <div className="bg-white w-150 p-2 py-5">
        <img
          src={`${backurl}upload/${
            teachers
              ? teachers['image']
              : '128-1280406_view-user-icon-png-user-circle-icon-png.png'
          }`}
          alt="image"
          width="400"
          className="mx-auto sm:w-100"
        />
        <h2 className="text-4xl text-black text-center">{teachers['title']}</h2>

        <p className="text-lg font-bold text-center mt-5">
          About the course: {teachers['descr']}
        </p>
        <p className="text-lg font-bold text-center mt-5">
          Period: {teachers['period']}
        </p>
        <p className="text-lg font-bold text-center mt-5">
          Price: {teachers['price']}
        </p>
        <p className="text-lg font-bold text-center mt-5 font-bold">
          Main Subject: {teachers['subject']}
        </p>
        <p className="text-lg font-bold text-center mt-5 font-bold">
          Created time:{' '}
          {moment(teachers['created_at']).subtract(10, 'days').calendar()}
        </p>

        {/* <div>
          <button
            onClick={deleleItem}
            className="mt-5 bg-red-600 text-white px-4 py-2 rounded mx-auto block hover:bg-red-500"
          >
            delete blog
          </button>
        </div> */}
      </div>
    </DefaultLayoutTeacher>
  );
}

export default OneCourseGetTeacher;
