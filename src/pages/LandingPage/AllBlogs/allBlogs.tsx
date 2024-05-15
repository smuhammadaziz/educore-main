import React from 'react';
import Header from '../../../components/LandingPage/Header/header';
import Footer from '../../../components/LandingPage/Footer/footer';
import AllBlogsLandingPage from '../../../components/LandingPage/allBlogs/allblogs';

function AllBlogsLanding() {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        <AllBlogsLandingPage />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AllBlogsLanding;
