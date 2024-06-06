import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import backurl from '../../../../links';

const AllStudentListTeacher = () => {
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/groups`, {
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
      <div className="right-0 top-0 mb-10 mx-auto">
        <h2 className="text-3xl mb-5 dark:text-white text-center font-bold">
          All <span className="underline">Students</span> List
        </h2>
      </div>
      <div className="bg-gray-100 my-20">
        <h2 className="text-left font-bold text-xl text-center dark:text-white">
          Select one group and see your students
        </h2>
        <div className="mt-2 grid lg:grid-cols-3">
          {courses && courses
            ? courses.map((e: any) => (
                <div
                  className="my-10 mx-4 dark:bg-strokedark dark:text-white  block p-4 bg-white rounded shadow-xl hover:shadow-2xl"
                  key={e.course_id}
                >
                  <h2 className="text-2xl mt-5">{e.g_name}</h2>
                  <h2 className="text-lg mt-5">
                    {e.subj_start} - {e.subj_end}
                  </h2>
                  <NavLink
                    to={`/dashboard/teacher/group/students/${e.group_id}`}
                    className="bg-blue-600 py-2 px-5 text-white rounded hover:bg-blue-400 mt-5 inline-block"
                  >
                    See all students
                  </NavLink>
                </div>
              ))
            : "user don't have any courses"}
        </div>
      </div>
    </>
  );
};

export default AllStudentListTeacher;
