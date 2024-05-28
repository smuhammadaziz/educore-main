import React, { useEffect, useState } from 'react';

import { Rating } from '@material-tailwind/react';
import { NavLink, useParams } from 'react-router-dom';

import DefaultLayoutStudent from '../../../../layout/DefaultStudent';

import backurl from '../../../../links';

const BuyOneCourseNowStudent = () => {
  const { course_id } = useParams();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState([]);

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

        const allCourse = data.getidbycourse;

        setData(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  const givenRatingIntoCouse = () => {
    if (data.rating) {
      if (data.rating == 'very bad') {
        return 1;
      } else if (data.rating == 'bad') {
        return 2;
      } else if (data.rating == 'good') {
        return 3;
      } else if (data.rating == 'better') {
        return 4;
      } else if (data.rating == 'best') {
        return 5;
      }
    }
  };

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const allCourse = data.Profil;

        setProfile(allCourse);

        // console.log(allCourse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <DefaultLayoutStudent>
      <div className="font-sans bg-white pb-20" key={course_id}>
        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 mt-10">
            <div className="lg:col-span-3 bg-gray-100 rounded-sm w-full lg:sticky top-0 text-center p-8">
              <img
                src={`${backurl}upload/${
                  data && data['image'] ? data['image'] : 'SAT | IELTS'
                }`}
                alt="Product"
                className="w-150 rounded object-cover mx-auto sm:w-200 md:w-250"
              />

              <hr className="border-white border-2 my-6" />
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">
                Course Name:{' '}
                {data && data['title'] ? data['title'] : 'SAT | IELTS'}
              </h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-extrabold text-5xl ">
                  Price: {data && data['price'] ? data['price'] : 'SAT | IELTS'}{' '}
                  UZS
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <p className="bg-black px-4 py-2 rounded-full text-white text-xl font-extrabold text-5xl ">
                  {/* {givenRatingIntoCouse()} */}4.2
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">
                  About the course
                </h3>
                <p className="text-md font-bold text-gray-00 mt-3">
                  {data && data['descr'] ? data['descr'] : 'SAT | IELTS'}
                </p>
                <p className="text-sm font-bold text-gray-00 mt-3">
                  Period:{' '}
                  {data && data['period'] ? data['period'] : 'SAT | IELTS'}{' '}
                  months
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">
                  About the Course Teacher
                </h3>
                <p className="text-md font-bold text-gray-00 mt-3">
                  {data && data['name'] ? data['name'] : 'SAT | IELTS'}{' '}
                  {data && data['l_name'] ? data['l_name'] : 'SAT | IELTS'}
                </p>
                <p className="text-sm font-bold text-gray-00 mt-3">
                  Email: {data && data['email'] ? data['email'] : 'SAT | IELTS'}
                </p>
                <p className="text-sm font-bold text-gray-00 mt-3">
                  Phone number:{' '}
                  {data && data['phone'] ? data['phone'] : 'SAT | IELTS'}
                </p>
              </div>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <NavLink
                  to={`/dashboard/student/courses/buy/${course_id}`}
                  className="inline-flex items-center justify-center rounded-full bg-primary py-3 px-9 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Buy now
                </NavLink>
                {profile.free_trial ? (
                  <NavLink
                    to={`/dashboard/student/courses/use/free/${course_id}`}
                    className="inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-9 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Use Free Trial
                  </NavLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
};

export default BuyOneCourseNowStudent;
