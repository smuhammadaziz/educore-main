import React, { useEffect, useState } from 'react';
import backurl from '../../../../links';
import { NavLink } from 'react-router-dom';

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

function ViewAllCourseCambStudent() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const [data, setData] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}/api/student/get/course/cambridge`,
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
        const allCourse = data.CAMBCourses;

        setData(allCourse);

        // console.log(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-10">
        {data &&
          data.map((product) => (
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
              <h3 className=" text-lg font-bold text-gray-700">
                {product.name} {product.l_name}
              </h3>

              <p className="mt-5 text-lg font-medium text-gray-900">
                {product.price} so'm
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
              { length: Math.ceil(products.length / productsPerPage) },
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
                currentPage === Math.ceil(products.length / productsPerPage)
              }
              className="cursor-pointer rounded-full hover:bg-fuchsia-900 hover:text-white relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:text-gray-400"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default ViewAllCourseCambStudent;
