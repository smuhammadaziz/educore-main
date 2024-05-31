import React, { FormEvent, useEffect, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

function AddNewGroupTeacher() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [main, setMain] = useState('');
  const [cost, setCost] = useState('');
  const [time, setTime] = useState('');

  const { course_id } = useParams();

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    setName('');
    setDescription('');
    setMain('');
    setCost('');
    setTime('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a form data object
    const formData = new FormData();
    formData.append('g_name', name);
    formData.append('l_days', description);
    formData.append('u_count', main);
    formData.append('subj_start', cost);
    formData.append('subj_end', time);
    // formData.append('id', params);

    // console.log(formData);

    // console.log(course_id);

    try {
      const response = await fetch(`${backurl}api/add/group/${course_id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // const result = await response.json();
      // console.log('Response:', result);

      if (response.ok) {
        toast.success('Group successfully added', {
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
        Adding new <span className="underline">Group</span>
      </div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="p-6.5">
          <div className="">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Your Group's name
              </label>
              <input
                type="text"
                placeholder="Enter your title"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                What days does your class take place?
              </label>
              <select
                name="courses"
                id="cpurses"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full py-3 bg-white dark:bg-black ps-5"
              >
                <option value="couple">couple</option>
                <option value="odd">odd</option>
                <option value="everyday">everyday</option>
                <option value="weekands">weekands</option>
                <option value="work_days">work_days</option>
              </select>
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Your Group's maximum student limit
              </label>
              <input
                type="text"
                placeholder="Enter your main subject"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={main}
                onChange={(e) => setMain(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Lesson Start Time (only numbers) example: 13
              </label>
              <input
                type="text"
                placeholder="Enter your lesson time (only numbers) example: 13"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Lesson End Time (only numbers) example: 15
              </label>
              <input
                type="text"
                placeholder="Enter your lesson time (only numbers) example: 15"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                which course
              </label>
              <select
                name="courses"
                id="cpurses"
                value={params}
                onChange={handleChange}
                className="w-full py-3 bg-white dark:bg-black ps-5"
              >
                {courses && courses
                  ? courses.map((e) => (
                      <option value={e.course_id} key={e.course_id}>
                        {e.title}
                      </option>
                    ))
                  : 'you don`t have any courses'}
              </select>
            </div> */}
          </div>

          <div className="flex flex-row justify-end mt-20">
            <a
              href="/dashboard/teacher/my/courses"
              className="flex w-25 justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
              onClick={handleCancel}
            >
              Cancel
            </a>
            <button
              type="submit"
              className="ms-5 flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </DefaultLayoutTeacher>
  );
}

export default AddNewGroupTeacher;
