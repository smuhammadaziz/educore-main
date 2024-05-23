import React, { FormEvent, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddnewCourseTeacher() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [main, setMain] = useState('');
  const [cost, setCost] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState(null);

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    setName('');
    setDescription('');
    setMain('');
    setCost('');
    setTime('');
    setPhoto(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a form data object
    const formData = new FormData();
    formData.append('title', name);
    formData.append('descr', description);
    formData.append('subject', main);
    formData.append('price', cost);
    formData.append('period', time);
    if (photo) {
      formData.append('image', photo);
    }

    // console.log(formData);

    try {
      const response = await fetch(`${backurl}api/add/course`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // const result = await response.json();
      // console.log('Response:', result);

      if (response.ok) {
        toast.success('Course successfully added', {
          position: 'top-right',
        });
      }
      // console.log(response);
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
        Adding new <span className="underline">Course</span>
      </div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="p-6.5">
          <div className="">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Title
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
                Descr
              </label>
              <input
                type="text"
                placeholder="Enter your desc"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Main Subject
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
                Price
              </label>
              <input
                type="text"
                placeholder="Enter your price"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Period
              </label>
              <input
                type="text"
                placeholder="Enter your period"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Photo (only one image)
              </label>
              <input
                type="file"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
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

export default AddnewCourseTeacher;
