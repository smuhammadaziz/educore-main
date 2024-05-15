import React from 'react';
import Header from '../../../components/LandingPage/Header/header';
import Footer from '../../../components/LandingPage/Footer/footer';
import OneBlogLanding from '../../../components/LandingPage/oneBlog/oneBlog';

function OneBlogPage() {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        <OneBlogLanding />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default OneBlogPage;
