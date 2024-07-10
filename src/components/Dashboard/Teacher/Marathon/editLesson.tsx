import React, { FormEvent, useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backurl from '../../../../links';
import { NavLink, useParams } from 'react-router-dom';

import { MdAddCircle, MdCancel } from 'react-icons/md';

function EditMarathonLessonTeacher() {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [pro, setPro] = useState('');
  const { maraphonel_id } = useParams(); // Assuming you have lesson_id in the route params

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await fetch(
          `${backurl}api/get/maraphone/lesson/${maraphonel_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          // console.log(data);

          setName(data.message.title);
          setCost(data.message.m_url);
          setPro(data.message.process_m);
        } else {
          throw new Error('Failed to fetch lesson data');
        }
      } catch (error) {
        console.error('Error fetching lesson data', error);
        toast.error('Error fetching lesson data', {
          position: 'top-right',
        });
      }
    };

    fetchLessonData();
  }, []);

  const handleCancel = () => {
    setName('');
    setCost('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', name);
    formData.append('m_url', cost);
    formData.append('process', pro);

    try {
      const response = await fetch(
        `${backurl}api/update/maraphone/lesson/${maraphonel_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        toast.success('Lesson successfully updated', {
          position: 'top-right',
        });
      } else {
        throw new Error('Failed to update lesson');
      }
    } catch (error: any) {
      console.error('Error submitting the form', error);
      toast.warning(error.message, {
        position: 'top-right',
      });
    }
  };

  return (
    <DefaultLayoutTeacher>
      <div className="mb-5 text-left mx-auto text-2xl">
        {' '}
        Updating Marathon <span className="underline">Lesson</span>
      </div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="">
          <div className="pt-5">
            <div className="mb-4.5 md:w-1/2 ">
              <label className="mb-2.5 block text-black dark:text-white">
                Lesson title
              </label>
              <input
                type="text"
                placeholder="type here ... "
                className="w-full bg-white rounded-xl border-2 border-stroke bg-transparent py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 ">
              <label className="mb-2.5 block text-black dark:text-white">
                Lesson url for join
              </label>
              <input
                type="text"
                placeholder="type here ..."
                className="w-full bg-white rounded-xl border-2 border-stroke bg-transparent py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 ">
              <label className="mb-2.5 block text-black dark:text-white">
                Lesson Status
              </label>
              <select
                value={pro}
                onChange={(e) => setPro(e.target.value)}
                className="w-full bg-white rounded-xl border-2 border-stroke bg-transparent py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-left mt-20">
            <button
              type="submit"
              className="flex items-center  flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              <span className="me-2">
                <MdAddCircle />
              </span>
              Update
            </button>
            <NavLink
              to="/dashboard/teacher/marathon"
              className="flex ms-5 flex items-center w-25 justify-center rounded bg-red-600 py-3 font-medium text-gray hover:bg-opacity-90"
              onClick={handleCancel}
            >
              <span className="me-2">
                <MdCancel />
              </span>
              Cancel
            </NavLink>
          </div>
        </div>
      </form>
      <ToastContainer />
    </DefaultLayoutTeacher>
  );
}

export default EditMarathonLessonTeacher;
