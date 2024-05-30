import React, { useEffect, useState } from 'react';
import { Rating } from '@material-tailwind/react';
import { NavLink, useParams } from 'react-router-dom';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import backurl from '../../../../links';

const BuyOneCourseNowStudent = () => {
  const { course_id } = useParams();
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchCourseData() {
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
    fetchCourseData();
  }, [course_id]);

  useEffect(() => {
    async function fetchProfileData() {
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
        setProfile(data.Profil);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfileData();
  }, [token]);

  const renderRating = () => {
    switch (data.rating) {
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

  return (
    <DefaultLayoutStudent>
      <div className="font-sans bg-white pb-20" key={course_id}>
        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          <div className="grid flex items-center grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-100 rounded-sm p-8 flex flex-col justify-center items-center">
              <img
                src={`${backurl}upload/${data.image || 'SAT | IELTS'}`}
                alt="Product"
                className="w-150 rounded object-cover mx-auto sm:w-200 md:w-250"
              />
              <hr className="border-white border-2 my-6" />
              {/* <Rating value={renderRating()} /> */}
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-gray-800">
                Course Name: {data.title || 'SAT | IELTS'}
              </h2>
              <p className="text-gray-800 text-xl font-extrabold text-5xl mt-4">
                Price:{' '}
                {data && data.price
                  ? data.price.toLocaleString('en-US').replace(/,/g, ' ') ||
                    'SAT | IELTS'
                  : '100'}{' '}
                UZS
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">
                  About the course
                </h3>
                <p className="text-md text-gray-600 mt-3">
                  {data.descr || 'SAT | IELTS'}
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  Period: {data.period || 'SAT | IELTS'} months
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">
                  About the Course Teacher
                </h3>
                <p className="text-md text-gray-600 mt-3">
                  {`${data.name || 'SAT | IELTS'} ${
                    data.l_name || 'SAT | IELTS'
                  }`}
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  Email: {data.email || 'SAT | IELTS'}
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  Phone number: {data.phone || 'SAT | IELTS'}
                </p>
              </div>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                {!profile.group_id && (
                  <NavLink
                    to={`/dashboard/student/courses/buy/${course_id}`}
                    className="inline-flex items-center justify-center rounded-full bg-primary py-3 px-9 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Buy now
                  </NavLink>
                )}

                {profile.free_trial && (
                  <NavLink
                    to={`/dashboard/student/courses/use/free/${course_id}`}
                    className="inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-9 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Use Free Trial
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
};

export default BuyOneCourseNowStudent;
