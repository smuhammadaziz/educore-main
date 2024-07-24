import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import backurl from '../../../../links';
import { MdOutlineAddCircle } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';
import { FaUsers } from 'react-icons/fa'; // Importing an additional icon

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
        <h2 className="text-2xl mb-5 text-center text-gray-800 dark:text-white">
          My <span className="underline">Groups</span> List
        </h2>
        <NavLink
          to={`/dashboard/teacher/add/new/groups/${course_id}`}
          className="flex items-center mx-auto justify-center w-55 text-sm py-3 px-12 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
        >
          <MdOutlineAddCircle className="mr-2" size={20} />
          Add new group
        </NavLink>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          {groups.length > 0 ? (
            groups.map((group: any) => (
              <div
                key={group.group_id}
                className="bg-white rounded-lg shadow-lg flex overflow-hidden transition duration-300 dark:bg-gray-800 dark:text-white"
              >
                <div className="bg-purple-700 p-6 pe-10 text-white flex flex-col">
                  <div className="flex flex-col">
                    <FaUsers className="text-2xl mr-2 mb-3" />{' '}
                    <div>
                      <div className="text-md uppercase">Group name</div>
                      <div className="text-lg font-bold">{group.g_name}</div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="text-md uppercase">Maximum Group size</div>
                    <div className="text-lg font-bold">
                      {group.user_count}
                      {group.user_count > 1 ? ' students' : ' student'}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="text-md font-medium uppercase">
                      Lesson Info
                    </div>
                    <div className="mt-2 font-medium">
                      <div className="text-md">Lesson days: {group.l_days}</div>
                      <div className="text-md">
                        Time: {group.subj_start} - {group.subj_end}
                      </div>
                      <div className="text-md mt-3">
                        Created: {moment(group.created_at).format('LLL')}
                      </div>
                    </div>
                  </div>
                  <NavLink
                    to={`/dashboard/teacher/my/all/groups/${group.group_id}`}
                    className="mt-4 py-2 px-4 bg-purple-600 text-white rounded-lg text-center shadow-md hover:bg-purple-700 transition duration-300"
                  >
                    View group
                  </NavLink>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-800 dark:text-white">
              You have no groups
            </p>
          )}
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default AllGroupViewCourseStudent;
