// IntroSection.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

import Brand from '../../../images/brand/intro1.png';
import introimg from '../../../images/brand/intro2.svg';

const IntroSection = () => {
  const [selectedLanguage] = useLang();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-200 relative">
      <div className="relative isolate px-6 pt-0 lg:px-8">
        <div
          className="absolute inset-x-0 -top-10 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-0"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-45">
          <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {content[selectedLanguage as string].intro.heading}
            </h1>
            <p className="mt-6 md:mt-8 lg:mt-10 text-lg md:text-xl lg:text-2xl leading-loose text-gray-600">
              {content[selectedLanguage as string].intro.p}
            </p>
            <div className="mt-10 flex items-center justify-left gap-x-6">
              <NavLink
                to="/all/courses"
                className="rounded-md uppercase bg-fuchsia-900 px-7 py-3 md:px-10 md:py-3 text-sm md:text-md font-semibold text-white shadow-sm hover:bg-fuchsia-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {content[selectedLanguage as string].intro.get}
              </NavLink>
              <NavLink
                to="/about/us"
                className="text-xs md:text-sm uppercase font-semibold leading-6 text-gray-900 hover:text-fuchsia-900"
              >
                {content[selectedLanguage as string].intro.about}
                <span aria-hidden="true" className="ms-2">
                  →
                </span>
              </NavLink>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
      <div className="hidden md:block">
        <img src={introimg} alt="intro image" width="550" />
      </div>
    </div>
  );
};

export default IntroSection;
