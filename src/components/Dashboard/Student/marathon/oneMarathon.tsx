import React, { useEffect, useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';
import { CgDetailsMore } from 'react-icons/cg';
import { HiViewGridAdd } from 'react-icons/hi';
import { TbVideo } from 'react-icons/tb';

function OneMarathonStudent() {
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');
  const { maraphone_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${backurl}api/admin/get/maraphone/${maraphone_id}`,
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
        setContact(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, [maraphone_id, token]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}api/get/all/maraphone/lesson/${maraphone_id}`,
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
        const reversedData = data.message.reverse();
        setContacts(reversedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [maraphone_id, token]);

  //   console.log(contacts);

  return (
    <DefaultLayoutStudent>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-1/4 h-full lg:sticky lg:top-0 bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 mb-8 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Marathon Details
          </h2>
          <div className="text-gray-700 dark:text-white mb-2">
            <img
              src={`${backurl}upload/${contact.image}`}
              alt={contact.title}
              className="h-full w-full object-cover rounded"
            />
          </div>
          <div className="text-gray-700 dark:text-white mb-2">
            <h3 className="text-xl font-bold">Title:</h3>
            <p className="text-lg">{contact.title}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-2">
            <h3 className="text-xl font-bold">Descriptions:</h3>
            <p className="text-lg">{contact.descr || 'N/A'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-2">
            <h3 className="text-xl font-bold">Short info:</h3>
            <p className="text-lg">{contact.m_days || 'N/A'}</p>
          </div>
          <div className="text-gray-700 dark:text-white mb-2">
            <h3 className="text-xl font-bold">Lesson time:</h3>
            <p className="text-lg">
              {contact.m_start || 'N/A'} - {contact.m_end || 'N/A'}
            </p>
          </div>
          <div className="text-gray-700 dark:text-white mb-2">
            <h3 className="text-xl font-bold">Marathon period:</h3>
            <p className="text-lg">{contact.m_period || 'N/A'} days</p>
          </div>
        </div>

        <div className="lg:w-3/4 px-0 py-16 sm:px-6 sm:py-24 lg:py-0 lg:px-0">
          <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-3 md:p-6 mb-8">
            <h2 className="text-xl uppercase font-semibold mb-4 text-gray-800 dark:text-white py-2 text-center md:text-left">
              {contact.title}
            </h2>
            <div className="space-y-4">
              {contacts && contacts.length ? (
                contacts.map((product: any) => (
                  <NavLink
                    to={
                      product.process_m === 'active'
                        ? `/dashboard/student/marathon/lesson/${product.maraphonel_id}`
                        : '#'
                    }
                    key={product.maraphonel_id}
                    className={`flex items-center border border-slate-100 justify-between p-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg ${
                      product.process_m === 'active'
                        ? 'hover:bg-slate-100'
                        : 'cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <button className="bg-blue-500 p-2 rounded-full text-white">
                        <TbVideo size={20} />
                      </button>
                      <div className="ml-2 text-gray-800 dark:text-white">
                        <p className="text-lg font-medium">{product.title}</p>
                        <p className="text-sm">{product.l_desc}</p>
                      </div>
                    </div>
                    <div
                      className={`ms-2 mt-1 py-1 px-2 rounded-full w-25 text-md font-bold text-white dark:text-white text-center ${
                        product.process_m === 'active'
                          ? 'bg-green-600'
                          : product.process_m === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {product.process_m}
                    </div>
                  </NavLink>
                ))
              ) : (
                <div>
                  <p>You don't have any lessons</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
}

export default OneMarathonStudent;
