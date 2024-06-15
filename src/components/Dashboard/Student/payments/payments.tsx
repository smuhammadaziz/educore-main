import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';

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
        console.log(data);

        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  const filteredData = selectedOption
    ? data.filter((item) =>
        selectedOption === 'all' ? true : item.pay_status === selectedOption,
      )
    : data;

  return (
    <>
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
          <option value="all" className="text-body dark:text-bodydark">
            All
          </option>
          <option value="succesfully" className="text-body dark:text-bodydark">
            Paid
          </option>
          <option value="reject" className="text-body dark:text-bodydark">
            Rejected
          </option>
          <option value="pending" className="text-body dark:text-bodydark">
            Pending
          </option>
        </select>
      </div>
      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {filteredData.map((product: any) => (
              <div
                key={product.payment_id}
                className="group bg-white p-5 dark:bg-slate-700 dark:text-white rounded-xl shadow-xl hover:shadow-2xl"
              >
                <h3 className="mt-4 text-xl text-black dark:text-white">
                  {product.name} <span></span>
                  {product.l_name}
                </h3>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {product.subject}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {product.g_name}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {' '}
                  {product.price
                    .toLocaleString('en-US', { useGrouping: true })
                    .replace(/,/g, ' ')}{' '}
                  UZS
                </p>
                <p className="mt-1 text-md font-bold text-gray-500 dark:text-white text-right">
                  {product.date}
                </p>
                <p className="mt-2 text-md font-medium text-gray-900 dark:text-white text-right">
                  Status:
                  <span
                    className={`ms-2 mt-1 py-1 px-2 rounded-full w-25 text-md font-bold text-white dark:text-white text-center ${
                      product.pay_status === 'succesfully'
                        ? 'bg-green-500'
                        : product.pay_status === 'pending'
                        ? 'bg-yellow-500'
                        : product.pay_status === 'reject'
                        ? 'bg-red-500'
                        : ''
                    }`}
                  >
                    {product.pay_status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
