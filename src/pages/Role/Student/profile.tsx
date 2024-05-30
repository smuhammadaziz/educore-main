import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../../layout/DefaultLayout';
import DefaultLayoutTeacher from '../../../layout/DefaultTeacher';
import DefaultLayoutStudent from '../../../layout/DefaultStudent';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import backurl from '../../../links';
import CoverOne from '../../../images/cover/cover-01.png';
import defaultUserImg from '../../../images/user/user-06.png';

const ProfileStudent = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('TOKEN');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${backurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          localStorage.removeItem('TOKEN');
          navigate('/');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate, token]);

  if (loading) {
    return (
      <DefaultLayoutStudent>
        <div className="text-center py-10">Loading...</div>
      </DefaultLayoutStudent>
    );
  }

  if (!profileData) {
    return (
      <DefaultLayoutStudent>
        <div className="text-center py-10">Profile data not available</div>
      </DefaultLayoutStudent>
    );
  }

  const {
    Profil: {
      image,
      name,
      l_name,
      role,
      phone,
      username_tg,
      email,
      about_me,
      adress,
      birth_date,
      age,
      education,
      languages,
      skills,
    },
  } = profileData;

  return (
    <DefaultLayoutStudent>
      <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <img
          src={CoverOne}
          alt="profile cover"
          className="rounded-t-lg object-cover w-full h-64"
        />
        <div className="flex flex-col items-center mt-4">
          <img
            src={`${backurl}/upload/${image || defaultUserImg}`}
            alt="profile"
            className="w-50 h-50 -mt-22 rounded-full object-cover border-4 border-white"
          />
          <h3 className="text-2xl font-semibold mt-4">
            {name} {l_name}
          </h3>
          <p className="text-lg font-medium text-gray-700">{role}</p>
          <p className="mt-2 text-gray-700">
            Phone Number: {phone ? phone : 'no data'}
          </p>
          <p className="mt-1 text-gray-700">
            Telegram username:{' '}
            <a
              href={`https://t.me/${username_tg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {username_tg ? username_tg : 'no data'}
            </a>
          </p>
          <p className="mt-1 text-gray-700">
            Email: {email ? email : 'no data'}
          </p>
          <div className="mt-4 text-center">
            <h4 className="text-lg font-semibold">About Me</h4>
            <p className="mt-2 text-gray-700">
              {about_me ? about_me : 'no data'}
            </p>
          </div>
          <table className="table-auto mt-6 w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-stone-300 px-4 py-4 font-semibold">
                  Address
                </td>
                <td className="border border-stone-300 px-4 py-4">
                  {adress ? adress : 'no data'}
                </td>
              </tr>
              <tr>
                <td className="border border-stone-300 px-4 py-4 font-semibold">
                  Birthday
                </td>
                <td className="border border-stone-300 px-4 py-4">
                  {birth_date ? birth_date : 'no data'}
                </td>
              </tr>
              <tr>
                <td className="border border-stone-300 px-4 py-4 font-semibold">
                  Education
                </td>
                <td className="border border-stone-300 px-4 py-4">
                  {education ? education : 'no data'}
                </td>
              </tr>
              <tr>
                <td className="border border-stone-300 px-4 py-4 font-semibold">
                  Languages
                </td>
                <td className="border border-stone-300 px-4 py-4">
                  {languages ? languages : 'no data'}
                </td>
              </tr>
              <tr>
                <td className="border border-stone-300 px-4 py-4 font-semibold">
                  Skills
                </td>
                <td className="border border-stone-300 px-4 py-4">
                  {skills ? skills : 'no data'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
};

export default ProfileStudent;
