import React from 'react';

import Header from '../../../components/LandingPage/Header/header';
import IntroSection from '../../../components/LandingPage/Intro/intro';
import Courses from '../../../components/LandingPage/Courses/courses';
import ContactForm from '../../../components/LandingPage/Contact/contact';
import Footer from '../../../components/LandingPage/Footer/footer';

function Home() {
  return (
    <div className="landing-home">
      <header className="z-50">
        <Header />
      </header>

      <main className="">
        <IntroSection />
        <Courses />
      </main>

      <section>
        <ContactForm />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
