import { ChangeEvent, FormEvent, useState } from 'react';
import DefaultLayoutSodiqAcademy from '../../layout/crm/DefaultSodiq';
import { useParams } from 'react-router-dom';
import backurl from '../../links';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface FormData {
  oldPass: string;
  newPass: string;
}

const SodiqAcademyPasswordChange = () => {
  const [formData, setFormData] = useState<FormData>({
    oldPass: '',
    newPass: '',
  });
  const [confirm, setConfirm] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem('TOKEN');
  const { profile_id } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.newPass !== confirm) {
      toast.error('Passwords do not match', {
        position: 'top-right',
      });
      return;
    }

    const data = new FormData();
    data.append('passwordOrigin', formData.oldPass);
    data.append('Newpassword', formData.newPass);

    try {
      const response = await fetch(`${backurl}api/password/change/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Your password successfully updated', {
          position: 'top-right',
        });
        setFormData({
          oldPass: '',
          newPass: '',
        });
        setConfirm('');
      } else {
        console.error('Failed to update password');
        toast.error(result.message, {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password', {
        position: 'top-right',
      });
    }
  };

  return (
    <DefaultLayoutSodiqAcademy>
      <ToastContainer />
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Change Password
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row relative">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="oldPass"
                      >
                        Old password
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={showOldPass ? 'text' : 'password'}
                        name="oldPass"
                        id="oldPass"
                        placeholder="Old Password"
                        onChange={handleChange}
                        value={formData.oldPass}
                      />
                      <span
                        className="absolute right-3 top-11 cursor-pointer"
                        onClick={() => setShowOldPass(!showOldPass)}
                      >
                        {showOldPass ? (
                          <AiFillEyeInvisible size={25} />
                        ) : (
                          <AiFillEye size={25} />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row relative">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="newPass"
                      >
                        New password
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={showNewPass ? 'text' : 'password'}
                        name="newPass"
                        id="newPass"
                        placeholder="New Password"
                        onChange={handleChange}
                        value={formData.newPass}
                      />
                      <span
                        className="absolute right-3 top-11 cursor-pointer"
                        onClick={() => setShowNewPass(!showNewPass)}
                      >
                        {showNewPass ? (
                          <AiFillEyeInvisible size={25} />
                        ) : (
                          <AiFillEye size={25} />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row relative">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="confirmPass"
                      >
                        Confirm password
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={showConfirmPass ? 'text' : 'password'}
                        name="confirmPass"
                        id="confirmPass"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirm(e.target.value)}
                        value={confirm}
                      />
                      <span
                        className="absolute right-3 top-11 cursor-pointer"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                      >
                        {showConfirmPass ? (
                          <AiFillEyeInvisible size={25} />
                        ) : (
                          <AiFillEye size={25} />
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full rounded bg-primary py-3 px-6 text-white font-medium hover:bg-opacity-80"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayoutSodiqAcademy>
  );
};

export default SodiqAcademyPasswordChange;
