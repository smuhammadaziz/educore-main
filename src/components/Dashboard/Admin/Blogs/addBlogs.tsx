import React, { FormEvent, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

function AddNewBlogAdmin() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    // Clear all form data
    setName('');
    setDescription('');
    setPhoto(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a form data object
    const formData = new FormData();
    formData.append('title', name);
    formData.append('descr', description);
    if (photo) {
      formData.append('img', photo);
    }

    try {
      const response = await fetch(
        'http://5.182.26.16/plesk-site-preview/backend-api.educore-org.uz/https/5.182.26.16/api/admin/add/blog',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`, // replace with actual token
          },
          body: formData,
        },
      );

      //  if (response.ok) {
      //    window.location.href = '/dashboard/blogs';
      //  } else {
      //    // Handle errors
      //    console.error('Error submitting the form', response.statusText);
      //  }

      console.log(response);
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <DefaultLayoutAdmin>
      <div className="mb-5 text-left mx-auto text-2xl">
        {' '}
        Adding new <span className="underline">blog</span>
      </div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="p-6.5">
          <div className="">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={10}
                placeholder="Enter your full name"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Photo (only one image)
              </label>
              <input
                type="file"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>

          <div className="flex flex-row justify-end mt-20">
            <a
              href="/dashboard/blogs"
              className="flex w-25 justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
              onClick={handleCancel}
            >
              Cancel
            </a>
            <button
              type="submit"
              className="ms-5 flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </DefaultLayoutAdmin>
  );
}

export default AddNewBlogAdmin;
