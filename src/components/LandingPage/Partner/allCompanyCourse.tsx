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
            <div className=" space-y-10 w-full">
              <button
                onClick={() => {
                  setSelectedSection('teachers');
                  scrollToSection('teachers');
                }}
                className={`flex w-100 items-center px-4 py-5 uppercase font-medium bg-fuchsia-800 text-white rounded-lg shadow-lg transition-transform transform ${
                  selectedSection === 'teachers' ? 'scale-105' : 'scale-100'
                } hover:scale-105`}
              >
                <FaChalkboardTeacher className="mr-2 text-2xl" />
                See All Teachers
              </button>
              <button
                onClick={() => {
                  setSelectedSection('courses');
                  scrollToSection('courses');
                }}
                className={`flex w-100 items-center px-4 py-5 bg-fuchsia-800 uppercase font-medium text-white rounded-lg shadow-lg transition-transform transform ${
                  selectedSection === 'courses' ? 'scale-105' : 'scale-100'
                } hover:scale-105`}
              >
                <FaBook className="mr-2 text-2xl" />
                See All Courses
              </button>
              <button
                onClick={() => {
                  setSelectedSection('contact');
                  scrollToSection('contact');
                }}
                className={`flex w-100 items-center px-4 py-5 bg-fuchsia-800 uppercase font-medium text-white rounded-lg shadow-lg transition-transform transform ${
                  selectedSection === 'contact' ? 'scale-105' : 'scale-100'
                } hover:scale-105`}
              >
                <FaEnvelope className="mr-2 text-2xl" />
                Contact Information
              </button>
            </div>
          </div>
        );
      case 'teachers':
        return (
          <div
            ref={teachersSectionRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-3 mt-10 mx-auto"
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
                        className="w-50 h-50 mx-auto border-2 border-fuchsia-950 object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl mt-6 font-bold text-black uppercase">
                        {teacher.name} {teacher.l_name}
                      </h3>
                    </div>
                    <NavLink
                      to={`/all/courses/teacher/${teacher.user_id}`}
                      className="bg-fuchsia-700 text-white font-medium text-xl py-2 px-4 mt-7 inline-block rounded-lg hover:bg-fuchsia-800"
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
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 mt-10 mx-auto"
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
                        className="w-100 h-64 object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-700">
                      {course.course_title}
                    </h3>
                    <h3 className="text-lg font-bold text-black uppercase">
                      {course.name} {course.l_name}
                    </h3>
                    <p className="mt-5 text-2xl text-black font-bold">
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
              <h2 className="text-2xl font-semibold">+998 90 819 22 22</h2>
            </div>
            <iframe
              src="https://maps.app.goo.gl/45EJP5iEvp1m15Hk7"
              title="Yandex Map"
              width="600"
              height="450"
              frameBorder="0"
              allowFullScreen
              className="w-full h-96 rounded-lg"
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
};

export default AllCompanyCourseLanding;
