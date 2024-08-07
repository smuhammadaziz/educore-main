import React, { useEffect, useState } from 'react';
import DefaultLayoutSodiqAcademy from '../../layout/crm/DefaultSodiq';
import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import backurl from '../../links';
import moment from 'moment';

// Register the required components
Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
);

const CRMforSodiqAcademyDashboardHome = () => {
  const [courses, setCourses] = useState([]);
  const [notif, setNotif] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const company_id = 'a6f71af1-bb8-353-e0e-a008547a39d';
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchData(endpoint, setter) {
      try {
        const response = await fetch(`${backurl}${endpoint}/${company_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setter(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData('api/cadmin/get/courses', setCourses);
    fetchData('api/cadmin/get/students', setStudents);
    fetchData('api/cadmin/get/teacher', setTeachers);
  }, [company_id, token]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${backurl}api/cadmin/get/notefs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotif(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [company_id, token]);

  const barData = {
    labels: ['Teachers', 'Students', 'Notifications', 'Courses'],
    datasets: [
      {
        label: 'Informations',
        data: [teachers.length, students.length, notif.length, courses.length],
        backgroundColor: ['#3730A2', '#F59E0B', '#10B981', '#EF4444'],
        borderRadius: 10,
      },
    ],
  };

  return (
    <DefaultLayoutSodiqAcademy>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">Total Teachers</div>
          <div className="text-4xl my-3 text-black font-bold">
            {teachers.length}
          </div>
          <div className="text-green-500">
            +{teachers.length} from last month
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">Total Students</div>
          <div className="text-4xl my-3 text-black font-bold">
            +{students.length}
          </div>
          <div className="text-green-500">
            +{students.length} from last month
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">Recent notifications</div>
          <div className="text-4xl my-3 text-black font-bold">
            +{notif.length}
          </div>
          <div className="text-green-500">+{notif.length} from last month</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">Total courses</div>
          <div className="text-4xl my-3 text-black font-bold">
            +{courses.length}
          </div>
          <div className="text-green-500">
            +{courses.length} from last month
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="font-bold mb-2">Recent Teachers</div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {teachers.slice(-3).map((customer: any, index) => (
                <tr key={index} className="text-left hover:bg-slate-50 px-3">
                  <td className="py-2">
                    {customer.name} {customer.l_name}
                  </td>
                  <td className="py-2">{customer.email}</td>
                  <td className="py-2">
                    {customer.active ? 'active' : 'inactive'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="font-bold mb-2">Recent Courses</div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left">
                <th className="py-2">Title</th>
                <th className="py-2">Main Subject</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {courses.slice(-3).map((customer: any, index) => (
                <tr key={index} className="text-left hover:bg-slate-50 px-3">
                  <td className="py-2">{customer.course_title}</td>
                  <td className="py-2">{customer.subject}</td>
                  <td className="py-2">{customer.price} uzs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="font-bold mb-2">Recent Students</div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Last Interaction</th>
              </tr>
            </thead>
            <tbody>
              {students.map((customer: any, index) => (
                <tr key={index} className="text-left hover:bg-slate-50 px-3">
                  <td className="py-2">
                    {customer.name} {customer.l_name}
                  </td>
                  <td className="py-2">{customer.email}</td>
                  <td className="py-2">
                    {moment(customer.created_at).format('lll')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="font-bold mb-2">Deals by Value</div>
          <Bar data={barData} />
        </div>
      </div>
    </DefaultLayoutSodiqAcademy>
  );
};

export default CRMforSodiqAcademyDashboardHome;
