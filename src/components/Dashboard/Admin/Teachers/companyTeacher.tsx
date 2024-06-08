import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

function CompanySelectTeacherCreateAdmin() {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch(`${backurl}api/admin/get/company`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversedData = data.Company.reverse();
        setContacts(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCompanies();
  }, []);

  return (
    <DefaultLayoutAdmin>
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Choose company or select Individual person
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-24 lg:py-32">
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative overflow-hidden rounded-lg bg-white h-48 mb-4">
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png"
                  alt="image"
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-gray-100">
                Individual Person
              </h3>
              <div className="mt-10 flex justify-center">
                <NavLink
                  to="/dashboard/admin/add/new/teacher/individual"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  Select this
                </NavLink>
              </div>
            </div>

            {contacts && contacts.length > 0 ? (
              contacts.map((company: any) => (
                <div
                  key={company.company_id}
                  className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800"
                >
                  <div className="relative overflow-hidden rounded-lg bg-white h-48 mb-4">
                    <img
                      src={`${backurl}upload/${company.image}`}
                      alt={company.name}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-gray-100">
                    {company.name}
                  </h3>
                  <div className="mt-10 flex justify-center">
                    <NavLink
                      to={`/dashboard/admin/add/new/teacher/${company.company_id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Select this
                    </NavLink>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                You don't have any companies.
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default CompanySelectTeacherCreateAdmin;
