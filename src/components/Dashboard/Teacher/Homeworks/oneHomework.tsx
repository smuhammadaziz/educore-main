import React, { useEffect, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

import { TiArrowBack } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';

interface Lesson {
  lesson_id: number;
  title: string;
  l_desc: string;
  procces_lesson: 'active' | 'pending' | 'inactive';
  created_at: string;
  l_url: string;
}

function GetOneHomeworkTeacher() {
  const [courses, setCourses] = useState<Lesson[]>([]);
  const token = localStorage.getItem('TOKEN');

  const { homework_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/homework/by/${homework_id}`,
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
        `${backurl}/api/delete/homework/${homework_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete homeowork');
      }
      toast.success('Successfully deleted homeowork', {
        position: 'top-right',
      });
      // navigate('/dashboard/homeoworks');
    } catch (error) {
      console.error('Error deleting homeowork:', error);
      toast.error('Failed to delete homeowork', {
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
            <p className="text-lg">{courses.h_desc || 'N/A'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-4">
            <h3 className="text-xl font-bold">Created Time:</h3>
            <p className="text-lg">
              {moment(courses.created_at).format('LLL') || 'N/A'}
            </p>
          </div>
          <div className="flex text-center mx-auto justify-center">
            <NavLink
              to="/dashboard/teacher/my/all/homeworks"
              className="flex items-center inline-block mt-5 bg-blue-700 hover:bg-blue-800 rounded px-5 py-2 text-white"
            >
              <span className="me-2">
                <TiArrowBack />
              </span>
              Go back
            </NavLink>
            <NavLink
              onClick={deleteItem}
              to="/dashboard/teacher/my/all/homeworks"
              className="flex items-center ms-5 inline-block mt-5 bg-red-700 hover:bg-red-800 rounded px-5 py-2 text-white"
            >
              <span className="me-2">
                <MdDelete />
              </span>
              Delete this homework
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetOneHomeworkTeacher;
