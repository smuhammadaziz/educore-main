import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import backurl from '../../../links';
import { NavLink, useParams } from 'react-router-dom';
import content from '../../../localization/content';
import useLang from '../../../hooks/useLang';

import bgimg from '../../../images/sodiq/12logo.png';
import logo from '../../../images/sodiq/Artboard 17 copy.png';
import avatar from '../../../images/sodiq/profile-icon-person-user-19.png';

function AllCompanyCourseLanding() {
  const [course, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Set the number of products per page
  const [selectedSection, setSelectedSection] = useState('main');
  const [selectedLanguage] = useLang();
  const { company_id } = useParams();

  const [allTeachers, setAllTeachers] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}api/get/company/courses/${company_id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversed = data.Company.reverse();
        setCourses(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [company_id]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}api/get/company/teachers/${company_id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data);

        const reversed = data.Company.reverse();
        setAllTeachers(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [company_id]);

  // Get current courses
  const indexOfLastCourse = currentPage * productsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - productsPerPage;
  const currentCourses = course.slice(indexOfFirstCourse, indexOfLastCourse);

  const renderContent = () => {
    switch (selectedSection) {
      case 'main':
        return <div>Main content goes here</div>;
      case 'teachers':
        return (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 mt-10 mx-auto">
            {allTeachers && allTeachers.length > 0
              ? allTeachers.map((product: any) => (
                  <div
                    // to={`/all/courses/${product.course_id}`}
                    key={product.user_id}
                    className="group bg-slate-100 p-3 rounded-lg"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={
                          product.user_image
                            ? `${backurl}upload/${product.user_image}`
                            : avatar
                        }
                        alt="course image"
                        className="w-50 h-50 mx-auto border-4 border-fuchsia-900 object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl mt-6 font-bold text-black uppercase">
                      {product.name} {product.l_name}
                    </h3>
                  </div>
                ))
              : 'No courses available'}
          </div>
        );
      case 'courses':
        return (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 mt-10 mx-auto">
            {currentCourses && currentCourses.length > 0
              ? currentCourses.map((product: any) => (
                  <NavLink
                    to={`/all/courses/${product.course_id}`}
                    key={product.course_id}
                    className="group"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={`${backurl}upload/${product.course_image}`}
                        alt="course image"
                        className="w-100 h-64 object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-700">
                      {product.course_title}
                    </h3>
                    <h3 className="text-lg font-bold text-black uppercase">
                      {product.name} {product.l_name}
                    </h3>

                    <p className="mt-5 text-lg font-medium text-gray-900">
                      {product.price.toLocaleString('en-US').replace(/,/g, ' ')}{' '}
                      UZS
                    </p>
                  </NavLink>
                ))
              : 'No courses available'}
          </div>
        );
      case 'contact':
        return <div>Contact content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        <section>
          <div>
            <div className="bg-white">
              <div className="relative w-full h-60">
                <img
                  src={bgimg}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-white text-6xl opacity-50 font-bold uppercase">
                    Sodiq Academy
                  </h1>
                </div>
              </div>
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
                <div className="mb-10 flex items-start w-2/3 mx-auto">
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="w-45 h-45 rounded-full mx-auto"
                  />
                  <div className="text-left ms-10">
                    <h2 className="text-4xl uppercase font-bold">
                      Sodiq Academy
                    </h2>
                    <p className="mt-2 text-xl text-black">
                      Sodiq Academy specializes in guiding and supporting
                      students as they prepare for and pursue their bachelor's
                      degree abroad. Our mission is to provide comprehensive
                      assistance, ensuring students are well-equipped for
                      success in their international higher education endeavors.
                      Join us as we navigate the path to educational excellence
                      together!
                    </p>
                  </div>
                </div>

                <div className="flex justify-center space-x-10 text-2xl mb-10 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setSelectedSection('main')}
                    className={`px-4 py-2 ${
                      selectedSection === 'main'
                        ? 'text-black font-bold'
                        : 'text-gray-500'
                    }`}
                  >
                    Main
                  </button>
                  <button
                    onClick={() => setSelectedSection('teachers')}
                    className={`px-4 py-2 ${
                      selectedSection === 'teachers'
                        ? 'text-black font-bold'
                        : 'text-gray-500'
                    }`}
                  >
                    Teachers
                  </button>
                  <button
                    onClick={() => setSelectedSection('courses')}
                    className={`px-4 py-2 ${
                      selectedSection === 'courses'
                        ? 'text-black font-bold'
                        : 'text-gray-500'
                    }`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => setSelectedSection('contact')}
                    className={`px-4 py-2 ${
                      selectedSection === 'contact'
                        ? 'text-black font-bold'
                        : 'text-gray-500'
                    }`}
                  >
                    Contact
                  </button>
                </div>

                {renderContent()}

                {/* Pagination buttons */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AllCompanyCourseLanding;
