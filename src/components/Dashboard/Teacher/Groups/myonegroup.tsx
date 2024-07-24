import React, { useEffect, useState } from 'react';
import DefaultLayoutTeacher from '../../../../layout/DefaultTeacher';
import { NavLink, useParams } from 'react-router-dom';
import backurl from '../../../../links';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { MdPlayLesson, MdEdit } from 'react-icons/md';
import { MdMapsHomeWork } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import { MdVideoChat } from 'react-icons/md';
import { MdAddHomeWork } from 'react-icons/md';

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

  async function deleteItem() {
    try {
      const response = await fetch(`${backurl}/api/delete/group/${group_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete group');
      }
      toast.success('Successfully deleted group', {
        position: 'top-right',
      });
      // navigate('/dashboard/groups');
    } catch (error) {
      console.error('Error deleting group:', error);
      toast.error('Failed to delete group', {
        position: 'top-right',
      });
    }
  }

  return (
    <DefaultLayoutTeacher>
      <ToastContainer />
      <div className="container mx-auto px-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.group_id}
              className="bg-white dark:bg-strokedark dark:text-white p-8 mb-6 rounded-lg shadow-md"
            >
              <h2 className="text-center text-2xl text-black dark:text-white mb-4">
                About the Group
              </h2>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-2/3">
                  <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                    Group Name:{' '}
                    <span className="font-bold text-black">{group.g_name}</span>
                  </h3>
                  <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Which Days:{' '}
                    <span className="font-bold text-black">{group.l_days}</span>
                  </p>
                  <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Maximum Group Size:{' '}
                    <span className="font-bold text-black">
                      {group.user_count}
                      {group.user_count > 1 ? ' students' : ' student'}
                    </span>
                  </p>
                  <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Lesson Time:{' '}
                    <span className="font-bold text-black">
                      {group.subj_start} - {group.subj_end}
                    </span>
                  </p>
                  <p className="text-md font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Created:{' '}
                    <span className="font-bold text-black">
                      {moment(group.created_at).format('lll')}
                    </span>
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-end">
                  <NavLink
                    to={`/dashboard/teacher/my/groups`}
                    className="py-2 px-4 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                  >
                    <span className="mr-2">
                      <RiArrowGoBackFill />
                    </span>
                    Go to My Groups
                  </NavLink>
                </div>
              </div>

              <div className="flex justify-center mt-10 gap-5">
                <NavLink
                  onClick={deleteItem}
                  to={`/dashboard/teacher/my/groups`}
                  className="flex items-center justify-center bg-red-700 py-3 px-10 text-white hover:bg-red-800 rounded"
                >
                  <span className="mr-2">
                    <MdDelete />
                  </span>
                  Delete Group
                </NavLink>
                <NavLink
                  to={`/dashboard/teacher/my/all/groups/show/lessons/${group.group_id}`}
                  className="flex items-center justify-center bg-green-700 py-3 px-10 text-white hover:bg-green-800 rounded"
                >
                  <span className="mr-2">
                    <MdEdit />
                  </span>
                  Edit Group
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            You don't have any courses
          </p>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-10">
          <div className="flex flex-col bg-white p-5 shadow-xl hover:shadow-2xl rounded-md dark:bg-strokedark">
            <span className="mx-auto justify-center inline-block mb-7 pt-10">
              <MdVideoChat size="150" />
            </span>
            <NavLink
              to={`/dashboard/teacher/my/all/groups/show/lessons/${group_id}`}
              className="flex items-center bg-blue-700 py-3 px-10 text-white mx-auto hover:bg-blue-900 rounded"
            >
              <span className="mr-2">
                <MdPlayLesson />
              </span>
              View all lessons
            </NavLink>
          </div>
          <div className="flex flex-col bg-white p-5 shadow-xl hover:shadow-2xl rounded-md dark:bg-strokedark">
            <span className="mx-auto justify-center inline-block mb-7 pt-10">
              <MdAddHomeWork size="150" />
            </span>
            <NavLink
              to={`/dashboard/teacher/my/all/groups/show/homeworks/${group_id}`}
              className="flex items-center bg-blue-700 py-3 px-10 text-white hover:bg-blue-900 mx-auto rounded"
            >
              <span className="mr-2">
                <MdMapsHomeWork />
              </span>
              View all homeworks
            </NavLink>
          </div>
        </div>
      </div>
    </DefaultLayoutTeacher>
  );
}

export default GetOneMyGroupsTeacher;
