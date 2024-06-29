import React, { useEffect, useState } from 'react';
import { Rating } from '@material-tailwind/react';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../links';
import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

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
        setData(data.getidbycourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [course_id]);

  const givenRatingIntoCourse = () => {
    switch (data?.rating) {
      case 'very bad':
        return 1;
      case 'bad':
        return 2;
      case 'good':
        return 3;
      case 'better':
        return 4;
      case 'best':
        return 5;
      default:
        return 0;
    }
  };

  if (!data) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const { image, title, price, descr, period, name, l_name } = data;

  return (
    <div className="font-sans bg-white pb-20 mx-auto flex justify-center">
      <div className="p-6 lg:max-w-7xl max-w-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-10">
          <div className="lg:col-span-2 bg-gray-100 rounded-sm w-full lg:sticky top-0 text-center p-8">
            <img
              src={`${backurl}upload/${image || 'SAT | IELTS'}`}
              alt="Product"
              className="w-full h-full object-contain"
              // width="400"
              // height="300"
            />
            {/* <hr className="border-white border-2 my-6" /> */}
            {/* <Rating value={givenRatingIntoCourse()} readonly /> */}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-2xl font-extrabold text-black mt-7">
              {title || 'SAT | IELTS'}
            </h2>
            <p className="text-gray-800 text-xl font-extrabold mt-4">
              {price
                ? price.toLocaleString('en-US').replace(/,/g, ' ')
                : 'SAT | IELTS'}{' '}
              UZS
            </p>
            <div className="mt-8">
              <h3 className="text-md text-black">
                {content[selectedLanguage].buy.about}
              </h3>
              <p className="text-lg font-bold text-black mt-3">
                {descr || 'SAT | IELTS'}
              </p>
              <p className="text-lg text-gray-800 mt-3">
                {content[selectedLanguage].buy.period}{' '}
                <span className="font-bold text-black">
                  {period || 'SAT | IELTS'}{' '}
                  {content[selectedLanguage].buy.month}
                </span>
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-black">
                {content[selectedLanguage].buy.teacher}
              </h3>
              <p className="text-sm font-bold text-gray-800 mt-3 uppercase">
                {name || 'SAT | IELTS'} {l_name || 'SAT | IELTS'}
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
              <NavLink
                to="/auth/signup"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 py-3 px-6 text-center font-medium text-white hover:bg-blue-800 sm:px-8 lg:px-10"
              >
                {content[selectedLanguage].buy.buy}
              </NavLink>
              <NavLink
                to="/auth/signup"
                className="inline-flex items-center justify-center rounded-full bg-green-700 py-3 px-6 text-center font-medium text-white hover:bg-green-800 sm:px-8 lg:px-10"
              >
                {content[selectedLanguage].buy.free}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeComponent;
