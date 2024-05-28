import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
];

import backurl from '../../../links';

export default function AllCourses() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

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

        setData(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [price, setPrice] = useState(50000);

  const handleSliderChange = (event: any) => {
    setPrice(event.target.value);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mt-10 text-2xl mb-10 text-center mx-auto">
          Find your first course
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
              Select Course
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
              value="AS/A LEVELS"
              className="text-body dark:text-bodydark"
            >
              AS/A LEVELS
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
              Select Rating
            </option>
            <option value="5" className="text-body dark:text-bodydark">
              5
            </option>
            <option value="4.9" className="text-body dark:text-bodydark">
              4.9
            </option>
            <option value="4.8" className="text-body dark:text-bodydark">
              4.8
            </option>
            <option value="4.7" className="text-body dark:text-bodydark">
              4.7
            </option>
            <option value="4.6" className="text-body dark:text-bodydark">
              4.6
            </option>
            <option value="4.5" className="text-body dark:text-bodydark">
              4.5
            </option>
          </select>
          <div className="">
            <h2 className="text-xl font-bold">Price: {price} UZS</h2>
            <input
              type="range"
              min="50000"
              max="2000000"
              value={price}
              onChange={handleSliderChange}
              className="w-full h-1 bg-fuchsia-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 mx-auto">
          {currentProducts.map((product: any) => (
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
                {product.price} 000 so'm
              </p>
            </NavLink>
          ))}
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
      </div>
    </div>
  );
}
