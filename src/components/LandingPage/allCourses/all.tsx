import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import backurl from '../../../links';
import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

export default function AllCourses() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionn, setSelectedOptionn] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isOptionSelectedd, setIsOptionSelectedd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const [selectedLanguage] = useLang();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/get/landing/all/courses`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const allCourse = data.Courses;

        setData(allCourse.reverse());

        console.log(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  const [price, setPrice] = useState(1000000);

  const handleSliderChange = (event) => {
    setPrice(event.target.value);
  };

  const filterCourses = (courses) => {
    return courses
      .filter((course) => {
        if (selectedOptionn) {
          return course.subject === selectedOptionn;
        }
        return true;
      })
      .filter((course) => {
        if (selectedOption) {
          const rating = parseFloat(selectedOption);
          return course.rating >= rating && course.rating < rating + 0.1;
        }
        return true;
      })
      .filter((course) => {
        return course.price <= price;
      });
  };

  const filteredCourses = filterCourses(data);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredCourses.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
    setIsOptionSelectedd(true);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mt-10 text-2xl mb-10 text-center mx-auto">
          {content[selectedLanguage as string].coursesPage.find}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <select
            value={selectedOptionn}
            onChange={(e) => {
              setSelectedOptionn(e.target.value);
              changeTextColor();
            }}
            className={`w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
              isOptionSelectedd ? 'text-black dark:text-white' : ''
            }`}
          >
            <option value="" disabled className="text-body dark:text-bodydark">
              {content[selectedLanguage as string].coursesPage.course}
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
            <option
              value="AS/A-LEVELS"
              className="text-body dark:text-bodydark"
            >
              AS/A-LEVELS
            </option>
          </select>

          <select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              changeTextColor();
            }}
            className={`w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
              isOptionSelected ? 'text-black dark:text-white' : ''
            }`}
          >
            <option value="" disabled className="text-body dark:text-bodydark">
              {content[selectedLanguage as string].coursesPage.rating}
            </option>
            <option value="5.0" className="text-body dark:text-bodydark">
              ⭐⭐⭐⭐⭐
            </option>
            <option value="4.8" className="text-body dark:text-bodydark">
              ⭐⭐⭐⭐
            </option>
          </select>
          <div className="">
            <h2 className="text-xl font-bold">
              {content[selectedLanguage as string].coursesPage.price}: {price}{' '}
              UZS
            </h2>
            <input
              type="range"
              min="50000"
              max="1000000"
              value={price}
              onChange={handleSliderChange}
              className="w-full h-1 bg-fuchsia-900 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 mx-auto">
          {currentProducts && currentProducts.length > 0
            ? currentProducts.map((product) => (
                <NavLink
                  to={`/all/courses/${product.course_id}`}
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
                  <h3 className=" text-lg font-bold text-gray-700">
                    {product.name} {product.l_name}
                  </h3>

                  <p className="mt-5 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </NavLink>
              ))
            : 'No courses available'}
        </div>

        {/* Pagination buttons */}
        <div className="mt-8">
          <nav className=" px-4 flex items-center justify-between sm:px-0">
            <div className="-mt-px w-0 flex-1 flex ">
              <button
                onClick={() => {
                  paginate(currentPage - 1);
                  window.scrollTo({ top: 0 });
                }}
                disabled={currentPage === 1}
                className="cursor-pointer rounded-full hover:bg-fuchsia-900 hover:text-white relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:text-gray-400"
              >
                {content[selectedLanguage as string].coursesPage.previous}
              </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
              {Array.from(
                { length: Math.ceil(filteredCourses.length / productsPerPage) },
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
                  currentPage ===
                  Math.ceil(filteredCourses.length / productsPerPage)
                }
                className="cursor-pointer rounded-full hover:bg-fuchsia-900 hover:text-white relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:text-gray-400"
              >
                {content[selectedLanguage as string].coursesPage.next}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
