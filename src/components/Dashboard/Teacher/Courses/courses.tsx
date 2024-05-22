import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backurl from '../../../../links';

export default function AllCoursesListTeacher() {
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.Data.reverse();

        // console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="right-0 top-0 mx-auto ">
        <h2 className="text-2xl mb-5">
          My <span className="underline">Courses</span> List
        </h2>
        <NavLink
          to="/dashboard/teacher/add/new/course"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Course
        </NavLink>
      </div>
      <div className="bg-gray-100 my-20">
        <div className="mt-10 grid lg:grid-cols-3">
          {courses && courses
            ? courses.map((e) => (
                <div className="my-20 mx-4" key={e.course_id}>
                  <img
                    src={`${backurl}upload/${e.image}`}
                    alt={e.title}
                    className="h-full w-full object-cover object-center"
                  />
                  <h2 className="text-2xl mt-5">{e.title}</h2>
                  <NavLink
                    to={`/dashboard/teacher/course/${e.course_id}`}
                    className="bg-blue-600 py-2 px-5 text-white rounded hover:bg-blue-400 mt-5 inline-block"
                  >
                    More
                  </NavLink>
                </div>
              ))
            : "user don't have any courses"}
        </div>
      </div>
    </>
  );
}
