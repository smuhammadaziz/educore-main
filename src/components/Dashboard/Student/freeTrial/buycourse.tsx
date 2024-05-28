import React, { FormEvent, useEffect, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

function BuyOneCourseGroupStudent() {
  const [name, setName] = useState('');
  const [main, setMain] = useState('');
  const [cost, setCost] = useState(null);

  const { group_id } = useParams();

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    setName('');
    setMain('');
    setCost(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a form data object
    const formData = new FormData();
    formData.append('card_t', name);
    formData.append('pay_desc', main);
    if (cost) {
      formData.append('image', cost);
    }

    // console.log(formData);

    try {
      const response = await fetch(
        `${backurl}api/payment/student/${group_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      // const result = await response.json();
      // // console.log(result);

      if (response.ok) {
        toast.success('Payment successfully sent', {
          position: 'top-right',
        });
        handleCancel();
      }
    } catch (error: any) {
      console.error('Error submitting the payment', error);
      toast.warning(error.message, {
        position: 'top-right',
      });
    }
  };

  return (
    <DefaultLayoutStudent>
      <ToastContainer></ToastContainer>
      <div className="mb-5 text-left mx-auto text-2xl">
        {' '}
        Sending new <span className="underline">Payment</span>
      </div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="p-6.5">
          <div className="">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Card type
              </label>
              <select
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={`w-full rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Choose Your Card Type
                </option>
                <option value="Humo" className="text-body dark:text-bodydark">
                  Humo
                </option>
                <option value="Uzcard" className="text-body dark:text-bodydark">
                  Uzcard
                </option>
                <option value="Visa" className="text-body dark:text-bodydark">
                  Visa
                </option>
                <option
                  value="Mastercard"
                  className="text-body dark:text-bodydark"
                >
                  Mastercard
                </option>
              </select>
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <input
                type="text"
                placeholder="Enter your desctiption"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={main}
                onChange={(e) => setMain(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Cheque image
              </label>
              <input
                type="file"
                placeholder="Enter your file"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                // value={cost}
                onChange={(e) => setCost(e.target.files[0])}
                required
              />
            </div>
          </div>

          <div className="flex flex-row justify-end mt-20">
            <a
              href="/dashboard/teacher/my/all/groups"
              className="flex w-25 justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
              onClick={handleCancel}
            >
              Cancel
            </a>
            <button
              type="submit"
              className="ms-5 flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </DefaultLayoutStudent>
  );
}

export default BuyOneCourseGroupStudent;
