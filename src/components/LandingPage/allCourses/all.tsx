import { NavLink } from 'react-router-dom';
import { useState } from 'react';

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
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 6,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 7,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 8,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 9,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 10,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 11,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 12,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 13,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
];

export default function AllCourses() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Logic to calculate indexes of products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Logic to change page
  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
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
            <option value="USA" className="text-body dark:text-bodydark">
              IELTS
            </option>
            <option value="UK" className="text-body dark:text-bodydark">
              SAT
            </option>
            <option value="Canada" className="text-body dark:text-bodydark">
              A-LEVEL
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
            <option value="USA" className="text-body dark:text-bodydark">
              ⭐⭐⭐⭐⭐
            </option>
            <option value="UK" className="text-body dark:text-bodydark">
              ⭐⭐⭐⭐
            </option>
            <option value="Canada" className="text-body dark:text-bodydark">
              ⭐⭐⭐
            </option>
            <option value="Canada" className="text-body dark:text-bodydark">
              ⭐⭐
            </option>
            <option value="Canada" className="text-body dark:text-bodydark">
              ⭐
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
              Select Price
            </option>
            <option value="USA" className="text-body dark:text-bodydark">
              0 - 200.000 UZS
            </option>
            <option value="UK" className="text-body dark:text-bodydark">
              200 - 500.000 UZS
            </option>
            <option value="Canada" className="text-body dark:text-bodydark">
              More than 500.000 UZS
            </option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10">
          {currentProducts.map((product) => (
            <NavLink
              to={`/all/courses/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
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
              {/* Display pagination numbers */}
              {Array.from(
                { length: Math.ceil(products.length / productsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === i + 1
                        ? 'text-white border-cyan-700 bg-cyan-700 '
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
      </div>
    </div>
  );
}
