import React, { FormEvent } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useParams } from 'react-router-dom';

function UseFreeTrialSessionForStudent() {
  const { group_id } = useParams();

  const token = localStorage.getItem('TOKEN');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backurl}api/use/freeT/${group_id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Free Trial successfully used', {
          position: 'top-right',
        });
        window.location.href = '/dashboard/student';
      }
    } catch (error: any) {
      console.error('Error using the free trial', error);
      toast.warning(error.message, {
        position: 'top-right',
      });
    }
  };

  return (
    <DefaultLayoutStudent>
      <ToastContainer />
      <div className="mb-5 text-left mx-auto text-2xl text-center">
        Use <span className="underline font-bold">FREE TRIAL</span> for this
        group
      </div>
      <form
        onSubmit={handleSubmit}
        className="dark:text-white bg-white p-6 w-full max-w-lg mx-auto"
      >
        <div>
          <h2 className="text-2xl">
            Would you like to use your FREE TRIAL SESSION?
          </h2>
          <div className="flex flex-col md:flex-row mt-5">
            <NavLink
              to="/dashboard/student"
              className="bg-red-700 py-3 px-6 text-center text-white rounded ms-0 mx-3 my-2 md:my-0 hover:bg-red-500 font-bold text-lg"
            >
              Cancel
            </NavLink>
            <button
              type="submit"
              className="bg-green-700 py-3 px-6 text-white rounded mx-3 my-2 md:my-0 hover:bg-green-500 font-bold text-lg"
            >
              Yes
            </button>
          </div>
        </div>
      </form>
    </DefaultLayoutStudent>
  );
}

export default UseFreeTrialSessionForStudent;
