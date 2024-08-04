import React, { useEffect, useState } from 'react';
import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import backurl from '../../../links';
import { NavLink } from 'react-router-dom';
// import 'tailwindcss/tailwind.css'; // Make sure Tailwind CSS is imported

function SelectCompanyPageSodiq() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/cadmin/get/company`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data);

        //    const reversedData = data.reverse();

        //    console.log(reversedData);

        setContacts(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <DefaultLayoutSodiqAcademy>
      <div className="max-w-2xl  flex flex-row items-center bg-white shadow-md rounded-lg">
        <div className="bg-blue-100 p-4 rounded-lg rounded-e-none">
          <img
            src={`${backurl}upload/${contacts.image}`}
            alt={contacts.title}
            className="h-60 w-75  object-cover rounded object-center"
          />
        </div>
        <div className="py-4 px-6 ">
          <p className="text-gray-600">Company</p>
          <h2 className="text-xl font-bold">{contacts.name || ''}</h2>
          <div className="mt-4">
            <p className="font-semibold">Price plan:</p>
            <p className="text-gray-700 w-20 text-center text-white rounded-lg bg-red-400 p-1 font-bold">
              {contacts.rate || ''}
            </p>
          </div>
          <div className="mt-6 flex">
            <NavLink
              to={`/dashboard/sodiq-academy/teachers/${contacts.company_id}`}
              className="px-4 py-2 font-medium bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              View teachers list
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutSodiqAcademy>
  );
}

export default SelectCompanyPageSodiq;
