import React, { useEffect, useState } from 'react';
import imageImg from '../../../images/cards/cards-04.png';
import backurl from '../../../links';
import { useParams } from 'react-router-dom';

import moment from 'moment';

function OneBlogLanding() {
  const [course, setCourses] = useState();

  const { blog_id } = useParams();
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/get/blog/${blog_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);

        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <div className="mx-left container px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 sm:py-16 lg:py-20 text-center">
      <img
        src={`${backurl}upload/${
          course
            ? course.Data.img
            : '128-1280406_view-user-icon-png-user-circle-icon-png.png'
        }`}
        alt="image"
        className="mx-left rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      />
      <h2 className="text-2xl  sm:text-2xl lg:text-3xl text-black mt-8 sm:mt-10 text-left">
        {course && course ? course.Data.title : 'Hello world'}
      </h2>
      <p className="text-left sm:text-lg w-full sm:leading-6 lg:text-xl text-black mx-left mt-6 sm:mt-8 lg:mt-10 leading-6">
        {course && course ? course.Data.descr : 'Lorem ipsum'}
      </p>
      <div className="flex items-center mx-left justify-between w-75 mt-8 sm:mt-12 lg:mt-16">
        <p className="flex flex-col  font-bold lg:text-lg">
          {moment(
            course && course ? course.Data.created_at : '01/01/2024',
          ).format('LLL')}
        </p>
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
          <p className="font-bold ml-2">
            {course && course ? course.blogcount.count : '123'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OneBlogLanding;
