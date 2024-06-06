import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

interface Group {
  group_id: number;
  g_name: string;
  l_days: string;
  user_count: number;
  subj_start: string;
  subj_end: string;
  created_at: string;
}

function GetOneMyGroupsTeacher() {
  const { group_id } = useParams<{ group_id: string }>();
  const [groups, setGroups] = useState<Group[]>([]);
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backurl}/api/get/group/by/${group_id}`,
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
        setGroups(data.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [group_id, token]);

  return (
    <DefaultLayoutTeacher>
      <div className="container mx-auto px-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.group_id}
              className="bg-white dark:bg-strokedark dark:text-white p-6 mb-6 rounded-lg shadow-md"
            >
              <h2 className="text-center text-2xl text-black dark:text-white mb-4">
                About the group
              </h2>
              <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                Group Name: {group.g_name}
              </h3>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Which days: {group.l_days}
              </p>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Maximum group size: {group.user_count} students
              </p>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Lesson time: {group.subj_start} - {group.subj_end}
              </p>
              <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                Created time: {moment(group.created_at).format('l')}
              </p>

              <NavLink
                to="/dashboard/teacher/my/all/groups"
                className="underline text-blue-700 dark:text-blue-400 mt-5 inline-block"
              >
                Go to my all groups
              </NavLink>

              <div className="flex text-center flex-col md:flex-row mt-10 space-y-3 md:space-y-0 md:space-x-3">
                <NavLink
                  to={`/dashboard/teacher/my/all/groups/show/lessons/${group_id}`}
                  className="bg-green-700 py-3 px-10 text-white hover:bg-green-600 rounded"
                >
                  Show all lessons
                </NavLink>
                <NavLink
                  to={`/dashboard/teacher/my/all/groups/show/homeworks/${group_id}`}
                  className="bg-blue-700 py-3 px-10 text-white hover:bg-blue-600 rounded"
                >
                  Show all homeworks
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            You don't have any courses
          </p>
        )}
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetOneMyGroupsTeacher;
