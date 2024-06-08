import React, { useEffect, useState } from 'react';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

function GetAllCompaniesAdmin() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
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

        //    console.log(data);

        const reversedData = data.Company.reverse();

        //    console.log(reversedData);

        setContacts(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <div>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Companies</span> List
        </h2>
        <NavLink
          to="/dashboard/admin/companies/add"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Company
        </NavLink>
      </div>
      <div className="">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-10  lg:grid lg:grid-cols-3 lg:gap-x-6  ">
              {contacts && contacts
                ? contacts.map((blog: any) => (
                    <div
                      key={blog.company_id}
                      className="bg-white p-3 my-5 rounded dark:bg-black"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                          src={`${backurl}upload/${blog.image}`}
                          alt={blog.title}
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                      <h3 className="mt-6 text-3xl text-gray-800">
                        {blog.name}
                      </h3>
                      <h3 className="mt-6 text-xl text-gray-800">
                        {moment(blog.created_at).format('lll')}
                      </h3>
                      <NavLink
                        to={`/dashboard/admin/edit/company/${blog.company_id}`}
                        className="bg-blue-600 px-8 py-1 text-white rounded mt-5 inline-block mb-5 hover:bg-blue-400"
                      >
                        More info
                      </NavLink>
                    </div>
                  ))
                : 'you don`t have any blogs'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAllCompaniesAdmin;
