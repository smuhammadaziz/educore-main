import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

function OneBlogGetAdmin() {
  const [teachers, setTeachers] = useState([]);
  const [blog, setBlog] = useState([]);

  const navigate = useNavigate();

  const { blog_id } = useParams();

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/get/blog/${blog_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversedData = data.Data;

        //    console.log(reversedData);

        setTeachers(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  async function deleleItem() {
    try {
      const response = await fetch(
        `${backurl}api/admin/delete/blog/${blog_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (response.ok) {
        // window.location.href = '/dashboard/blogs';
        navigate('/dashboard/blogs');
      }

      toast.success('Successfully deleted 1 item', {
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DefaultLayoutAdmin>
      <ToastContainer />
      <div className="bg-white dark:bg-black p-4 py-5 w-full max-w-4xl mx-auto">
        <img
          src={`${backurl}upload/${
            teachers
              ? teachers['img']
              : '128-1280406_view-user-icon-png-user-circle-icon-png.png'
          }`}
          alt="image"
          className="w-full h-auto max-w-lg mx-auto"
        />
        <h2 className="text-2xl sm:text-4xl mt-5 text-black text-center">
          {teachers['title']}
        </h2>
        <p className="text-center mt-5">{teachers['descr']}</p>
        <p className="text-center mt-5">
          {moment(teachers['created_at']).format('l')}
        </p>

        <div className="mt-5 text-center">
          <button
            onClick={deleleItem}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Blog
          </button>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneBlogGetAdmin;
