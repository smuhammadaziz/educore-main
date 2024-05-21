import React, { ChangeEvent, FormEvent, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

interface FormData {
  emaill: string;
  passwordd: string;
  rolee: string;
  namee: string;
  l_namee: string;
  agee: string;
  ratingg: string;
  main_subjectt: string;
  username_tgg: string;
  phonee: string;
}

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backurl from '../../../../links';

function AddnewteacherAdmin() {
  const [formData, setFormData] = useState<FormData>({
    emaill: '',
    passwordd: '',
    rolee: 'teacher',
    namee: '',
    l_namee: '',
    agee: '',
    ratingg: '',
    main_subjectt: '',
    username_tgg: '',
    phonee: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email: formData.emaill,
      password: formData.passwordd,
      role: formData.rolee,
      name: formData.namee,
      l_name: formData.l_namee,
      age: formData.agee,
      rating: formData.ratingg,
      main_subject: formData.main_subjectt,
      username_tg: formData.username_tgg,
      phone: formData.phonee,
    };

    const token = localStorage.getItem('TOKEN');

    try {
      const response = await fetch(`${backurl}/api/admin/add/teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }

      const result = await response.json();

      console.log(result);

      setFormData({
        emaill: '',
        passwordd: '',
        rolee: '',
        namee: '',
        l_namee: '',
        agee: '',
        ratingg: '',
        main_subjectt: '',
        username_tgg: '',
        phonee: '',
      });

      toast.success('Teacher successfully added', {
        position: 'top-right',
      });
    } catch (error: any) {
      toast.warning(error.message, {
        position: 'top-right',
      });
    }
  };
  return (
    <DefaultLayoutAdmin>
      <ToastContainer></ToastContainer>
      <div className="mb-5 text-center mx-auto text-2xl">
        {' '}
        Adding new <span className="underline">teacher</span>
      </div>
      <form action="#" className="dark:text-white" onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Email
              </label>
              <input
                type="text"
                name="emaill"
                value={formData.emaill}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="passwordd"
                value={formData.passwordd}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Role
              </label>
              <input
                type="text"
                name="rolee"
                value={`${`teacher` || formData.rolee}`}
                // readOnly
                // value={formData.email}
                onChange={handleChange}
                placeholder="Enter your role"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="namee"
                value={formData.namee}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                name="l_namee"
                value={formData.l_namee}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Age
              </label>
              <input
                type="text"
                name="agee"
                value={formData.agee}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Main Subject
              </label>
              <input
                type="text"
                name="main_subjectt"
                value={formData.main_subjectt}
                onChange={handleChange}
                placeholder="Enter your main subject"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Rating
              </label>
              <input
                type="text"
                name="ratingg"
                value={formData.ratingg}
                onChange={handleChange}
                placeholder="Enter your rating"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Telegram username
              </label>
              <input
                type="text"
                name="username_tgg"
                value={formData.username_tgg}
                onChange={handleChange}
                placeholder="Enter your telegram username"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                name="phonee"
                value={formData.phonee}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-row justify-end mt-20">
            <a
              href="/dashboard/teachers"
              className="flex w-25 justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Cancel
            </a>
            <button
              // href="/dashboard/teachers"
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

export default AddnewteacherAdmin;
