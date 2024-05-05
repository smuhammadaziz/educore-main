import React from 'react';

import Header from '../../../components/LandingPage/Header/header';

import Footer from '../../../components/LandingPage/Footer/footer';
import AboutUs from '../../../components/LandingPage/About/about';
import AboutMore from '../../../components/LandingPage/About/aboutmore';

function AboutUsPage() {
  return (
    <div className="landing-AboutUsPage">
      <header className="z-50">
        <Header />
      </header>

      <main>
        <AboutUs />
        <AboutMore />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AboutUsPage;
