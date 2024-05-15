import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FileInputButton, FileCard, ExtFile } from '@files-ui/react';

function AddnewCourseTeacher() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState('');
  const [period, setPeriod] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const [files, setFiles] = React.useState<ExtFile[]>([]);
  const updateFiles = (incommingFiles: ExtFile[]) => {
    //do something with the files
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const removeFile = (id: number | string | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  // const imgUrlSend = files[0]['name'];

  const token = localStorage.getItem('TOKEN');

  // const handleFileChange = (e: any) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('descr', descr);
    formData.append('subject', subject);
    formData.append('price', price);
    formData.append('period', period);
    formData.append('image', image);

    const formDataJson = JSON.stringify(formData);
    try {
      const response = await fetch(
        'https://f091-185-230-206-33.ngrok-free.app/api/add/course',
        {
          method: 'POST',
          body: formDataJson,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        },
      );

      if (response.ok) {
        console.log('successfully');
      }

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }

      const data = await response.json();

      toast.success(data, {
        position: 'top-right',
      });

      console.log(response);

      // const token = data.token;
      // const decoded: any = jwtDecode(token);

      // localStorage.setItem('TOKEN', token);
      console.log(response);
    } catch (error: any) {
      setError(error.message);

      toast.error(error.message, {
        position: 'top-right',
      });
    }
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <DefaultLayoutTeacher>
      <ToastContainer></ToastContainer>
      <div className="mb-5 text-center mx-auto text-2xl">
        {' '}
        Adding new <span className="underline">course</span>
      </div>
      <form action="#" className="dark:text-white" onSubmit={handleAddCourse}>
        <div className="p-6.5">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                More info
              </label>
              <input
                type="text"
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
                placeholder="Enter course more info"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Subject
              </label>
              <select
                value={selectedOption || subject}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                  setSubject(e.target.value);
                }}
                className={`relative z-20 w-full bg-white rounded border border-stroke bg-transparent py-3 px-12 ps-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                  isOptionSelected ? 'text-black dark:text-white' : ''
                }`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select Country
                </option>
                <option value="ielts" className="text-body dark:text-bodydark">
                  IELTS
                </option>
                <option value="sat" className="text-body dark:text-bodydark">
                  SAT
                </option>
                <option
                  value="cambridge"
                  className="text-body dark:text-bodydark"
                >
                  CAMBRIDGE
                </option>
              </select>
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Price (only number)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter course price"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Period (only number)
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Enter course period"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-3  block text-black dark:text-white">
                Image
              </label>
              <input
                type="input"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-white cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
              <FileInputButton onChange={updateFiles} value={files} />
              {files.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '5px',
                    minWidth: '50%',
                  }}
                >
                  {files.map((file: ExtFile) => (
                    <FileCard
                      key={file.id}
                      {...file}
                      onDelete={removeFile}
                      info
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="flex flex-row justify-end mt-20">
            <a
              href="/dashboard/teacher/my/courses"
              className="flex w-25 justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Cancel
            </a>
            <button
              // href="/dashboard/teacher/my/courses"
              className="ms-5 flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </DefaultLayoutTeacher>
  );
}

export default AddnewCourseTeacher;
