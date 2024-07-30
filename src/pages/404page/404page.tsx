import React from 'react';
import { Link } from 'react-router-dom';

// import logo from '../../images/logo/logo-icon-only.svg';
import logo from '../../images/logo/logo-light-1.svg';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <img src={logo} alt="" className="mx-auto mb-10" width="300" />
        <h1 className="text-9xl font-extrabold text-white ">404</h1>
        <p className="text-2xl md:text-3xl font-medium mt-4 text-white">
          Oops! Page not found
        </p>
        <p className="text-md md:text-lg text-gray-500 mt-2 text-white">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-medium text-black bg-white hover:scale-105 rounded transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
