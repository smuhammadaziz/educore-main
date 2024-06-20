import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';

// import { TiArrowBack } from 'react-icons/ti';
// import {} from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';

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

  async function deleteItem() {
    try {
      const response = await fetch(
        `${backurl}/api/delete/course/${course_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      toast.success('Successfully deleted course', {
        position: 'top-right',
      });
      // navigate('/dashboard/courses');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course', {
        position: 'top-right',
      });
    }
  }

  // console.log(courseData);

  return (
    <DefaultLayoutTeacher>
      <ToastContainer />
      <div className="bg-white dark:bg-strokedark dark:text-white w-full max-w-5xl p-5 mx-auto rounded-lg shadow-lg mt-10">
        <img
          src={`${backurl}upload/${
            image || '128-1280406_view-user-icon-png-user-circle-icon-png.png'
          }`}
          alt="Course"
          className="w-full max-w-md rounded-lg"
        />
        <div className="mt-5 text-left">
          <p className="text-2xl font-bold mb-4">Course name: {title}</p>
          <p className="text-lg text-gray-700 mb-4">
            About the course: {descr}
          </p>
          <p className="text-lg text-gray-700 mb-4">Period: {period} months</p>
          <p className="text-lg text-gray-700 mb-4">Price: {price} sum</p>
          <p className="text-lg text-gray-700 mb-4">Main Subject: {subject}</p>
          <p className="text-lg text-gray-700 mb-4">Subject: {main_sub}</p>
          <p className="text-lg text-gray-700 mb-4">
            Created time: {moment(created_at).format('LLL')}
          </p>
          <div className="flex">
            <NavLink
              to="/dashboard/teacher/my/courses"
              className="flex items-center inline-block text-base sm:text-lg bg-blue-700 px-6 sm:px-8 py-2 text-white rounded-full hover:bg-blue-500 transition duration-300"
            >
              <span className="me-2">
                <TiArrowBack />
              </span>
              Go back
            </NavLink>
            <NavLink
              onClick={deleteItem}
              to="/dashboard/teacher/my/courses"
              className=" flex items-center mt-3 sm:mt-0 sm:ml-5 inline-block text-base sm:text-lg bg-red-600 px-6 sm:px-8 py-2 text-white rounded-full hover:bg-red-500 transition duration-300"
            >
              <span className="me-2">
                <MdDelete />
              </span>
              Delete course
            </NavLink>
            <NavLink
              to={`/dashboard/teacher/edit/course/${course_id}`}
              className=" flex items-center mt-3 sm:mt-0 sm:ml-5 inline-block text-base sm:text-lg bg-green-600 px-6 sm:px-8 py-2 text-white rounded-full hover:bg-green-500 transition duration-300"
            >
              <span className="me-2">
                <MdModeEdit />
              </span>
              Edit course
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default OneCourseGetTeacher;
