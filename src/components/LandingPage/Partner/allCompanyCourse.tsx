import React, { useEffect, useState, useRef } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import backurl from '../../../links';
import { NavLink, useParams } from 'react-router-dom';
import useLang from '../../../hooks/useLang';

import bgimg from '../../../images/sodiq/12logo.png';
import logo from '../../../images/sodiq/Artboard 17 copy.png';
import avatar from '../../../images/sodiq/demo-user.jpg';

import { FaChalkboardTeacher, FaBook, FaEnvelope } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

// Define types for course and teacher data
interface Course {
  course_id: string;
  course_image: string;
  course_title: string;
  name: string;
  l_name: string;
  price: number;
}

interface Teacher {
  user_id: string;
  user_image: string;
  name: string;
  l_name: string;
}

const AllCompanyCourseLanding: React.FC = () => {
  const [course, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
  const [selectedSection, setSelectedSection] = useState<
    'main' | 'teachers' | 'courses' | 'contact'
  >('main');
  const [selectedLanguage] = useLang();
  const { company_id } = useParams<{ company_id: string }>();

  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

  // Refs for sections
  const teachersSectionRef = useRef<HTMLDivElement | null>(null);
  const coursesSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);

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

        // console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [company_id]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await fetch(
          `${backurl}api/get/company/teachers/${company_id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversed = data.Company.reverse();
        setAllTeachers(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeachers();
  }, [company_id]);

  // Get current courses
  const indexOfLastCourse = currentPage * productsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - productsPerPage;
  const currentCourses = course.slice(indexOfFirstCourse, indexOfLastCourse);

  const scrollToSection = (section: 'teachers' | 'courses' | 'contact') => {
    switch (section) {
      case 'teachers':
        teachersSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'courses':
        coursesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'main':
        return (
          <div>
            <h2 className="text-center md:text-left text-medium text-2xl uppercase text-black">
              Sodiq teachers
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mt-10 mx-auto">
              {allTeachers && allTeachers.length > 0
                ? allTeachers.slice(-3).map((teacher) => (
                    <div
                      key={teacher.user_id}
                      className="flex flex-col sm:flex-row items-center bg-slate-100 p-5 py-4 rounded-lg hover:bg-slate-200"
                    >
                      <img
                        src={
                          teacher.user_image
                            ? `${backurl}upload/${teacher.user_image}`
                            : avatar
                        }
                        alt="teacher"
                        className="w-24 h-24 sm:w-15 sm:h-15 mx-auto border object-cover rounded-full"
                      />
                      <h3 className="text-center sm:text-left text-md sm:text-lg font-bold text-black uppercase mt-4 sm:mt-0 sm:ml-4">
                        {teacher.name} {teacher.l_name}
                      </h3>
                    </div>
                  ))
                : 'No teachers available'}
              <div className="w-full flex justify-center items-center mt-6">
                <button
                  onClick={() => {
                    setSelectedSection('teachers');
                    scrollToSection('teachers');
                  }}
                  className="flex flex-row items-center bg-slate-100 hover:scale-105 text-black px-4 py-2 rounded-full hover:bg-slate-300 transition-all duration-300"
                >
                  <FaArrowRight className="mr-2" size={20} />
                  <span className="text-xl inline-block">Show More</span>
                </button>
              </div>
            </div>

            <h2 className="text-center md:text-left text-medium text-2xl uppercase text-black mt-10">
              Sodiq courses
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mt-10 mx-auto">
              {currentCourses && currentCourses.length > 0
                ? currentCourses.slice(-3).map((teacher) => (
                    <div
                      key={teacher.user_id}
                      className="flex flex-col items-center bg-slate-100 p-5 pt-6 py-4 rounded-lg hover:bg-slate-200"
                    >
                      <img
                        src={
                          teacher.course_image
                            ? `${backurl}upload/${teacher.course_image}`
                            : avatar
                        }
                        alt="teacher"
                        className="w-24 h-24 sm:w-50 sm:h-50 mx-auto rounded-xl"
                      />
                      <h3 className="text-center text-md sm:text-lg font-bold text-black uppercase mt-5 mb-2">
                        {teacher.course_title}
                      </h3>
                      <h3 className="text-center text-md sm:text-md font-bold text-black uppercase">
                        {teacher.name} {teacher.l_name}
                      </h3>
                      <p className="mt-2 text-lg sm:text-2xl text-black font-bold">
                        {teacher.price
                          .toLocaleString('en-US')
                          .replace(/,/g, ' ')}{' '}
                        UZS
                      </p>
                    </div>
                  ))
                : 'No teachers available'}
              <div className="w-full flex justify-center items-center mt-6">
                <button
                  onClick={() => {
                    setSelectedSection('courses');
                    scrollToSection('courses');
                  }}
                  className="flex flex-row items-center bg-slate-100 text-black hover:scale-105 px-4 py-2 rounded-full hover:bg-slate-300 transition-all duration-300"
                >
                  <FaArrowRight className="mr-2" size={20} />
                  <span className="text-xl inline-block">Show More</span>
                </button>
              </div>
            </div>

            <h2 className="text-center md:text-left text-medium text-2xl uppercase text-black mt-10">
              Sodiq contacts
            </h2>
            <button
              onClick={() => {
                setSelectedSection('contact');
                scrollToSection('contact');
              }}
              className={`flex flex-row mx-auto md:mx-0  items-center sm:flex-row items-center mt-5 px-4 py-3 sm:py-5 bg-slate-100 uppercase font-medium text-black rounded-lg transition-transform transform ${
                (selectedSection as string) === 'contact'
                  ? 'scale-105'
                  : 'scale-100'
              } hover:scale-105`}
            >
              <FaEnvelope className=" me-2 sm:mb-0 sm:mr-2 text-xl sm:text-2xl" />
              <span>Contact Information</span>
            </button>
          </div>
        );
      case 'teachers':
        return (
          <div
            ref={teachersSectionRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10 mx-auto"
          >
            {allTeachers && allTeachers.length > 0
              ? allTeachers.map((teacher) => (
                  <div
                    key={teacher.user_id}
                    className="group bg-slate-100 p-3 py-5 rounded-lg flex flex-col hover:bg-slate-200"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={
                          teacher.user_image
                            ? `${backurl}upload/${teacher.user_image}`
                            : avatar
                        }
                        alt="teacher"
                        className="w-32 h-32 sm:w-50 sm:h-50 mx-auto border-2 border-fuchsia-950 object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-2xl mt-6 font-bold text-black uppercase">
                        {teacher.name} {teacher.l_name}
                      </h3>
                    </div>
                    <NavLink
                      to={`/all/courses/teacher/${teacher.user_id}`}
                      className="bg-fuchsia-700 text-white font-medium text-sm sm:text-xl py-2 px-4 mt-7 inline-block rounded-lg hover:bg-fuchsia-800"
                    >
                      View courses
                    </NavLink>
                  </div>
                ))
              : 'No teachers available'}
          </div>
        );
      case 'courses':
        return (
          <div
            ref={coursesSectionRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10 mx-auto"
          >
            {currentCourses && currentCourses.length > 0
              ? currentCourses.map((course) => (
                  <NavLink
                    to={`/all/courses/${course.course_id}`}
                    key={course.course_id}
                    className="group bg-slate-100 px-4 py-5 rounded-lg hover:bg-slate-200"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={`${backurl}upload/${course.course_image}`}
                        alt="course"
                        className="w-full h-48 sm:h-64 object-cover"
                      />
                    </div>
                    <h3 className="mt-2 text-sm sm:text-lg font-bold text-gray-700">
                      {course.course_title}
                    </h3>
                    <h3 className="text-sm sm:text-lg font-bold text-black uppercase">
                      {course.name} {course.l_name}
                    </h3>
                    <p className="mt-2 text-lg sm:text-2xl text-black font-bold">
                      {course.price.toLocaleString('en-US').replace(/,/g, ' ')}{' '}
                      UZS
                    </p>
                  </NavLink>
                ))
              : 'No courses available'}
          </div>
        );
      case 'contact':
        return (
          <div ref={contactSectionRef}>
            <div className="flex items-center mb-4">
              <FaPhone className="mr-2 text-xl" />
              <h2 className="text-lg sm:text-2xl font-semibold">
                +998 90 819 22 22
              </h2>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d47969.87532992214!2d69.2094423!3d41.2845535!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61b7b9e787ff%3A0x3e5e8515afdccb94!2sSodiq%20maktab!5e0!3m2!1sen!2s!4v1721999677106!5m2!1sen!2s"
              width="600"
              height="600"
              // style="border:0;"
              // allowfullscreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-80 sm:h-100 rounded-lg"
            ></iframe>
          </div>
        );
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
              <div className="relative w-full h-40 sm:h-60">
                <img
                  src={bgimg}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-white text-4xl sm:text-6xl opacity-50 font-bold uppercase">
                    Sodiq Academy
                  </h1>
                </div>
              </div>
              <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 text-center">
                <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-center justify-center">
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="w-32 h-32 sm:w-45 sm:h-45 rounded-full mx-auto"
                  />
                  <div className="text-center sm:text-left sm:ms-10 mt-6 sm:mt-0">
                    <h2 className="text-2xl sm:text-4xl uppercase font-bold">
                      Sodiq Academy
                    </h2>
                    <p className="mt-2 text-lg sm:text-xl text-black">
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

                <div className="flex flex-wrap justify-center space-x-4 sm:space-x-10 text-lg sm:text-2xl mb-6 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => {
                      setSelectedSection('main');
                      scrollToSection('main');
                    }}
                    className={`px-4 py-2 ${
                      selectedSection === 'main'
                        ? 'text-black font-bold'
                        : 'text-gray-500'
                    }`}
                  >
                    Main
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSection('teachers');
                      scrollToSection('teachers');
                    }}
                    className={`px-4 py-2 ${
                      selectedSection === 'teachers'
                        ? 'text-black font-bold'
                        : 'text-gray-500'
                    }`}
                  >
                    Teachers
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSection('courses');
                      scrollToSection('courses');
                    }}
                    className={`px-4 py-2 ${
                      selectedSection === 'courses'
                        ? 'text-black font-bold'
                        : 'text-gray-500'
                    }`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSection('contact');
                      scrollToSection('contact');
                    }}
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
};

export default AllCompanyCourseLanding;
