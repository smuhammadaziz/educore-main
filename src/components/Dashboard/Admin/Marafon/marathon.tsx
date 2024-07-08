import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import { NavLink } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

function MarathonAdmin() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/admin/get/all/maraphone`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data);

        const reversedData = data.message.reverse();

        //    console.log(reversedData);

        setContacts(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <DefaultLayoutAdmin>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Marathons</span>
        </h2>
        <NavLink
          to="/dashboard/admin/add/new/marathon"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new marathon
        </NavLink>
      </div>
      <div className="">
        <div className="mx-auto">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-10  lg:grid lg:grid-cols-3 lg:gap-x-6  ">
              {contacts && contacts
                ? contacts.map((blog: any) => (
                    <div
                      key={blog.maraphone_id}
                      className="bg-white p-3 my-5 rounded dark:bg-black"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                          src={`${backurl}upload/${blog.image}`}
                          alt={blog.title}
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                      <h3 className="mt-6 text-xl text-gray-800">
                        Title: {blog.title}
                      </h3>
                      <h3 className="mt-6 text-xl text-gray-800">
                        Description: {blog.descr}
                      </h3>
                      <h3 className="mt-6 text-xl text-gray-800">
                        Short Info: {blog.m_days}
                      </h3>
                      <h3 className="mt-6 text-xl text-gray-800">
                        Lesson time: {blog.m_start}:00 - {blog.m_end}:00
                      </h3>
                      <h3 className="mt-6 text-xl text-gray-800">
                        Period: {blog.m_period} days
                      </h3>
                      <h3 className="mt-6 text-xl text-gray-800">
                        Teacher email: {blog.email}
                      </h3>
                      <h3 className="mt-6 text-xl text-gray-800">
                        Created: {moment(blog.created_at).format('lll')}
                      </h3>
                      <NavLink
                        to={`/dashboard/admin/edit/marathon/${blog.maraphone_id}`}
                        className="bg-blue-600 px-8 py-1 text-white rounded mt-5 inline-block mb-5 hover:bg-blue-800"
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
    </DefaultLayoutAdmin>
  );
}

export default MarathonAdmin;
