import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayoutStudent from '../../../layout/DefaultStudent';
import backurl from '../../../links';
import CoverOne from '../../../images/cover/cover-01.png';

const ProfileStudent = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('TOKEN');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${backurl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
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
    education,
  } = profileData.Profil;

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
            src={`${backurl}/upload/${
              image || '128-1280406_view-user-icon-png-user-circle-icon-png.png'
            }`}
            alt="profile"
            className="w-64 h-64 -mt-32 bg-white rounded-full object-cover border-4 border-white"
          />
          <h3 className="text-2xl font-semibold mt-4 text-center">
            {name} {l_name}
          </h3>
          <p className="text-lg font-medium text-gray-700">{role}</p>

          <div className="mt-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-md font-semibold">Phone</h5>
                <p className="text-gray-700 mt-2">{phone || 'No data'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-md font-semibold">Telegram Username</h5>
                <p className="text-gray-700 mt-2">
                  @{username_tg || 'No data'}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-md font-semibold">Email</h5>
                <p className="text-gray-700 mt-2">{email || 'No data'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-md font-semibold">About me</h5>
                <p className="text-gray-700 mt-2">{about_me || 'No data'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-md font-semibold">Address</h5>
                <p className="text-gray-700 mt-2">{adress || 'No data'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-md font-semibold">Birthday</h5>
                <p className="text-gray-700 mt-2">{birth_date || 'No data'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-md font-semibold">Education</h5>
                <p className="text-gray-700 mt-2">{education || 'No data'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayoutStudent>
  );
};

export default ProfileStudent;
