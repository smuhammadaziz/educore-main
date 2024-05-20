import React, { useEffect } from 'react';

import { Rating } from '@material-tailwind/react';
import { NavLink, useParams } from 'react-router-dom';

import backurl from '../../../links';

const CoffeeComponent = () => {
  const { course_id } = useParams();

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

        console.log(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="font-sans bg-white pb-20" key={course_id}>
      <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 mt-10">
          <div className="lg:col-span-3 bg-gray-100 rounded-sm w-full lg:sticky top-0 text-center p-8">
            <img
              src="https://cdn.freebiesupply.com/logos/large/2x/ielts-logo-png-transparent.png"
              alt="Product"
              className="w-7/12 rounded object-cover mx-auto"
            />

            <hr className="border-white border-2 my-6" />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">
              IELTS Course with Jhon Jhonson | Grammer
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-extrabold text-5xl ">
                300.000 UZS
              </p>
            </div>

            <div className="flex space-x-2 mt-4">
              <Rating value={4} readonly />
              <p className="bg-black p-2 rounded-full text-gray-800 text-xl font-extrabold text-5xl ">
                4.2
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">
                About the course
              </h3>
              <p className="text-sm font-bold text-gray-00 mt-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
                perferendis iste quam ratione nisi dignissimos, quos officiis
                odit saepe explicabo.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">
                About the Course Teacher
              </h3>
              <p className="text-sm font-bold text-gray-00 mt-3">
                Jhon Jhonson
              </p>
            </div>
            <div className="mt-8">
              <NavLink
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-primary py-3 px-9 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Buy now
              </NavLink>
              <NavLink
                to="/"
                className="ms-2 inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-9 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Free Trial
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeComponent;
