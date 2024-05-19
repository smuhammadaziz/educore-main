import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';

const products = [
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
  },
];

export default function AllContactFormAdmin() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/admin/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContacts(data.Contacts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <>
      <div className="">
        <h2 className="text-xl">All Contacts list</h2>
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {contacts.map((item) => (
              <div
                key={item.contact_id}
                className="group bg-white p-5 dark:bg-slate-700 dark:text-white "
              >
                <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                  {item.name} <span></span>
                  {item.l_name}
                </h3>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {item.phone}
                </p>
                <p className="mt-1 text-md font-bold text-gray-500 dark:text-white text-right">
                  {item.date}
                </p>
                <NavLink
                  to="/dashboard/admin/contact"
                  className="inline-block mt-5 bg-blue-700 rounded px-5 py-1 text-white text-right"
                >
                  More
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
