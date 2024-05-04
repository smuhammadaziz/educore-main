import React from 'react';

import AllCourses from '../../../components/LandingPage/allCourses/all';
import Header from '../../../components/LandingPage/Header/header';
import Footer from '../../../components/LandingPage/Footer/footer';

function AllCoursesPage() {
  return (
    <div className="landing-allcourses">
      <header>
        <Header />
      </header>

      <AllCourses />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AllCoursesPage;
