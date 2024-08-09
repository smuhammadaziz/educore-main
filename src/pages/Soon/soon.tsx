import React from 'react';

const ComeBackSoonPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-4 sm:p-6 md:p-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8">
        We will come back <span className="text-fuchsia-500">soon ...</span>{' '}
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10">
        We're currently making some updates to our website. In the meantime,
        please visit our Telegram channel for the latest news and updates.
      </p>
      <a
        href="https://t.me/educore_org"
        target="_blank"
        className="bg-white text-purple-700 hover:text-pink-500 font-semibold py-2 px-4 rounded shadow-md transition-colors duration-300 text-sm sm:text-base md:text-lg"
      >
        Go to the Telegram Channel
      </a>
    </div>
  );
};

export default ComeBackSoonPage;
