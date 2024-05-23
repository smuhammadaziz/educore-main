import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GetOnePaymentAdmin() {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('TOKEN');
  const { payment_id } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
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
          throw new Error('Failed to fetch blogs');
        }

        const data = await response.json();
        setBlogs(data.Userpayments);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
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
      //  if (!response.ok) {
      //    throw new Error('Failed to reject payment');
      //  }
      if (response.ok) {
        toast.error('Payment rejected', {
          position: 'top-right',
        });
        //    window.location.reload();
      }

      //  console.log(response);

      // Handle successful rejection (e.g., show a success message, update state)
    } catch (error) {
      console.error('Error rejecting payment:', error);
    }
  };

  return (
    <DefaultLayoutAdmin>
      <ToastContainer></ToastContainer>
      <div className="bg-white dark:bg-black text-center mx-auto justify-center p-5">
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="font-bold">Student full name: </p>
          <p className="ms-5 font-bold">
            {blogs ? `${blogs.name} ${blogs.l_name}` : 'John Doe'}
          </p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student email:</p>
          <p className="font-bold">
            {blogs ? blogs.email : 'john@example.com'}
          </p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student group name:</p>
          <p className="font-bold">{blogs ? blogs.g_name : 'Group A'}</p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student card type:</p>
          <p className="font-bold">{blogs ? blogs.card_type : 'Visa'}</p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student course time:</p>
          <p className="font-bold">{blogs ? blogs.l_days : 'Weekdays'}</p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student payment description:</p>
          <p className="font-bold">{blogs ? blogs.pay_desc : 'Tuition Fee'}</p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student course period:</p>
          <p className="font-bold">{blogs ? blogs.period : '4'} months</p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student course fee:</p>
          <p className="font-bold">{blogs ? blogs.price : '400,000'} so'm</p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student class time:</p>
          <p className="font-bold">
            {blogs
              ? `${blogs.subj_start}:00 - ${blogs.subj_end}:00`
              : '13:00 - 14:00'}
          </p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student main subject:</p>
          <p className="font-bold">{blogs ? blogs.subject : 'Math'}</p>
        </div>
        <div className="flex text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">Student group maximum limit:</p>
          <p className="font-bold">{blogs ? blogs.user_count : '30'} people</p>
        </div>
        <p className="mt-2 text-md font-medium text-gray-900 dark:text-white text-center">
          Status:
          <span
            className={`ms-2 mt-1 py-1 px-2 rounded-full w-25 text-md font-bold text-white dark:text-white text-center ${
              blogs.pay_status === 'paid'
                ? 'bg-green-500'
                : blogs.pay_status === 'pending'
                ? 'bg-yellow-500'
                : blogs.pay_status === 'unpaid'
                ? 'bg-red-500'
                : ''
            }`}
          >
            {blogs.pay_status}
          </span>
        </p>
        <div className="flex flex-col text-center mx-auto justify-center p-2">
          <p className="me-5 font-bold">
            Student payment cheque photo for verify:
          </p>
          <img
            src={`${backurl}upload/${blogs.image}`}
            alt={blogs.title}
            className="w-100 object-cover mx-auto mt-5"
          />
        </div>

        <div className="flex flex-col text-center mx-auto justify-center p-2">
          <button
            className="bg-green-800 w-50 mx-auto py-3 text-white rounded text-md hover:bg-green-700"
            onClick={handleVerifyPayment}
          >
            Verify payment
          </button>
          <button
            className="mt-5 bg-red-800 w-50 mx-auto py-3 text-white rounded text-md hover:bg-red-700"
            onClick={handleRejectPayment}
          >
            Reject payment
          </button>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default GetOnePaymentAdmin;
