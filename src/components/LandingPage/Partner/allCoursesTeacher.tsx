import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import backurl from '../../../links';

function AllCourseTeacherLanding() {
  const [allTeachers, setAllTeachers] = useState([]);
  const [name, setName] = useState('');
  const { user_id } = useParams();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${backurl}api/get/course/teachers/${user_id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const reversed = data.Company.reverse();
        const teacherName = `${data.Company[0].name} ${data.Company[0].l_name}`;
        setName(teacherName);
        setAllTeachers(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, [user_id]);

  return (
    <div>
      <header>
        <Header />
      </header>

      <main className="bg-white mx-auto p-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{name}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-3 mx-auto">
            {allTeachers && allTeachers.length > 0 ? (
              allTeachers.map((product: any) => (
                <NavLink
                  to={`/all/courses/${product.course_id}`}
                  key={product.course_id}
                  className="group bg-slate-100 hover:bg-slate-200 rounded-lg p-4 hover:scale-105 transition-transform ease-in-out duration-300"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={`${backurl}upload/${product.course_image}`}
                      alt="course image"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-black">
                    {product.course_title}
                  </h3>
                  <p className="mt-2 text-2xl text-black font-bold">
                    {product.price.toLocaleString('en-US').replace(/,/g, ' ')}{' '}
                    UZS
                  </p>
                </NavLink>
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AllCourseTeacherLanding;
