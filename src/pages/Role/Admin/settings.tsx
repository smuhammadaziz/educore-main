import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import userThree from '../../../images/user/user-03.png';
import DefaultLayoutAdmin from '../../../layout/DefaultAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import backurl from '../../../links';

interface FormData {
  fname: string;
  lname: string;
  age: string;
  education: string;
  address: string;
  birthday: string;
  tgusername: string;
  phone: string;
  bio: string;
  img: File | null;
}

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSettings = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    age: '',
    education: '',
    address: '',
    birthday: '',
    tgusername: '',
    phone: '',
    bio: '',
    img: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        img: e.target.files[0],
      }));
    }
  };

  const token = localStorage.getItem('TOKEN');
  const navigate = useNavigate();
  const { profile_id } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.fname);
    data.append('l_name', formData.lname);
    data.append('age', formData.age);
    data.append('education', formData.education);
    data.append('adress', formData.address);
    data.append('birth_date', formData.birthday);
    data.append('username_tg', formData.tgusername);
    data.append('phone', formData.phone);
    data.append('about_me', formData.bio);
    // if (formData.img) {
    //   data.append('image', formData.img);
    // }

    if (formData.img) {
      data.append('image', formData.img);
    } else {
      // Fetch the default image and append it to FormData
      const response = await fetch(
        'https://cdn-icons-png.freepik.com/512/9634/9634079.png',
      );
      const blob = await response.blob();
      const defaultFile = new File([blob], 'default.png', {
        type: 'image/png',
      });
      data.append('image', defaultFile);
    }

    try {
      const response = await fetch(
        `${backurl}api/update/profile/${profile_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success('User successfully updated', {
          position: 'top-right',
        });
        setFormData({
          fname: '',
          lname: '',
          age: '',
          education: '',
          address: '',
          birthday: '',
          tgusername: '',
          phone: '',
          bio: '',
          img: null,
        });
      } else {
        console.error('Failed to update profile');
        toast.error(result.message, {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile', {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfileData(data);
        setFormData({
          fname: data.Profil.name,
          lname: data.Profil.l_name,
          age: data.Profil.age,
          education: data.Profil.education,
          address: data.Profil.adress,
          birthday: data.Profil.birth_date,
          tgusername: data.Profil.username_tg,
          phone: data.Profil.phone,
          bio: data.Profil.about_me,
          img: null,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <DefaultLayoutAdmin>
      <ToastContainer />
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information of Admin
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fname"
                      >
                        First name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fname"
                        id="fname"
                        onChange={handleChange}
                        placeholder="First name"
                        value={formData.fname}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lname"
                      >
                        Last name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="lname"
                        id="lname"
                        placeholder="Last name"
                        onChange={handleChange}
                        value={formData.lname}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="age"
                      >
                        Age
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="age"
                        id="age"
                        placeholder="Age"
                        onChange={handleChange}
                        value={formData.age}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="education"
                      >
                        Education
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="education"
                        id="education"
                        placeholder="Education"
                        onChange={handleChange}
                        value={formData.education}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        onChange={handleChange}
                        value={formData.address}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        value={formData.phone}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="birthday"
                      >
                        Birthday
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="date"
                        name="birthday"
                        id="birthday"
                        onChange={handleChange}
                        value={formData.birthday}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="tgusername"
                      >
                        Telegram Username (without @)
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="tgusername"
                        id="tgusername"
                        placeholder="Telegram Username"
                        onChange={handleChange}
                        value={formData.tgusername}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="bio"
                    >
                      Bio
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="bio"
                      id="bio"
                      rows={5}
                      placeholder="Bio"
                      onChange={handleChange}
                      value={formData.bio}
                    ></textarea>
                  </div>

                  <div className="mb-5.5 bg-gray p-5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="img"
                    >
                      Profile Image (upload only one image)
                    </label>
                    <input
                      className="w-full"
                      type="file"
                      name="img"
                      id="img"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <button
                    className="w-full rounded bg-primary py-3 px-6 text-white font-medium hover:bg-opacity-90"
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
    </DefaultLayoutAdmin>
  );
};

export default AdminSettings;
