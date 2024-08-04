import React, { useEffect, useState } from 'react';
import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../links';

function AllTeachersSodiqAcademy() {
  const [contact, setContact] = useState([]);

  const token = localStorage.getItem('TOKEN');
  const { company_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${backurl}api/cadmin/get/teacher/${company_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        setContact(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, [company_id, token]);

  return (
    <DefaultLayoutSodiqAcademy>
      <div className="">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
            Teachers
          </h1>
          <NavLink
            to={`/dashboard/sodiq-academy/teacher/add/${company_id}`}
            className="bg-indigo-800 hover:bg-indigo-900 text-white py-2 px-4 rounded"
          >
            + Add Teacher
          </NavLink>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full table-auto ">
            <thead className="">
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contact.length > 0 ? (
                contact.map((teacher: any, index) => (
                  <tr key={teacher.user_id} className="hover:bg-slate-50">
                    <td className="py-4 px-4">{index + 1}</td>
                    <td className="py-4 px-4">
                      {teacher.name} {teacher.l_name}
                    </td>
                    <td className="py-4 px-4">{teacher.email}</td>
                    <td className="py-4 px-4">{teacher.phone}</td>
                    <td className="py-4 px-4">
                      {/* <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          teacher.status === 'active'
                            ? 'bg-green-200 text-black'
                            : 'bg-red-200 text-black'
                        }`}
                      >
                        {teacher.status}
                      </span> */}
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-200 text-black`}
                      >
                        active
                      </span>
                    </td>
                    <td className="py-4 px-4 flex flex-col sm:flex-row items-center">
                      <button className="border-2 border-slate-300 font-medium text-black py-1 rounded-lg px-3 mb-2 sm:mb-0 sm:mr-2 hover:scale-105">
                        Edit
                      </button>
                      {/* <button className="border-2 border-slate-300 font-medium text-black py-1 rounded-lg px-3 hover:scale-105 sm:mr-2">
                        Delete
                      </button> */}
                      <button className="border-2 border-slate-300 font-medium text-black py-1 rounded-lg px-3 hover:scale-105">
                        More
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-center">
                    Don't have any teachers
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination section (commented out) */}
        {/* <div className="flex items-center justify-end mt-4">
          <button className="px-3 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 mr-2">
            &lt; Previous
          </button>
          <button className="px-3 py-1 rounded text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 mr-2">
            1
          </button>
          <button className="px-3 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 mr-2">
            2
          </button>
          <button className="px-3 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 mr-2">
            3
          </button>
          <button className="px-3 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-100">
            Next &gt;
          </button>
        </div> */}
      </div>
    </DefaultLayoutSodiqAcademy>
  );
}

export default AllTeachersSodiqAcademy;
