import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import { useParams } from 'react-router-dom';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OneBlogGetAdmin() {
  const [teachers, setTeachers] = useState([]);
  const [blog, setBlog] = useState([]);

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

      //  const reversedData = data.Data;

      console.log(data);

      //  setTeachers(reversedData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <DefaultLayoutAdmin>
      <ToastContainer></ToastContainer>
      <div className="bg-white w-150 p-2 py-5">
        <img
          src={`${backurl}upload/${
            teachers
              ? teachers['img']
              : '128-1280406_view-user-icon-png-user-circle-icon-png.png'
          }`}
          alt="image"
          width="400"
          className="mx-auto sm:w-100"
        />
        <h2 className="text-4xl text-black text-center">{teachers['title']}</h2>
        <p className="text-center mt-5">{teachers['descr']}</p>

        <div>
          <button
            onClick={deleleItem}
            className="mt-5 bg-red-600 text-white px-4 py-2 rounded mx-auto block"
          >
            delete blog
          </button>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneBlogGetAdmin;
