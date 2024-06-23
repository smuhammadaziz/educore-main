import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import backurl from '../../../../links';
import { MdOutlineAddCircle } from 'react-icons/md';

import { CgDetailsMore } from 'react-icons/cg';
import { RiAddCircleFill } from 'react-icons/ri';

function AllGroupViewCourseStudent() {
  const { course_id } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/teacher/course/groups/${course_id}`,
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
        setGroups(data.Data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [course_id, token]);

  if (loading) {
    return (
      <DefaultLayoutTeacher>
        <div className="text-center py-10">Loading...</div>
      </DefaultLayoutTeacher>
    );
  }

  if (error) {
    return (
      <DefaultLayoutTeacher>
        <div className="text-center py-10 text-red-600">{error}</div>
      </DefaultLayoutTeacher>
    );
  }

  return (
    <DefaultLayoutTeacher>
      <div className="right-0 top-0 mx-auto mb-10 ">
        <h2 className="text-2xl mb-5 mx-auto justify-center text-center dark:text-white">
          My <span className="underline">Groups</span> List
        </h2>
        <NavLink
          to={`/dashboard/teacher/add/new/groups/${course_id}`}
          className="mx-auto justify-center text-center flex items-center w-55 text-sm py-3 px-12 bg-blue-700 text-white rounded hover:bg-blue-800 active:bg-blue-400"
        >
          <span className="me-3">
            <MdOutlineAddCircle />
          </span>
          Add new group
        </NavLink>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {groups.length > 0 ? (
            groups.map((group: any) => (
              <div
                key={group.group_id}
                className="group bg-white p-5 rounded-lg shadow-md dark:bg-slate-700 dark:text-white hover:shadow-xl"
              >
                <h3 className="mt-4 text-xl font-bold text-gray-700 dark:text-white">
                  {group.g_name}
                </h3>
                <hr className="my-5 border-slate-400" />
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  Lesson days: {group.l_days}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  Maximum group <samp></samp>ize: {group.user_count} students
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 text-left dark:text-white">
                  Lesson Time: {group.subj_start} - {group.subj_end}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 text-left dark:text-white">
                  Created Time: {moment(group.created_at).format('LLL')}
                </p>
                <hr className="my-5 border-slate-400" />
                <NavLink
                  to={`/dashboard/teacher/my/all/groups/${group.group_id}`}
                  className="flex items-center justify-center  w-27 text-center inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300"
                >
                  <span className="me-2">
                    <CgDetailsMore />
                  </span>
                  View
                </NavLink>
              </div>
            ))
          ) : (
            <p className="text-center mx-auto justify-center text-gray-700 dark:text-white">
              You have no groups
            </p>
          )}
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AllGroupViewCourseStudent;
