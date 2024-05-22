import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';

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

export default function AllPaymentsViewStudent() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [data, setData] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/payment/get/student`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //    const allCourse = data.SATCourses;
        console.log(data);

        //    setData(allCourse);

        // console.log(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <>
      <div className="right-0 top-0 mb-10 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Payments</span> List
        </h2>
        <NavLink
          to="/dashboard/student/add/new/payment"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded hover:bg-blue-500 active:bg-blue-400"
        >
          Send new payment chequeee
        </NavLink>
      </div>
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
