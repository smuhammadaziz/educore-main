import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import backurl from '../../../../links';

const AddTeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchTeachers() {
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
        setTeachers(reversedData.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <>
      <div className="right-0 top-0 mb-10 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Teachers</span> List
        </h2>
        <NavLink
          to="/dashboard/admin/add/new/teacher"
          className="text-sm py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Teacher
        </NavLink>

        <h2 className="text-2xl mb-5 mt-5">
          Number of teachers:{' '}
          <span className="font-bold">{teachers.length}</span>
        </h2>
      </div>
      <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Main Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((item, index) => (
              <tr
                key={item.user_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                  {index + 1}
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                >
                  {item.name} {item.l_name}
                </th>
                <td className="px-6 py-4 text-black">{item.main_subject}</td>
                <td className="px-6 py-4 text-black">{item.email}</td>
                <td className="px-6 py-4 text-black">{item.phone}</td>
                <td className="px-6 py-4 text-right">
                  <NavLink
                    to={`/dashboard/admin/teacher/${item.user_id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    more
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddTeachersList;
