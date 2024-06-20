import React, { useEffect, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

import { TiArrowBack } from 'react-icons/ti';

interface Lesson {
  lesson_id: number;
  title: string;
  l_desc: string;
  procces_lesson: 'active' | 'pending' | 'inactive';
  created_at: string;
  l_url: string;
}

function GetOneLessonTeacher() {
  const [courses, setCourses] = useState<Lesson[]>([]);
  const token = localStorage.getItem('TOKEN');

  const { lesson_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/lesson/by/${lesson_id}`,
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

        console.log(data);

        const reversed = data.Data;
        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  async function deleteItem() {
    try {
      const response = await fetch(
        `${backurl}/api/delete/lesson/${lesson_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }
      toast.success('Successfully deleted lesson', {
        position: 'top-right',
      });
      // navigate('/dashboard/lessons');
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Failed to delete lesson', {
        position: 'top-right',
      });
    }
  }
  return (
    <DefaultLayoutTeacher>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Lesson Details
          </h2>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Title:</h3>
            <p className="text-lg">{courses.title}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Description:</h3>
            <p className="text-lg">{courses.l_desc || 'N/A'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Link to join:</h3>
            <p className="text-lg">
              <a
                href={courses.l_url || 'N/A'}
                target="_blank"
                className="hover:underline text-blue-600"
              >
                {courses.l_url || 'N/A'}
              </a>
            </p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Status:</h3>
            <p className="text-lg font-bold">
              {courses.procces_lesson || 'N/A'}
            </p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Created Time:</h3>
            <p className="text-lg">
              {moment(courses.created_at).format('LLL') || 'N/A'}
            </p>
          </div>
          <div className="text-center mx-auto justify-center">
            <NavLink
              to="/dashboard/teacher/my/all/lessons"
              className="flex items-center inline-block mt-5 bg-blue-700 hover:bg-blue-800 rounded px-5 py-2 text-white"
            >
              <span className="me-2">
                <TiArrowBack />
              </span>
              Go back
            </NavLink>
            <NavLink
              onClick={deleteItem}
              to="/dashboard/teacher/my/all/lessons"
              className="flex items-center ms-5 inline-block mt-5 bg-red-700 hover:bg-red-800 rounded px-5 py-2 text-white"
            >
              <span className="me-2">{/* <HiViewGridAdd /> */}</span>
              Delete this lesson
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetOneLessonTeacher;
