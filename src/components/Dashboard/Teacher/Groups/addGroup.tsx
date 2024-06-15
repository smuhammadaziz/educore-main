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

    const formData = new FormData();
    formData.append('g_name', name);
    formData.append('l_days', description);
    formData.append('u_count', main);
    formData.append('subj_start', cost);
    formData.append('subj_end', time);

    try {
      const response = await fetch(`${backurl}api/add/group/${course_id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Group successfully added', {
          position: 'top-right',
        });
      }

      if (!response.ok) {
        toast.error(data.message, {
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
      <ToastContainer />
      <div className="container mx-auto p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Adding new <span className="underline">Group</span>
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:bg-strokedark"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Your Group name
              </label>
              <input
                type="text"
                placeholder="Enter your title"
                className="w-full bg-white dark:bg-gray-700 dark:bg-strokedark dark:text-white rounded border border-stone-300 dark:border-stone-600 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                What days does your class take place?
              </label>
              <select
                name="courses"
                id="courses"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 dark:bg-strokedark dark:text-white rounded border border-stone-300 dark:border-stone-600 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>
                  Select days
                </option>
                <option value="couple">Couple</option>
                <option value="odd">Odd</option>
                <option value="everyday">Everyday</option>
                <option value="weekends">Weekends</option>
                <option value="work_days">Work Days</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Your Group's maximum student limit (only number)
              </label>
              <input
                type="text"
                placeholder="Enter your maximum student limit"
                className="w-full bg-white dark:bg-gray-700 dark:bg-strokedark dark:text-white rounded border border-stone-300 dark:border-stone-600 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                value={main}
                onChange={(e) => setMain(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Lesson Start Time (only number) example: 13:00
              </label>
              <input
                type="text"
                placeholder="Enter your lesson time (only numbers) example: 13:00"
                className="w-full bg-white dark:bg-gray-700 dark:bg-strokedark dark:text-white rounded border border-stone-300 dark:border-stone-600 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Lesson End Time (only number) example: 14:30
              </label>
              <input
                type="text"
                placeholder="Enter your lesson time (only numbers) example: 14:30"
                className="w-full bg-white dark:bg-strokedark dark:text-white dark:bg-gray-700 rounded border border-stone-300 dark:border-stone-600 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <a
              href="/dashboard/teacher/my/courses"
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
              onClick={handleCancel}
            >
              Cancel
            </a>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AddNewGroupTeacher;
