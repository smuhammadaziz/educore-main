import React from 'react';
import imageImg from '../../../images/cards/cards-04.png';

function OneBlogLanding() {
  return (
    <div className="mx-auto container px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 sm:py-16 lg:py-20 text-center">
      <img
        src={imageImg}
        alt="blogs image"
        className="mx-auto rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      />
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black mt-8 sm:mt-10">
        Last visits in US
      </h2>
      <p className="text- sm:text-lg sm:w-150 sm:leading-6 lg:text-xl text-black text-center mx-auto mt-6 sm:mt-8 lg:mt-10 leading-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur
        cupiditate molestias quibusdam iure beatae perferendis consectetur
        placeat corporis. Illo ea illum culpa perspiciatis nemo beatae mollitia,
        dolore suscipit enim quod veritatis a debitis ipsa quae eligendi sed
        libero neque iste doloremque! Aliquam odio est rerum. Dolor et nemo
        cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
        tenetur cupiditate molestias quibusdam iure beatae perferendis
        consectetur placeat corporis. Illo ea illum culpa perspiciatis nemo
        beatae mollitia, dolore suscipit enim quod veritatis a debitis ipsa quae
        eligendi sed libero neque iste doloremque! Aliquam odio est rerum. Dolor
        et nemo cumque.
      </p>
      <div className="flex flex-col items-center sm:flex-col justify-center mt-8 sm:mt-12 lg:mt-16">
        <div className="flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p className="font-bold ml-2">102</p>
        </div>
        <p className="mt-4 sm:mt-0 sm:ml-4 font-bold text-base lg:text-lg">
          12.05.2024
        </p>
      </div>
    </div>
  );
}

export default OneBlogLanding;
