import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

const AllInfoStudentTeacher = () => {
  const { group_id } = useParams();
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/get/my/users/${group_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversedData = data.Myusers.reverse();
        setTeachers(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [group_id, token]);

  return (
    <DefaultLayoutTeacher>
      <div className="mb-10 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-5 dark:text-white">
          All <span className="underline">Students</span> List
        </h2>
      </div>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        {teachers.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-white dark:bg-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Telegram Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {teachers.map((item: any) => (
                <tr
                  key={item.user_id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {item.name} {item.l_name}
                  </th>
                  <td className="px-6 py-4">{item.username_tg || 'no data'}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.pay_status === 'paid'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.pay_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <NavLink
                      to={`/dashboard/teacher/group/student/id/${item.group_id}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      More
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-full w-full p-3 shadow-xl bg-white">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              You don't have any students in this group
            </p>
          </div>
        )}
      </div>
    </DefaultLayoutTeacher>
  );
};

export default AllInfoStudentTeacher;
