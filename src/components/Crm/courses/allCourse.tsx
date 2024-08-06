import React, { useEffect, useState } from 'react';

import DefaultLayoutSodiqAcademy from '../../../layout/crm/DefaultSodiq';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../links';

function AllCoursesSodiqAcademy() {
  const [contact, setContact] = useState([]);

  const token = localStorage.getItem('TOKEN');
  const { company_id } = useParams();

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${backurl}api/cadmin/get/courses/${company_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);

        setContact(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContact();
  }, [company_id, token]);
  return (
    <DefaultLayoutSodiqAcademy>
      {/* <div>AllCoursesSodiqAcademy</div> */}
      <div
        // ref={coursesSectionRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10 mx-auto"
      >
        {contact && contact.length > 0
          ? contact.map((course: any) => (
              <div
                // to={`/all/courses/${course.course_id}`}
                key={course.course_id}
                className="group bg-white px-4 py-5 rounded-lg transition-transform ease-in-out duration-300"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={`${backurl}upload/${course.course_image}`}
                    alt="course"
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                </div>
                <h3 className="mt-5 text-sm sm:text-lg font-bold text-gray-700">
                  {course.course_title}
                </h3>
                <h3 className="text-sm sm:text-lg font-bold text-black uppercase">
                  {course.name} {course.l_name}
                </h3>
                <p className="mt-2 text-lg sm:text-2xl text-black font-bold">
                  {course.price.toLocaleString('en-US').replace(/,/g, ' ')} UZS
                </p>
                <div className="mt-5">
                  {/* <button className="border-2 text-lg border-slate-300 font-medium text-black py-1 rounded-lg px-4 mb-2 sm:mb-0 sm:mr-2 hover:scale-105">
                    Edit
                  </button> */}
                  {/* <button className="border-2 border-slate-300 font-medium text-black py-1 rounded-lg px-3 hover:scale-105 sm:mr-2">
                        Delete
                      </button> */}
                  <NavLink
                    to={`/dashboard/sodiq-academy/course/get/${course.course_id}`}
                    className="border-2 text-lg  border-slate-300 font-medium text-black py-1 rounded-lg px-4 hover:scale-105"
                  >
                    More
                  </NavLink>
                </div>
              </div>
            ))
          : 'No courses available'}
      </div>
    </DefaultLayoutSodiqAcademy>
  );
}

export default AllCoursesSodiqAcademy;
