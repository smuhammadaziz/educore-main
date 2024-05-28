import React, { FormEvent, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddnewCourseTeacher() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [main, setMain] = useState('');
  const [sub, setSub] = useState('');
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
    setSub('');
    setPhoto(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', name);
    formData.append('descr', description);
    formData.append('subject', main);
    formData.append('main_sub', sub || ''); // Add an empty string if sub is null
    formData.append('price', cost);
    formData.append('period', time);
    if (photo) {
      formData.append('image', photo);
    }

    console.log(formData);

    try {
      const response = await fetch(`${backurl}api/add/course`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Course successfully added', {
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

  const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMain(value);
    if (value === 'IELTS' || value === 'SAT') {
      setSub(''); // Set sub to an empty string if main is IELTS or SAT
    } else {
      setSub(''); // Reset sub when the main subject changes
    }
  };

  return (
    <DefaultLayoutTeacher>
      <ToastContainer />
      <div className="mb-5 text-left mx-auto text-2xl">
        Adding new <span className="underline">Course</span>
      </div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="p-6.5">
          <div className="">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Course name
              </label>
              <input
                type="text"
                placeholder="Enter your Course title"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Short information about your course
              </label>
              <input
                type="text"
                placeholder="Enter your short information"
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
              <select
                value={main}
                onChange={handleMainChange}
                className={`w-full rounded border border-stroke bg-white py-3 px-5 pe-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select Main Course
                </option>
                <option value="IELTS" className="text-body dark:text-bodydark">
                  IELTS
                </option>
                <option value="SAT" className="text-body dark:text-bodydark">
                  SAT
                </option>
                <option value="IGCSE" className="text-body dark:text-bodydark">
                  IGCSE
                </option>
                <option
                  value="AS/A-LEVELS"
                  className="text-body dark:text-bodydark"
                >
                  AS/A-LEVELS
                </option>
              </select>
            </div>
            {(main === 'IGCSE' || main === 'AS/A-LEVELS') && (
              <div className="mb-4.5 md:w-1/2 px-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subjects
                </label>
                <select
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className={`w-full rounded border border-stroke bg-white py-3 px-5 pe-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Select Subject
                  </option>
                  <option value="Math" className="text-body dark:text-bodydark">
                    Math
                  </option>
                  <option
                    value="Biology"
                    className="text-body dark:text-bodydark"
                  >
                    Biology
                  </option>
                  <option
                    value="Business"
                    className="text-body dark:text-bodydark"
                  >
                    Business
                  </option>
                  <option
                    value="Physics"
                    className="text-body dark:text-bodydark"
                  >
                    Physics
                  </option>
                  <option
                    value="Chemistry"
                    className="text-body dark:text-bodydark"
                  >
                    Chemistry
                  </option>
                  <option
                    value="Computer-Science"
                    className="text-body dark:text-bodydark"
                  >
                    Computer-Science
                  </option>
                  <option
                    value="Economics"
                    className="text-body dark:text-bodydark"
                  >
                    Economics
                  </option>
                </select>
              </div>
            )}
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Price (example: 300000)
              </label>
              <input
                type="text"
                placeholder="Enter your course price. Example: 300000"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Period (only numbers) example: 6 months
              </label>
              <input
                type="text"
                placeholder="Enter your course period. Example: 6 (only numbers)"
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
