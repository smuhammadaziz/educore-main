import React, { FormEvent, useEffect, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useParams } from 'react-router-dom';
import { MdAddCircle, MdCancel } from 'react-icons/md';

function AddNewLessonForTeacher() {
  const [name, setName] = useState('');
  const [main, setMain] = useState('');
  const [cost, setCost] = useState('');

  const { group_id } = useParams();

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    setName('');
    setMain('');
    setCost('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a form data object
    const formData = new FormData();
    formData.append('title', name);
    formData.append('l_desc', main);
    formData.append('l_url', cost);

    try {
      const response = await fetch(`${backurl}api/add/lesson/${group_id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // const result = await response.json();
      // console.log('Response:', result);

      if (response.ok) {
        toast.success('Lesson successfully added', {
          position: 'top-right',
        });
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
      <ToastContainer></ToastContainer>
      <div className="mb-5 text-left mx-auto text-2xl">
        {' '}
        Adding new <span className="underline">Lesson</span>
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
                Short information about your lesson
              </label>
              <input
                type="text"
                placeholder="type here ..."
                className="w-full bg-white rounded-xl border-2 border-stroke bg-transparent py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={main}
                onChange={(e) => setMain(e.target.value)}
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
          </div>

          <div className="flex flex-row justify-left mt-20">
            <button
              type="submit"
              className="flex items-center  flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              <span className="me-2">
                <MdAddCircle />
              </span>
              Add
            </button>
            <NavLink
              to="/dashboard/teacher/my/groups"
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
    </DefaultLayoutTeacher>
  );
}

export default AddNewLessonForTeacher;
