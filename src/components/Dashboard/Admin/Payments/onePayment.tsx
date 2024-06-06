import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GetOnePaymentAdmin() {
  const [payment, setPayment] = useState({});
  const token = localStorage.getItem('TOKEN');
  const { payment_id } = useParams();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/admin/get/payment/${payment_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch payment');
        }

        const data = await response.json();

        console.log(data);

        setPayment(data.Userpayments);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };

    fetchPayment();
  }, [payment_id, token]);

  const handleVerifyPayment = async () => {
    try {
      const response = await fetch(
        `${backurl}/api/admin/payment/success/${payment_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        toast.success('Payment verified', {
          position: 'top-right',
        });
        //    window.location.reload();
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const handleRejectPayment = async () => {
    try {
      const response = await fetch(
        `${backurl}/api/admin/payment/reject/${payment_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // const data = await response.json();
      if (response.ok) {
        toast.error('Payment rejected', {
          position: 'top-right',
        });
        //    window.location.reload();
      }
    } catch (error) {
      console.error('Error rejecting payment:', error);
    }
  };

  return (
    <DefaultLayoutAdmin>
      <ToastContainer />
      <div className="bg-white dark:bg-slate-800 text-center mx-auto justify-center p-5 rounded-lg shadow-md w-full sm:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-5">Payment Details</h2>
        <div className="flex flex-col space-y-4 text-left">
          <div className="flex justify-between">
            <p className="font-bold">Student Full Name:</p>
            <p>{payment ? `${payment.name} ${payment.l_name}` : 'John Doe'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Student Email:</p>
            <p>{payment.email || 'john@example.com'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Group Name:</p>
            <p>{payment.g_name || 'Group A'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Card Type:</p>
            <p>{payment.card_type || 'Visa'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Course Time:</p>
            <p>{payment.l_days || 'Weekdays'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Payment Description:</p>
            <p>{payment.pay_desc || 'Tuition Fee'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Course Period:</p>
            <p>{payment.period ? `${payment.period} months` : '4 months'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Course Fee:</p>
            <p>{payment.price ? `${payment.price} so'm` : "400,000 so'm"}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Class Time:</p>
            <p>
              {payment.subj_start && payment.subj_end
                ? `${payment.subj_start}:00 - ${payment.subj_end}:00`
                : '13:00 - 14:00'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Main Subject:</p>
            <p>{payment.subject || 'Math'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Group Max Limit:</p>
            <p>
              {payment.user_count
                ? `${payment.user_count} people`
                : '30 people'}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold inline-block">Status:</p>
            <span
              className={`ml-2 inline-block py-1 px-3 rounded-full text-md font-bold text-white ${
                payment.pay_status === 'paid'
                  ? 'bg-green-500'
                  : payment.pay_status === 'pending'
                  ? 'bg-yellow-500'
                  : payment.pay_status === 'unpaid'
                  ? 'bg-red-500'
                  : ''
              }`}
            >
              {payment.pay_status}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold mb-2">Payment Cheque Photo:</p>
            <img
              src={`${backurl}upload/${payment.image}`}
              alt={payment.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-6 justify-center">
          <button
            className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
            onClick={handleVerifyPayment}
          >
            Verify Payment
          </button>
          <button
            className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            onClick={handleRejectPayment}
          >
            Reject Payment
          </button>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default GetOnePaymentAdmin;
