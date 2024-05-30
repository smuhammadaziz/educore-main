import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';

function OneCourseGetTeacher() {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { course_id } = useParams();
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourse() {
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
        setCourseData(data.Data);
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast.error('Error fetching course data');
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [course_id, token]);

  if (loading) {
    return (
      <DefaultLayoutTeacher>
        <div className="text-center py-10">Loading...</div>
      </DefaultLayoutTeacher>
    );
  }

  if (!courseData) {
    return (
      <DefaultLayoutTeacher>
        <div className="text-center py-10">Course data not available</div>
      </DefaultLayoutTeacher>
    );
  }

  const { image, title, descr, period, price, subject, main_sub, created_at } =
    courseData;

  return (
    <DefaultLayoutTeacher>
      <ToastContainer />
      <div className="bg-white w-full max-w-5xl p-5 mx-auto rounded shadow">
        <img
          src={`${backurl}upload/${
            image || '128-1280406_view-user-icon-png-user-circle-icon-png.png'
          }`}
          alt="Course"
          className="w-full max-w-md rounded"
        />
        <div className="mt-5">
          <p className="text-lg font-bold">Course name: {title}</p>
          <p className="text-lg font-bold mt-2">About the course: {descr}</p>
          <p className="text-lg font-bold mt-2">Period: {period} months</p>
          <p className="text-lg font-bold mt-2">Price: {price} sum</p>
          <p className="text-lg font-bold mt-2">Main Subject: {subject}</p>
          <p className="text-lg font-bold mt-2">Subject: {main_sub}</p>
          <p className="text-lg font-bold mt-2">
            Created time: {moment(created_at).format('LLL')}
          </p>
          <NavLink
            to="/dashboard/teacher/my/courses"
            className="text-lg bg-blue-700 px-8 py-2 text-white rounded mt-5 inline-block"
          >
            Go back
          </NavLink>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default OneCourseGetTeacher;
