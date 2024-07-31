import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import bgimg from '../../../images/logo/partners.svg';
import backurl from '../../../links';
import { NavLink } from 'react-router-dom';
import { TiArrowRightThick } from 'react-icons/ti';
import { FaPhoneVolume } from 'react-icons/fa6';

import content from '../../../localization/content';
import useLang from '../../../hooks/useLang';

function AllPartnersLandingPage() {
  const [course, setCourses] = useState([]);
  const [selectedLand] = useLang();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/get/all/company`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversed = data.Company;

        console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>

      <main className="flex flex-col md:flex-row items-center py-10 md:py-0 w-full container bg-slate-100 justify-center mx-auto">
        <div className="z-10 px-4 md:px-0 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-3/4 md:pr-8">
            <h1>{content[selectedLand as string].company.join}</h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
              {content[selectedLand as string].company.text}
            </p>
            <a
              href="https://t.me/behruzz_14"
              target="_blank"
              className="flex flex-row inline-block justify-center w-60 items-center bg-fuchsia-800 hover:scale-105 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-lg font-semibold shadow-md hover:bg-fuchsia-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-opacity-75"
            >
              <span className="me-2">
                <FaPhoneVolume />
              </span>
              {content[selectedLand as string].company.contact}
            </a>
          </div>
          <div className="md:w-2/3 mt-8 md:mt-0">
            <img src={bgimg} alt="Partners" className="w-full h-auto" />
          </div>
        </div>
      </main>

      <div className="bg-white py-10 px-7 ">
        <div className="text-black text-center text-lg md:text-2xl uppercase">
          {content[selectedLand as string].company.partner}
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course && course.length > 0 ? (
              course.map((e: any) => (
                <div
                  className="flex flex-col md:flex-row mt-10 items-center bg-slate-100 p-4 md:p-10 rounded-xl hover:scale-105 transition-transform easy-2 "
                  key={e.company_id}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <img
                      src={`${backurl}upload/${e.image}`}
                      alt={e.name}
                      className="w-20 h-20 md:w-32 md:h-32 object-contain"
                    />
                    <div className="mt-4 md:mt-0 md:ms-10 ">
                      <h2 className="text-center text-black text-xl md:text-3xl font-medium">
                        {e.name}
                      </h2>
                      <NavLink
                        to={`/partners/${e.idname}`}
                        className="flex flex-row items-center mt-3 inline-block bg-slate-100 text-black hover:opacity-50"
                      >
                        {content[selectedLand as string].company.more}
                        <span className="ms-2">
                          <TiArrowRightThick />
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Don't have any companies
              </p>
            )}
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AllPartnersLandingPage;
