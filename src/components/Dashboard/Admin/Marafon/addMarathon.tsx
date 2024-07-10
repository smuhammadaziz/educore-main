import React, { FormEvent, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';

import { useEffect, useRef } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddingMarathonAdmin() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  //   const [m_days, setMdays] = useState('');
  const [m_start, setMstart] = useState('');
  const [m_end, setMend] = useState('');
  const [m_period, setMperiod] = useState('');
  const [user_id, setUserid] = useState('');
  const [photo, setPhoto] = useState(null);

  const [in1, setIn1] = useState('');
  const [in2, setIn2] = useState('');
  const [in3, setIn3] = useState('');

  const m_days = `${in1} - ${in2} ${in3}`;

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    setName('');
    setDesc('');
    setMstart('');
    setMend('');
    setMperiod('');
    setUserid('');
    setPhoto(null);

    setIn1('');
    setIn2('');
    setIn3('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', name);
    formData.append('descr', desc);
    formData.append('m_days', m_days);
    formData.append('m_start', m_start);
    formData.append('m_end', m_end);
    formData.append('m_period', m_period);
    formData.append('user_id', user_id);
    if (photo) {
      formData.append('image', photo);
    }

    // console.log(formData);

    try {
      const response = await fetch(`${backurl}api/admin/add/maraphone`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      //  const data = await response.json();
      //  console.log(data);

      if (response.ok) {
        toast.success('Company successfully added', {
          position: 'top-right',
        });
        handleCancel();
      }
    } catch (error: any) {
      console.error('Error submitting the form', error);
      toast.warning(error.message, {
        position: 'top-right',
      });
    }
  };

  const [teachers, setTeachers] = useState([]);

  // const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/admin/get/teachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversedData = data.message;

        // console.log(reversedData);

        setTeachers(reversedData.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <DefaultLayoutAdmin>
      <ToastContainer></ToastContainer>
      <div className="mb-5 text-left mx-auto text-2xl">
        {' '}
        Adding new <span className="underline">marathon</span>
      </div>

      <div></div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="">
          <div className="">
            <div className="flex justify-between mb-4.5 md:w-2/3">
              <div className="w-full mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mb-4.5 md:w-2/3">
              <div className="w-full mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mb-4.5 md:w-2/3">
              <div className="mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Start Date
                </label>
                <input
                  type="text"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={in1}
                  onChange={(e) => setIn1(e.target.value)}
                  required
                />
              </div>
              <div className="mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  End Date
                </label>
                <input
                  type="text"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={in2}
                  onChange={(e) => setIn2(e.target.value)}
                  required
                />
              </div>
              <div className="mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Month
                </label>
                <input
                  type="text"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={in3}
                  onChange={(e) => setIn3(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mb-4.5 md:w-2/3">
              <div className="mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Lesson start time
                </label>
                <input
                  type="text"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={m_start}
                  onChange={(e) => setMstart(e.target.value)}
                  required
                />
              </div>
              <div className="mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Lesson end time
                </label>
                <input
                  type="text"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={m_end}
                  onChange={(e) => setMend(e.target.value)}
                  required
                />
              </div>
              <div className="mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Marathon period
                </label>
                <input
                  type="number"
                  placeholder="type here ..."
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={m_period}
                  onChange={(e) => setMperiod(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mb-4.5 md:w-2/3">
              <div className="w-full mx-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select a teacher
                </label>

                <select
                  // name=""
                  // id=""
                  value={user_id}
                  onChange={(e) => setUserid(e.target.value)}
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option disabled>Select teacher</option>
                  {teachers.map((teacher: any) => (
                    <option key={teacher.user_id} value={teacher.user_id}>
                      {teacher.name} {teacher.l_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4.5 md:w-2/3 px-2">
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
              href="/dashboard/marathon"
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
    </DefaultLayoutAdmin>
  );
}

export default AddingMarathonAdmin;
