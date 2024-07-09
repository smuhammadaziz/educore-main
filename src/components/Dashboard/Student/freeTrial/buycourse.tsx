import React, { FormEvent, useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useParams } from 'react-router-dom';

import click from '../../../../images/payment/photo_2024-06-04_22-36-43.jpg';
import payme from '../../../../images/payment/photo_2024-06-04_22-40-26.jpg';

function BuyOneCourseGroupStudent() {
  const [name, setName] = useState('');
  const [main, setMain] = useState('');
  const [cost, setCost] = useState(null);
  const [fileName, setFileName] = useState('');

  const { group_id } = useParams();

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    setName('');
    setMain('');
    setCost(null);
    setFileName('');
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
      <div className="mb-5 text-left mx-auto text-2xl text-center">
        Sending new <span className="underline">Payment</span>
      </div>
      <div>
        <div className="px-4 sm:px-6 lg:px-8 py-8 dark:text-white">
          <h2 className="text-center text-2xl font-bold text-black mb-8 dark:text-white">
            Choose your payment method:
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8">
            <div className="m-5 flex-1 max-w-xs">
              <img
                src={payme}
                alt="payme qr code"
                className="w-full h-auto object-contain mb-4 rounded-lg shadow-lg"
              />
              <p className="text-center text-xl font-bold text-black dark:text-white">
                Payme
              </p>
            </div>
            <div className="m-5 flex-1 max-w-xs">
              <img
                src={click}
                alt="click qr code"
                className="w-full h-auto object-contain mb-4 rounded-lg shadow-lg"
              />
              <p className="text-center text-xl font-bold text-black dark:text-white">
                Click
              </p>
            </div>
          </div>
          <div className="mt-8 mx-auto text-center">
            <h2 className="text-black text-xl mb-2 dark:text-white">
              If you don't have payment methods, send your payment to this card:
            </h2>
            <h2 className="text-black text-xl font-bold dark:text-white">
              9860 1901 0282 1880
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dark:text-white ">
          <div className="p-6.5 mx-auto block justify-center">
            <div className="mx-auto block justify-center">
              <div className="mb-4.5 md:w-1/2 px-2 mx-auto block justify-center">
                <label className="mb-2.5 block text-black dark:text-white">
                  Payment Method
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
                    Choose Your Payment Method
                  </option>
                  <option
                    value="Click"
                    className="text-body dark:text-bodydark"
                  >
                    Click
                  </option>
                  <option
                    value="Payme"
                    className="text-body dark:text-bodydark"
                  >
                    Payme
                  </option>
                  <option value="Uzum" className="text-body dark:text-bodydark">
                    Uzum
                  </option>
                  <option
                    value="Zoomrad"
                    className="text-body dark:text-bodydark"
                  >
                    Zoomrad
                  </option>
                </select>
              </div>
              <div className="mb-4.5 md:w-1/2 px-2 mx-auto block justify-center">
                <label className="mb-2.5 block text-black dark:text-white">
                  Short information of your payment. Example: your course name
                  and payment cost
                </label>
                <textarea
                  rows={5}
                  value={main}
                  onChange={(e) => setMain(e.target.value)}
                  required
                  placeholder="Enter description"
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <div className="mb-4.5 md:w-1/2 px-2 mx-auto block justify-center">
                <label className="mb-2.5 block text-black dark:text-white">
                  Cheque image
                </label>
                <input
                  type="file"
                  placeholder="Enter your file"
                  className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => {
                    setCost(e.target.files[0]);
                  }}
                  required
                />
                {fileName && <p className="text-sm mt-2">{fileName}</p>}
              </div>
            </div>

            <div className="flex flex-row justify-end mt-20 mx-auto block justify-center">
              <NavLink
                to="/dashboard/student/courses"
                className="flex w-25 justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
                onClick={handleCancel}
              >
                Cancel
              </NavLink>
              <button
                type="submit"
                className="ms-5 flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayoutStudent>
  );
}

export default BuyOneCourseGroupStudent;
