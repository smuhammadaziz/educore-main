import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';
import moment from 'moment';

function GetAllHomeworksTeacher() {
  const [homeworks, setHomeworks] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}api/get/homeworks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.Data;

        setHomeworks(reversed.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <DefaultLayoutTeacher>
      <div>
        <h2 className="text-3xl text-center font-bold dark:text-white">
          All Homeworks list
        </h2>
      </div>
      <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {homeworks.map((homework: any) => (
            <div
              key={homework.homework_id}
              className="group bg-white p-5 dark:bg-slate-700 dark:text-white shadow-xl rounded"
            >
              <h3 className="mt-4 text-xl text-gray-700 dark:text-white font-bold">
                {homework.title}
              </h3>
              <hr className="my-4" />
              <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                {homework.h_desc}
              </p>
              <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                Created time: {moment(homework.created_at).format('LT')},{' '}
                {moment(homework.created_at).format('l')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetAllHomeworksTeacher;
