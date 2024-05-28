import React, { useEffect, useState } from 'react';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';

const productsPerPage = 15;

function ViewAllCoursesIGCSEStudent() {
  const [selectedOption, setSelectedOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sub, setSub] = useState('');
  const [data, setData] = useState([]);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}/api/student/get/course/igcse`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const allCourse = data.IGSECourses;
        setData(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let filteredData = data.slice(indexOfFirstProduct, indexOfLastProduct);

  if (sub !== '' && sub !== 'ALL') {
    filteredData = data.filter((course) => course.main_sub === sub);
  }

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChange = (e: any) => {
    setSub(e.target.value);
    setCurrentPage(1); // Reset pagination when the subject filter changes
  };

  return (
    <DefaultLayoutStudent>
      <div className="mb-4.5 md:w-1/3 px-2">
        <label className="mb-2.5 block text-black dark:text-white">
          Subjects
        </label>
        <select
          value={sub}
          onChange={handleSelectChange}
          className={`w-full rounded border border-stroke bg-white py-3 px-5 pe-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Subject
          </option>
          <option value="ALL" className="text-body dark:text-bodydark">
            ALL
          </option>
          <option value="Math" className="text-body dark:text-bodydark">
            Math
          </option>
          <option value="Biology" className="text-body dark:text-bodydark">
            Biology
          </option>
          <option value="Business" className="text-body dark:text-bodydark">
            Business
          </option>
          <option value="Physics" className="text-body dark:text-bodydark">
            Physics
          </option>
          <option value="Chemistry" className="text-body dark:text-bodydark">
            Chemistry
          </option>
          <option
            value="Computer-Science"
            className="text-body dark:text-bodydark"
          >
            Computer-Science
          </option>
          <option value="Economics" className="text-body dark:text-bodydark">
            Economics
          </option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-10">
        {filteredData.map((product: any) => (
          <NavLink
            to={`/dashboard/student/courses/${product.course_id}`}
            key={product.course_id}
            className="group"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={`${backurl}upload/${product.image}`}
                alt="course image"
                className="w-100 h-64 object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-700">
              {product.title}
            </h3>
            <h3 className="text-lg font-bold text-gray-700">
              {product.name} {product.l_name}
            </h3>
            <h3 className="mt-4 text-lg font-bold text-gray-700">
              Subject: {product.main_sub}
            </h3>
            <p className="mt-5 text-lg font-medium text-gray-900">
              {product.price} UZS
            </p>
          </NavLink>
        ))}
      </div>
      <div className="mt-8">
        <nav className="px-4 flex items-center justify-between sm:px-0">
          <div className="-mt-px w-0 flex-1 flex ">
            <button
              onClick={() => {
                paginate(currentPage - 1);
                window.scrollTo({ top: 0 });
              }}
              disabled={currentPage === 1}
              className="cursor-pointer rounded-full hover:bg-fuchsia-900 hover:text-white relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:text-gray-400"
            >
              Previous
            </button>
          </div>
          <div className="hidden md:-mt-px md:flex">
            {Array.from(
              { length: Math.ceil(data.length / productsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === i + 1
                      ? 'text-black border-black-900 border-2'
                      : 'text-gray-500 hover:text-gray-400'
                  }`}
                >
                  {i + 1}
                </button>
              ),
            )}
          </div>
          <div className="-mt-px w-0 flex-1 flex justify-end">
            <button
              onClick={() => {
                paginate(currentPage + 1);
                window.scrollTo({ top: 0 });
              }}
              disabled={
                currentPage === Math.ceil(data.length / productsPerPage)
              }
              className="cursor-pointer rounded-full hover:bg-fuchsia-900 hover:text-white relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:text-gray-400"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </DefaultLayoutStudent>
  );
}

export default ViewAllCoursesIGCSEStudent;
