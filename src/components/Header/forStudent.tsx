import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  json,
  useAsyncError,
  useNavigate,
} from 'react-router-dom';

import UserOne from '../../images/user/user-01.png';

import backurl from '../../links';

import { CgProfile } from 'react-icons/cg';
import { RiSettings4Fill } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
import { HiLockClosed } from 'react-icons/hi';

const DropdownUserForStudent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [datas, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const token = localStorage.getItem('TOKEN');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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

        //    console.log(data);

        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleLogout = () => {
    localStorage.removeItem('TOKEN');

    navigate('/');
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {datas ? datas?.Profil.name : 'Jhon'}{' '}
            {datas ? datas?.Profil.l_name : 'Doe '}
          </span>
          <span className="block text-xs">
            {datas ? datas?.Profil.email : 'example@gmail.com'}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img
            src={`${backurl}upload/${
              datas && datas.Profil && datas.Profil.image
                ? datas.Profil.image
                : '128-1280406_view-user-icon-png-user-circle-icon-png.png'
            }`}
            alt="user logo"
            className="w-full h-full object-cover rounded-full"
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <NavLink
          to={`/dashboard/student/profile/${
            datas ? datas?.Profil.user_id : 'admin'
          }`}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <span>
            <CgProfile size={25} />
          </span>
          Profile
        </NavLink>
        <NavLink
          to={`/dashboard/student/settings/${
            datas ? datas?.Profil.user_id : 'admin'
          }`}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <span>
            <RiSettings4Fill size={25} />
          </span>
          Settings
        </NavLink>
        <NavLink
          to={`/dashboard/student/change/password/${
            datas ? datas?.Profil.user_id : 'admin'
          }`}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <span>
            <HiLockClosed size={25} />
          </span>
          Change Password
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex border-t items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <span>
            <CiLogout size={25} />
          </span>
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUserForStudent;
