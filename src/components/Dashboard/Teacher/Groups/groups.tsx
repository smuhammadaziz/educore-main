import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';

const products = [
  {
    id: 1,
    name: 'SAT with Sardor',
    price: '320.000 UZS',
    course: 'SAT course',
    rating: '⭐⭐⭐⭐⭐',
  },
];

const courses = [
  {
    id: 1,
    name: 'SAT',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/SAT_logo_%282017%29.svg/1200px-SAT_logo_%282017%29.svg.png',
  },
  {
    id: 2,
    name: 'IELTS',
    img: 'https://i.ytimg.com/vi/C3XwcFQmQA4/maxresdefault.jpg',
  },
  {
    id: 3,
    name: 'CAMBRIDGE',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzy0nTApZ1wq_-2k1fszMGwnyxOCda5Ltw2avzRamJLw&s',
  },
];

export default function AllGroupsListTeacher() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.Data.reverse();

        // console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          My <span className="underline">Groups</span> List
        </h2>
        {/* <NavLink
          to="/dashboard/teacher/add/new/groups"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Groups
        </NavLink> */}
      </div>
      <div className="bg-gray-100 my-20">
        <div className="mt-10 grid lg:grid-cols-3">
          {courses && courses
            ? courses.map((e) => (
                <div
                  className="my-20 mx-4  block p-3 bg-white"
                  key={e.course_id}
                >
                  {/* <img
                    src={`${backurl}upload/${e.image}`}
                    alt={e.title}
                    className="h-full w-full object-cover object-center"
                  /> */}
                  <h2 className="text-2xl mt-5">{e.title}</h2>
                  <NavLink
                    to={`/dashboard/teacher/group/${e.course_id}`}
                    className="bg-blue-600 py-2 px-5 text-white rounded hover:bg-blue-400 mt-5 inline-block"
                  >
                    More
                  </NavLink>
                </div>
              ))
            : "user don't have any courses"}
        </div>
      </div>
      {/* <h2 className="mt-10">Choose Course</h2> */}
      {/* <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`w-full rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
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
          className={`w-full bg-white rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
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
          className={`w-full bg-white rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
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
      </div> */}
      <div className="">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <a
                key={product.id}
                href="#"
                className="group bg-white p-5 dark:bg-slate-700 dark:text-white"
              >
                <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                  {product.name}
                </h3>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  {product.price}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                  {product.course}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                  {product.rating}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
