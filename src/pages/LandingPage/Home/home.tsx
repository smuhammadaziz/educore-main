import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import Header from '../../../components/LandingPage/Header/header';
import IntroSection from '../../../components/LandingPage/Intro/intro';
import Courses from '../../../components/LandingPage/Courses/courses';
import ContactForm from '../../../components/LandingPage/Contact/contact';
import Footer from '../../../components/LandingPage/Footer/footer';
import Testimonials from '../../../components/LandingPage/testimonials/testi';
import Blogs from '../../../components/LandingPage/Blogs/blogs';
import CountdownLanding from '../../../components/LandingPage/countdown/count';
import VideoComponentHome from '../../../components/LandingPage/Video/video';

import welcome from '../../../images/task/modern-welcome-composition-with-gradient-style.png';
import { NavLink } from 'react-router-dom';

import content from '../../../localization/content';
import useLang from '../../../hooks/useLang';

// Set the app element for accessibility
ReactModal.setAppElement('#root');

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedLanguage] = useLang();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="landing-home">
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80"
      >
        <div className="relative text-black bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center w-full md:max-w-xl lg:max-w-2xl">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-700  hover:text-gray-900 transition duration-300"
          >
            <FaTimes size={24} color="black" />
          </button>
          <img
            src={welcome}
            alt="welcome"
            className="mx-auto w-3/4 md:w-2/4 lg:w-2/4 mb-6"
          />
          <h2 className="text-2xl md:text-4xl font-medium font-mono mb-6 ">
            {content[selectedLanguage as string].sodiq.enrol}
          </h2>
          <h2 className="text-xl md:text-xl font-bold mb-4">
            {content[selectedLanguage as string].sodiq.today}
          </h2>
          <div className="flex flex-col md:flex-row md:justify-center gap-4 mb-6">
            <NavLink
              to="/auth/signup"
              className="mt-2 font-bold uppercase px-4 py-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-700 transition duration-300"
            >
              {content[selectedLanguage as string].marathon.register}
            </NavLink>
          </div>
        </div>
      </ReactModal>

      <header className="z-50">
        <Header />
      </header>

      <main>
        <CountdownLanding />
        <IntroSection />
        <VideoComponentHome />
        <Courses />
      </main>

      <section>
        <Testimonials />
        <Blogs />
        <ContactForm />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
