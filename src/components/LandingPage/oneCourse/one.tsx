import React, { useEffect, useState } from 'react';
import { Rating } from '@material-tailwind/react';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../links';
import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

import { FaFire } from 'react-icons/fa';
import { MdSell } from 'react-icons/md';

const CoffeeComponent = () => {
  const { course_id } = useParams();
  const [data, setData] = useState(null);
  const [selectedLanguage] = useLang();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}/api/get/id/by/course/${course_id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data);

        setData(data.getidbycourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [course_id]);

  if (!data) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const {
    image,
    title,
    price,
    descr,
    period,
    name,
    l_name,
    subject,
    main_sub,
    video_link,
    video_descr,
  } = data;

  return (
    <div className="">
      <div className="bg-slate-100 max-w-screen-xl mx-auto py-10 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-black mt-4">
            {title || 'SAT | IELTS'}
          </h2>
          <h2 className="text-2xl font-medium text-black mt-4">
            {name || 'SAT | IELTS'} {l_name || 'SAT | IELTS'} |{' '}
            {subject || 'SAT | IELTS'}
          </h2>
          <p className="text-black text-2xl md:text-3xl font-bold mt-4">
            {price
              ? price.toLocaleString('en-US').replace(/,/g, ' ')
              : 'SAT | IELTS'}{' '}
            uzs/month
          </p>
          <div className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
            <NavLink
              to="/auth/signup"
              className="inline-flex items-center justify-center rounded-md bg-fuchsia-700 py-3 px-6 text-center font-medium text-white hover:bg-fuchsia-800 sm:px-8 lg:px-10"
            >
              <span className="me-3">
                <MdSell />
              </span>
              {content[selectedLanguage as string].buy.buy}
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="inline-flex items-center justify-center rounded-md bg-green-700 py-3 px-6 text-center font-medium text-white hover:bg-green-800 sm:px-8 lg:px-10"
            >
              <span className="me-3">
                <FaFire />
              </span>
              {content[selectedLanguage as string].buy.free}
            </NavLink>
          </div>
        </div>

        <div className="bg-slate-300 p-3">
          <img
            src={`${backurl}upload/${image || 'SAT | IELTS'}`}
            alt="Product"
            className="w-64 h-64 object-cover object-contain"
          />
        </div>
      </div>

      <div className="bg-white my-10 py-10 mb-0">
        <div className="bg-slate-100 max-w-screen-xl mx-auto  py-5 rounded-xl px-5">
          <h2 className="my-5 font-medium text-black">
            {subject || 'SAT | IELTS'}{' '}
            {main_sub !== 'null' ? (
              <span>/ {main_sub || 'SAT | IELTS'}</span>
            ) : null}
          </h2>
          <h3 className="text-xl text-medium text-black">
            {content[selectedLanguage as string].buy.about}
          </h3>
          <p className="text-lg font-medium text-black mt-3">
            {descr || 'SAT | IELTS'}
          </p>
          <p className="text-lg text-black font-medium mt-3">
            {content[selectedLanguage as string].buy.period}{' '}
            <span className="font-bold text-black">
              {period || 'SAT | IELTS'}{' '}
              {content[selectedLanguage as string].buy.month}
            </span>
          </p>
          <div className="mt-8">
            <h3 className="text-lg font-medium text-black">
              {content[selectedLanguage as string].buy.teacher}
            </h3>
            <p className="text-md text-black font-bold text-gray-800 mt-3 uppercase">
              {name || 'SAT | IELTS'} {l_name || 'SAT | IELTS'}
            </p>
          </div>
        </div>
      </div>
      {video_link ? (
        <div className="bg-white my-10 py-10 pt-0 mt-0">
          <div className="bg-slate-100 max-w-screen-xl mx-auto py-5 rounded-xl px-5 flex">
            <iframe
              width="560"
              height="400"
              src={video_link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-md w-3/4"
            ></iframe>
            <div className="ml-5 w-2/4">
              <p className="mt-2 mb-5 text-3xl text-black font-medium">
                {video_descr || 'aa'}
              </p>
              <p className="mt-2 mb-5 text-2xl text-slate-600 font-medium">
                {name || 'aa'} {l_name || 'aa'}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* <div className="font-sans bg-white pb-20 mx-auto flex justify-center">
        <div className="p-6 lg:max-w-7xl max-w-2xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 mt-10">

            <div className="lg:col-span-
              <div className="mt-8">
                <p className="text-lg text-gray-800 mt-3">
                  {content[selectedLanguage].buy.period}{' '}
                  <span className="font-bold text-black">
                    {period || 'SAT | IELTS'}{' '}
                    {content[selectedLanguage].buy.month}
                  </span>
                </p>
              </div>
              
              
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CoffeeComponent;
