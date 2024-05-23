import React from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { useParams } from 'react-router-dom';

import Img from '../../../../images/brand/qrcode.png';

function UseBuyCOurseStudent() {
  const { course_id } = useParams();
  return (
    <DefaultLayoutStudent>
      <div className="flex justify-between">
        <form action="">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-5 text-xl font-bold">
              Attach your check
            </label>
            <input
              type="file"
              placeholder="enter your check"
              className="w-100 bg-white p-3 dark:bg-black"
            />
          </div>
          <div className="flex flex-col mt-5 mb-5">
            <label htmlFor="" className="mb-5 text-xl font-bold">
              Enter Your Card Type
            </label>
            <select name="" id="" className="p-3 outline-none dark:bg-black">
              <option value="Humo" className="p-3">
                Humo
              </option>
              <option value="Uzcard" className="p-3">
                UzCard
              </option>
              <option value="Visa" className="p-3">
                Visa
              </option>
              <option value="Mastercard" className="p-3">
                MasterCard
              </option>
            </select>
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="" className="mb-5 text-xl font-bold">
              Enter some description
            </label>
            <textarea
              cols="0"
              rows="4"
              className="w-100 p-2 outline-none dark:bg-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 py-3 px-10 text-white rounded mt-10"
          >
            Submit
          </button>
        </form>
        <div className="mx-auto text-center">
          <h2 className="text-xl mb-5">
            Pay here and send check from this form
          </h2>
          <img
            src={Img}
            alt="QR code for payment"
            width="300"
            className="mx-auto"
          />
          <p className="font-bold mt-5">
            8600 0000 1111 2222{' '}
            <span className="ms-6 font-bold text-lg">Humo Card</span>
          </p>

          <p className="font-bold text-lg">Jhon Doe</p>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
}

export default UseBuyCOurseStudent;
