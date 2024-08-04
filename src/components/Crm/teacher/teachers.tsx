import React from 'react';
import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';

function AllTeachersSodiqAcademy() {
  const teachers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Math',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'English',
      status: 'Inactive',
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      subject: 'Science',
      status: 'Active',
    },
    {
      name: 'Emily Davis',
      email: 'emily@example.com',
      subject: 'History',
      status: 'Active',
    },
    {
      name: 'Michael Brown',
      email: 'michael@example.com',
      subject: 'Geography',
      status: 'Inactive',
    },
    {
      name: 'Alice Williams',
      email: 'alice@example.com',
      subject: 'Art',
      status: 'Active',
    },
    {
      name: 'David Wilson',
      email: 'david@example.com',
      subject: 'Music',
      status: 'Inactive',
    },
  ];

  return (
    <DefaultLayoutSodiqAcademy>
      <div className="">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
            Teachers
          </h1>
          <button className="bg-indigo-800 hover:bg-indigo-900 text-white py-2 px-4 rounded">
            + Add Teacher
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full table-auto ">
            <thead className="">
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="py-4 px-4">{teacher.name}</td>
                  <td className="py-4 px-4">{teacher.email}</td>
                  <td className="py-4 px-4">{teacher.subject}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                        teacher.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 flex flex-col sm:flex-row items-center">
                    <button className="border-2 border-slate-300 font-medium text-black py-1 rounded-lg px-3 mb-2 sm:mb-0 sm:mr-2 hover:scale-105">
                      Edit
                    </button>
                    <button className="border-2 border-slate-300 font-medium text-black py-1 rounded-lg px-3 hover:scale-105">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
