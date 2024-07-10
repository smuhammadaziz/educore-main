import React, { useEffect, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

import { MdAddCircle } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';
import { HiViewGridAdd } from 'react-icons/hi';

import { TbVideo } from 'react-icons/tb';

function AllLessonMarathonTeacher() {
  const [contact, setContact] = useState([]);
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
  }, []);

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          localStorage.removeItem('TOKEN');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const userId = data.Profil.user_id;

        setProfileData(userId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayoutTeacher>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          All Marathon <span className="underline">Lessons</span>
        </h2>
        {contact.user_id === profileData && (
          <NavLink
            to={`/dashboard/teacher/add/new/marathon/lesson/${maraphone_id}`}
            className="text-sm py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
          >
            Add new lesson
          </NavLink>
        )}
      </div>
      <div className="lg:w-3/4 px-0 py-16 sm:px-6 sm:py-24 lg:py-0 lg:px-0 mt-15">
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-3 md:p-6 mb-8">
          <h2 className="text-3xl dark:text-white mt-3 text-black font-bold italic uppercase text-center md:text-left">
            All Lessons
          </h2>
          <hr className="my-2 mt-4" />
          <h2 className="text-xl flex flex-col text-black uppercase font-semibold mb-4 text-gray-800 dark:text-white py-2 text-center md:text-left">
            {contact.title}

            <span>
              {contact.m_start} - {contact.m_end}
            </span>
          </h2>
          <div className="space-y-4">
            {contacts && contacts.length ? (
              contacts.map((product: any) => (
                <NavLink
                  to={`/dashboard/teacher/marathon/lesson/${product.maraphonel_id}`}
                  key={product.maraphonel_id}
                  className={`flex items-center text-black border border-slate-100 dark:border-slate-900 dark:hover:bg-slate-900 justify-between p-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg hover:bg-slate-100`}
                >
                  <div className="flex items-center">
                    <button className="bg-blue-500 p-2 rounded-full text-white">
                      <TbVideo size={20} />
                    </button>
                    <div className="ml-2 text-gray-800 dark:text-white">
                      <p className="text-sm md:text-lg font-medium">
                        {product.title}
                      </p>
                      <p className="text-sm">{product.l_desc}</p>
                    </div>
                  </div>
                  <div
                    className={`ms-2 mt-1 py-1 px-2 rounded-full w-20 md:w-25 text-md font-bold text-white dark:text-white text-center ${
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
    </DefaultLayoutTeacher>
  );
}

export default AllLessonMarathonTeacher;
