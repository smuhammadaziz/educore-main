import React, { useEffect, useState } from 'react';

import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../links';
import moment from 'moment';

function AllNotificationsSodiq() {
  const [contact, setContact] = useState([]);

  const token = localStorage.getItem('TOKEN');
  const { company_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(`${backurl}api/cadmin/get/notefs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Inbox</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {contact.length > 0 ? (
            contact.map((message: any) => (
              <div
                key={message.notef_id}
                className={`group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl rounded-lg hover:shadow-2xl`}
              >
                {/* <div className="mb-5">
                  {message.free_trial ? (
                    <SlFire size={25} />
                  ) : (
                    <PiContactlessPaymentBold size={25} />
                  )}
                </div> */}
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-white">
                    {message.name} {message.l_name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {moment(message.created_at).fromNow()}
                  </span>
                </div>
                <div className="flex flex-row items-center mt-2">
                  <p
                    className={`mt-1 text-sm font-bold uppercase text-gray-500 inline-block text-white p-1 px-2 rounded my-2 ${
                      message.status === 'checked'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {message.status}
                  </p>
                  <p
                    className={`ms-3 mt-1 font-bold uppercase text-sm text-gray-500 inline-block text-white p-1 rounded my-2 ${
                      message.free_trial ? 'bg-blue-500' : 'bg-blue-500'
                    }`}
                  >
                    {message.free_trial ? 'free trial' : 'paid'}
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {moment(message.created_at).format('LT')},{' '}
                  {moment(message.created_at).format('l')}
                </p>
                <NavLink
                  to={`/dashboard/sodiq-academy/notifications/${message.notef_id}`}
                  className="text-center items-center block w-full text-white mt-5 inline-block bg-blue-600 hover:bg-blue-800 py-2 px-5 rounded-full"
                >
                  View
                </NavLink>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full col-span-full">
              <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
                <p className="text-xl font-medium text-gray-700 dark:text-white">
                  You don't have any new notifications yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayoutSodiqAcademy>
  );
}

export default AllNotificationsSodiq;
