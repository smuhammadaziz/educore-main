import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    status: 'pending',
    group_name: '112 | IELTS GROUP',
    subject: 'IELTS',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
    price: '120.000 UZS',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    status: 'successful',
    group_name: '112 | IELTS GROUP',
    subject: 'IELTS',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
    price: '120.000 UZS',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    status: 'pending',
    group_name: '112 | IELTS GROUP',
    subject: 'IELTS',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
    price: '120.000 UZS',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    status: 'pending',
    group_name: '112 | IELTS GROUP',
    subject: 'IELTS',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
    price: '120.000 UZS',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    status: 'rejected',
    group_name: '112 | IELTS GROUP',
    subject: 'IELTS',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
    price: '120.000 UZS',
  },
  {
    id: 1,
    name: 'Sardor',
    l_name: 'Sardorov',
    email: 'email@gmail.com',
    phone: '+998900222222',
    status: 'successful',
    group_name: '112 | IELTS GROUP',
    subject: 'IELTS',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
    date: '25.10.2024',
    price: '120.000 UZS',
  },
];

export default function AllPaymentsListTeacher() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  return (
    <>
      <h2 className="text-xl">All Contacts list</h2>
      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`w-full rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select status
          </option>
          <option value="USA" className="text-body dark:text-bodydark">
            Successful
          </option>
          <option value="UK" className="text-body dark:text-bodydark">
            Rejected
          </option>
          <option value="Canada" className="text-body dark:text-bodydark">
            Pending
          </option>
        </select>
      </div>
      <div className="">
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
                  {product.subject}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {product.price}
                </p>
                <p className="mt-1 text-md font-bold text-gray-500 dark:text-white text-right">
                  {product.date}
                </p>
                <p className="mt-2 text-md font-medium text-gray-900 dark:text-white text-right">
                  Status:
                  <span
                    className={`ms-2 mt-1 py-1 px-2 rounded-full w-25 text-md font-bold text-white dark:text-white text-center ${
                      product.status === 'successful'
                        ? 'bg-green-500'
                        : product.status === 'pending'
                        ? 'bg-yellow-500'
                        : product.status === 'rejected'
                        ? 'bg-red-500'
                        : ''
                    }`}
                  >
                    {product.status}
                  </span>
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
