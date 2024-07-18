import React, { FormEvent, useState } from 'react';

import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdCancel } from 'react-icons/md';

// import { MdOutlineAdd } from 'react-icons/md';
import { RiAddCircleFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

function AddnewCourseTeacher() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [main, setMain] = useState('');
  const [sub, setSub] = useState('');
  const [cost, setCost] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState(null);

  const [showprice, setShowPrice] = useState({
    seventeen: '',
    eightyThree: '',
  });

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleCostChange = (e: any) => {
    const inputCost = e.target.value;
    setCost(inputCost);

    if (inputCost) {
      const price = parseFloat(inputCost.replace(/,/g, '  '));
      if (!isNaN(price)) {
        const seventeenPercent = price * 0.17;
        const eightyThreePercent = price * 0.834;
        setShowPrice({
          seventeen: formatPrice(seventeenPercent),
          eightyThree: formatPrice(eightyThreePercent),
        });
      } else {
        setShowPrice({ seventeen: '', eightyThree: ' ' });
      }
    } else {
      setShowPrice({ seventeen: '', eightyThree: ' ' });
    }
  };

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    setName('');
    setDescription('');
    setMain('');
    setCost('');
    setTime('');
    setSub('');
    setPhoto(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', name);
    formData.append('descr', description);
    formData.append('subject', main);
    formData.append('main_sub', sub || ''); // Add an empty string if sub is null
    formData.append('price', cost);
    formData.append('period', time);
    if (photo) {
      formData.append('image', photo);
    }

    try {
      const response = await fetch(`${backurl}api/add/course`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Course successfully added', {
          position: 'top-right',
        });
        handleCancel();
      } else {
        toast.error(data.message, {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error submitting the form', error);
      toast.warning('Error submitting the form', {
        position: 'top-right',
      });
    }
  };

  const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMain(value);
    if (value === 'IELTS' || value === 'SAT') {
      setSub('null');
    } else {
      setSub('');
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <DefaultLayoutTeacher>
      <ToastContainer />
      <div className="mb-5 text-left mx-auto text-2xl">
        Adding new <span className="underline">Course</span>
      </div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="py-6.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="my-3">
              <label className="mb-2.5 block text-black dark:text-white">
                Course name
              </label>
              <input
                type="text"
                placeholder="type here ..."
                className="w-full bg-white rounded-xl border-2 border-stroke py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label className="mb-2.5 block text-black dark:text-white">
                Short information about your course
              </label>
              <input
                type="text"
                placeholder="type here ..."
                className="w-full bg-white rounded-xl border-2 border-stroke py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label className="mb-2.5 block text-black dark:text-white">
                Main Subject
              </label>
              <select
                value={main}
                onChange={handleMainChange}
                className="w-full rounded-xl border-2 border-stroke bg-white py-4 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select Main Course
                </option>
                <option value="IELTS" className="text-body dark:text-bodydark">
                  IELTS
                </option>
                <option value="SAT" className="text-body dark:text-bodydark">
                  SAT
                </option>
                <option value="IGCSE" className="text-body dark:text-bodydark">
                  IGCSE
                </option>
                <option value="IB" className="text-body dark:text-bodydark">
                  International Baccalaureate
                </option>
                <option value="AP" className="text-body dark:text-bodydark">
                  Advanced Placement
                </option>
                <option
                  value="AS/A-LEVELS"
                  className="text-body dark:text-bodydark"
                >
                  AS/A-LEVELS
                </option>
              </select>
            </div>
            {(main === 'IGCSE' || main === 'AS/A-LEVELS') && (
              <div className="my-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subjects
                </label>
                <select
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className="w-full rounded-xl border border-stroke border-2 bg-white py-4 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Select Subject
                  </option>
                  <option value="Math" className="text-body dark:text-bodydark">
                    Math
                  </option>
                  <option
                    value="Biology"
                    className="text-body dark:text-bodydark"
                  >
                    Biology
                  </option>
                  <option
                    value="Business"
                    className="text-body dark:text-bodydark"
                  >
                    Business
                  </option>
                  <option
                    value="Physics"
                    className="text-body dark:text-bodydark"
                  >
                    Physics
                  </option>
                  <option
                    value="Chemistry"
                    className="text-body dark:text-bodydark"
                  >
                    Chemistry
                  </option>
                  <option
                    value="Computer-Science"
                    className="text-body dark:text-bodydark"
                  >
                    Computer Science
                  </option>
                  <option
                    value="Economics"
                    className="text-body dark:text-bodydark"
                  >
                    Economics
                  </option>
                </select>
              </div>
            )}
            {main === 'IB' && (
              <div className="my-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subjects
                </label>
                <select
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className="w-full rounded-xl border border-stroke border-2 bg-white py-4 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Select Subject
                  </option>
                  <option
                    value="English A Lang & Lit"
                    className="text-body dark:text-bodydark"
                  >
                    English A Lang & Lit
                  </option>
                  <option
                    value="Business Management"
                    className="text-body dark:text-bodydark"
                  >
                    Business Management
                  </option>
                  <option
                    value="Biology"
                    className="text-body dark:text-bodydark"
                  >
                    Biology
                  </option>
                  <option
                    value="Physics"
                    className="text-body dark:text-bodydark"
                  >
                    Physics
                  </option>
                  <option
                    value="Chemistry"
                    className="text-body dark:text-bodydark"
                  >
                    Chemistry
                  </option>
                  <option
                    value="History"
                    className="text-body dark:text-bodydark"
                  >
                    History
                  </option>
                  <option
                    value="Geography"
                    className="text-body dark:text-bodydark"
                  >
                    Geography
                  </option>
                  <option
                    value="Economics"
                    className="text-body dark:text-bodydark"
                  >
                    Economics
                  </option>
                  <option
                    value="Math Analysis and Approaches"
                    className="text-body dark:text-bodydark"
                  >
                    Math Analysis and Approaches
                  </option>
                  <option
                    value="Math Applications and Interpretation"
                    className="text-body dark:text-bodydark"
                  >
                    Math Applications and Interpretation
                  </option>
                </select>
              </div>
            )}
            {main === 'AP' && (
              <div className="my-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subjects
                </label>
                <select
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className="w-full rounded-xl border border-stroke border-2 bg-white py-4 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Select Subject
                  </option>
                  <option
                    value="English Language and Composition"
                    className="text-body dark:text-bodydark"
                  >
                    English Language and Composition
                  </option>
                  <option
                    value="United States History"
                    className="text-body dark:text-bodydark"
                  >
                    United States History
                  </option>
                  <option
                    value="English Literature and Composition"
                    className="text-body dark:text-bodydark"
                  >
                    English Literature and Composition
                  </option>
                  <option
                    value="Calculus AB"
                    className="text-body dark:text-bodydark"
                  >
                    Calculus AB
                  </option>
                  <option
                    value="Psychology"
                    className="text-body dark:text-bodydark"
                  >
                    Psychology
                  </option>
                  <option
                    value="Statistics"
                    className="text-body dark:text-bodydark"
                  >
                    Statistics
                  </option>
                  <option
                    value="Biology"
                    className="text-body dark:text-bodydark"
                  >
                    Biology
                  </option>
                  <option
                    value="Chemistry"
                    className="text-body dark:text-bodydark"
                  >
                    Chemistry
                  </option>
                  <option
                    value="World History"
                    className="text-body dark:text-bodydark"
                  >
                    World History
                  </option>
                </select>
              </div>
            )}
            <div className="my-3">
              <label className="mb-2.5 block text-black dark:text-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p>Price (example: 300000)</p>
                <p className="mt-2 sm:mt-0 sm:ml-10">
                  you will receive:{' '}
                  <span className="font-bold">
                    {showprice.eightyThree} UZS/Monthly
                  </span>
                </p>
              </label>
              <input
                type="text"
                placeholder="type here ..."
                className="w-full bg-white rounded-xl border-2 border-stroke py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={cost}
                // onChange={(e) => setCost(e.target.value)}
                onChange={handleCostChange}
                required
              />
            </div>
            <div className="my-3">
              <label className="mb-2.5 block text-black dark:text-white">
                Course period (only numbers) example: 6
              </label>
              <input
                type="text"
                placeholder="type here ..."
                className="w-full bg-white rounded-xl border-2 border-stroke py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label className="mb-2.5 block text-black dark:text-white">
                Course image (only one allowed)
              </label>
              <input
                type="file"
                className="w-full bg-white rounded-xl border-2 border-stroke py-4 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center bg-gray-100 p-4">
            <div className="flex flex-col w-full max-w-xs">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="music"
                  name="interest"
                  value="music"
                  className="me-3 transform scale-150"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="music" className="flex-1 text-right">
                  <p className="ml-2 text-sm sm:text-base">
                    I read and accept
                    <a
                      className="ms-2 text-blue-600 underline"
                      href="https://docs.google.com/document/d/12A_fMNIn-3ryDlcEtXtPQJqN7c10pCyQcunGtbvVV5w/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Services
                    </a>
                  </p>
                </label>
              </div>
              <div className="flex flex-col md:flex-row justify-center mt-6 space-y-3 md:space-y-0 md:space-x-5">
                <button
                  type="submit"
                  className={`flex items-center justify-center w-full md:w-32 rounded p-3 font-medium text-white transition duration-300 ${
                    isChecked
                      ? 'bg-green-600 hover:bg-green-500'
                      : 'bg-green-300 dark:opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!isChecked}
                >
                  <span className="mr-2">
                    <RiAddCircleFill />
                  </span>
                  <span className="text-sm sm:text-base">Add</span>
                </button>
                <NavLink
                  to="/dashboard/teacher/my/courses"
                  type="button"
                  className="flex items-center justify-center w-full md:w-32 rounded bg-red-600 p-3 font-medium text-white hover:bg-red-500 transition duration-300"
                  onClick={handleCancel}
                >
                  <span className="mr-2">
                    <MdCancel />
                  </span>
                  <span className="text-sm sm:text-base">Cancel</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </form>
    </DefaultLayoutTeacher>
  );
}

export default AddnewCourseTeacher;
