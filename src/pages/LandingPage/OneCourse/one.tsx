import React from 'react';

import AllCourses from '../../../components/LandingPage/allCourses/all';
import Header from '../../../components/LandingPage/Header/header';
import Footer from '../../../components/LandingPage/Footer/footer';
import OneCourse from '../../../components/LandingPage/oneCourse/one';

function OneCoursePage() {
  return (
    <div className="landing-allcourses">
      <header>
        <Header />
      </header>

      <OneCourse />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default OneCoursePage;
