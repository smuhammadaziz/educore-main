import React, { ChangeEvent, FormEvent, useState } from 'react';
import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';

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
  id: any;
}

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import backurl from '../../../links';
function AddNewTeacherForSodiq() {
  const { company_id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    emaill: '',
    passwordd: '',
    rolee: 'teacher',
    namee: '',
    l_namee: '',
    agee: '15',
    ratingg: '4.8',
    main_subjectt: '',
    username_tgg: 'username',
    phonee: '+99890000000',
    id: company_id == 'individual' ? null : company_id,
  });

  // console.log(company_id);

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
      id: company_id == 'individual' ? null : company_id,
    };

    const token = localStorage.getItem('TOKEN');

    try {
      const response = await fetch(`${backurl}/api/cadmin/add/teacher`, {
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

      // console.log(result);

      setFormData({
        emaill: '',
        passwordd: '',
        rolee: 'teacher',
        namee: '',
        l_namee: '',
        agee: '15',
        ratingg: '4.8',
        main_subjectt: '',
        username_tgg: 'username',
        phonee: '+9980000000',
        id: company_id == 'individual' ? null : company_id,
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
    <DefaultLayoutSodiqAcademy>
      <ToastContainer></ToastContainer>
      <div>
        <form action="#" className="dark:text-white" onSubmit={handleSubmit}>
          <div className="">
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
            </div>

            <div className="flex flex-row justify-end mt-20">
              <a
                href="/dashboard/sodiq-academy/teachers"
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
      </div>
    </DefaultLayoutSodiqAcademy>
  );
}

export default AddNewTeacherForSodiq;
