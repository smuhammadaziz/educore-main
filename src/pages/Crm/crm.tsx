import React from 'react';
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
import { Line, Bar } from 'react-chartjs-2';

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
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Pipeline',
        data: [65, 100, 80, 20, 56, 40],
        borderColor: '#3730A2',
        backgroundColor: '#f2f2f2',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Deals by Stage',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#3730A2',
        borderRadius: 10,
      },
    ],
  };

  const recentCustomers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      lastInteraction: '2023-06-23',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      lastInteraction: '2023-06-24',
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      lastInteraction: '2023-06-25',
    },
    {
      name: 'Emily Davis',
      email: 'emily@example.com',
      lastInteraction: '2023-06-26',
    },
  ];

  return (
    <DefaultLayoutSodiqAcademy>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">Total Customers</div>
          <div className="text-4xl my-3 text-black font-bold">1,244</div>
          <div className="text-green-500">+5.2% from last month</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">New Leads</div>
          <div className="text-4xl my-3 text-black font-bold">+125</div>
          <div className="text-green-500">+10.1% from last month</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">Open Deals</div>
          <div className="text-4xl my-3 text-black font-bold">+42</div>
          <div className="text-green-500">+8% from last month</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-black">Recent Activities</div>
          <div className="text-4xl my-3 text-black font-bold">+573</div>
          <div className="text-green-500">+12% since last week</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="font-bold mb-2">Sales Pipeline</div>
          <Line data={lineData} />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="font-bold mb-2">Deals by Stage</div>
          <Bar data={barData} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="font-bold mb-2">Recent Customers</div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Last Interaction</th>
              </tr>
            </thead>
            <tbody>
              {recentCustomers.map((customer, index) => (
                <tr key={index} className="text-left hover:bg-slate-50 ">
                  <td className="py-2">{customer.name}</td>
                  <td className="py-2">{customer.email}</td>
                  <td className="py-2">{customer.lastInteraction}</td>
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
