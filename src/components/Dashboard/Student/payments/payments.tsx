import { useEffect, useState } from 'react';
import backurl from '../../../../links';

export default function AllPaymentsViewStudent() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [data, setData] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchPayments() {
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
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPayments();
  }, []);

  const filteredData = selectedOption
    ? data.filter((item: any) =>
        selectedOption === 'all' ? true : item.pay_status === selectedOption,
      )
    : data;

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`w-full rounded-md border border-gray-300 bg-white py-3 px-4 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
            isOptionSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500'
          }`}
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="all">All</option>
          <option value="succesfully">Paid</option>
          <option value="reject">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="mt-10">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.length > 0 ? (
              filteredData.map((product: any) => (
                <div
                  key={product.payment_id}
                  className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {product.name} {product.l_name}
                    </h3>
                    <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
                      {product.subject}
                    </p>
                    <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
                      {product.g_name}
                    </p>
                    <p className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                      {product.price
                        .toLocaleString('en-US', { useGrouping: true })
                        .replace(/,/g, ' ')}{' '}
                      UZS
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400 text-right">
                      {product.date}
                    </p>
                    <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white text-right">
                      Status:
                      <span
                        className={`ml-2 py-1 px-3 rounded-full text-white font-bold ${
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
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full col-span-full">
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  You don't have any payments
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
