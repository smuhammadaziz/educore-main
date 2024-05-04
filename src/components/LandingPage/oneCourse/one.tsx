import React from 'react';

import { Rating } from '@material-tailwind/react';

const CoffeeComponent = () => {
  return (
    <div className="font-sans bg-white">
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
              <p className="text-gray-800 text-xl font-bold text-5xl">$12</p>
            </div>

            <div className="flex space-x-2 mt-4">
              <Rating value={4} readonly />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeComponent;
