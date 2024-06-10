import React, { useEffect, useState } from 'react';
import backurl from '../../../links';
import { NavLink } from 'react-router-dom';

function OurPartnersLanding() {
  const [course, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/get/all/company`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversed = data.Company;
        // console.log(reversed);
        setCourses(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 mt-20">
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
            Our Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-12">
            {course && course.length > 0 ? (
              course.map((e: any) => (
                <div className="justify-center items-center" key={e.company_id}>
                  <NavLink to={`/all/courses/company/${e.company_id}`}>
                    <img
                      src={`${backurl}upload/${e.image}`}
                      alt={e.name}
                      className="w-full h-32 object-contain"
                    />
                  </NavLink>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                Don't have any companies
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurPartnersLanding;
