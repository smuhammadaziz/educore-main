import { NavLink } from 'react-router-dom';
import { useState } from 'react';

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
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
  },
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
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  return (
    <>
      <div className="">
        <h2 className="text-xl">All Contacts list</h2>
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <a
                key={product.id}
                href="#"
                className="group bg-white p-5 dark:bg-slate-700 dark:text-white "
              >
                <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                  {product.name} <span></span>
                  {product.l_name}
                </h3>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {product.phone}
                </p>
                <p className="mt-1 text-md font-bold text-gray-500 dark:text-white text-right">
                  {product.date}
                </p>
                <NavLink
                  to="/dashboard/admin/contact"
                  className="inline-block mt-5 bg-blue-700 rounded px-5 py-1 text-white text-right"
                >
                  More
                </NavLink>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
