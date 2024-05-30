import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import backurl from '../../../../links';

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
      <div className="right-0 top-0 mx-auto mb-10">
        <h2 className="text-2xl mb-5">
          My <span className="underline">Groups</span> List
        </h2>
        <NavLink
          to={`/dashboard/teacher/add/new/groups/${course_id}`}
          className="text-sm py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add New Group
        </NavLink>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {groups.length > 0 ? (
            groups.map((group) => (
              <div
                key={group.group_id}
                className="group bg-white p-5 rounded-lg shadow-md dark:bg-slate-700 dark:text-white"
              >
                <h3 className="mt-4 text-xl text-gray-700 dark:text-white">
                  {group.g_name}
                </h3>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  Lesson Days: {group.l_days}
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 dark:text-white">
                  Maximum Group Size: {group.user_count} students
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                  Lesson Time: {group.subj_start}:00 - {group.subj_end}:00
                </p>
                <p className="mt-1 text-md font-medium text-gray-900 text-right mt-5 dark:text-white">
                  Created Time: {moment(group.created_at).format('LLL')}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 dark:text-white">
              You don't have any groups
            </p>
          )}
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AllGroupViewCourseStudent;
