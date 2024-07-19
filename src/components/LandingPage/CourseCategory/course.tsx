import React, { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa'; // Importing react icons for example
import { NavLink } from 'react-router-dom';
import backurl from '../../../links';

function CourseCategoryHome() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('IELTS');

  const categories = [
    'IELTS',
    'SAT',
    'IGCSE',
    'AS/A-LEVELS',
    'Advanced Placement',
    'International Baccalaureate',
  ];

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/get/landing/all/courses`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const allCourse = data.Courses.reverse();
        setData(allCourse);
        filterCourses(allCourse, 'IELTS'); // Show IELTS courses initially
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  const filterCourses = (courses: any, category: any) => {
    const filtered = courses.filter(
      (course: any) => course.subject === category,
    );
    setFilteredData(filtered);
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    filterCourses(data, category);
  };

  return (
    <div className="bg-fuchsia-900 py-20">
      <div className="container mx-auto justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-left text-5xl font-bold text-white mb-6">
          Courses
        </h2>
        <h2 className="text-left text-2xl w-full sm:w-2/3 font-bold text-white mb-10">
          Connect with Qualified Tutors from around the world and book your
          First Free Trial session.
        </h2>
        <div className="flex flex-wrap space-x-2 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 sm:px-10 text-xl sm:text-2xl py-2 sm:py-3 font-bold rounded ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-fuchsia-950 text-white'
              } mt-2 sm:mt-0`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredData.map((course: any) => (
            <NavLink
              to={`/all/courses/${course.course_id}`}
              key={course.course_id}
              className="bg-white p-4 rounded shadow hover:shadow-2xl shadow-fuchsia-200"
            >
              <FaGraduationCap
                className="text-fuchsia-700 text-3xl mb-2"
                size={50}
              />
              <h3 className="text-3xl font-semibold text-black">
                {course.title}
              </h3>
              <p className="text-gray-700 text-black">
                {course.name} {course.l_name}
              </p>
              <p className="text-gray-900 text-2xl font-bold text-black mt-2">
                {Number(course.price).toLocaleString('en-US')} UZS
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseCategoryHome;
