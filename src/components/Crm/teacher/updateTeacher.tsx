import React, { useEffect, useState } from 'react';
import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import { useParams } from 'react-router-dom';
import backurl from '../../../links';

function UpdateTeacherSodiq() {
  const [contact, setContact] = useState([]);

  const token = localStorage.getItem('TOKEN');
  const { user_id } = useParams();

  //   useEffect(() => {
  //     async function fetchContact() {
  //       try {
  //         const response = await fetch(
  //           `${backurl}api/admin/get/teacher/by${user_id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           },
  //         );
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const data = await response.json();
  //         console.log(data);

  //         setContact(data.message);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     fetchContact();
  //   }, [user_id, token]);

  return (
    <DefaultLayoutSodiqAcademy>
      <div className="my-5">Update teacher email</div>

      <form action="#" className="dark:text-white">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-4.5 md:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Email
            </label>
            <input
              type="text"
              name="emaill"
              //     value={formData.emaill}
              //     onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
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
              Update
            </button>
          </div>
        </div>
      </form>
    </DefaultLayoutSodiqAcademy>
  );
}

export default UpdateTeacherSodiq;
