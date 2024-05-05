import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-1.svg';
import Logo from '../../images/logo/logo-light-1.svg';
// import { NavLink } from 'react-router-dom';
import Brand3 from '../../images/brand/brand3.svg';
import icon1 from '../../images/brand/icon1.svg';
import icon2 from '../../images/brand/icon2.svg';

// import { Route, Redirect } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigateTo = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(
        'https://f091-185-230-206-33.ngrok-free.app/api/login',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (response.ok) {
        toast.success('Login successful!', {
          position: 'top-right',
        });
      }

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }

      // Assuming the API returns a token upon successful login
      const data = await response.json();
      const token = data.token;

      // Save token to local storage only if login is successful
      localStorage.setItem('TOKEN', token);
      // Handle successful login (e.g., store token in local storage and redirect)
      console.log('Login successful, token:', token);
      navigateTo('/dashboard/admin'); // Redirect to admin dashboard
    } catch (error: any) {
      console.error('Error:', error.message);
      setError(error.message);

      toast.error(error.message, {
        position: 'top-right',
      });
    }
  };

  // useEffect(() => {
  //   // Check if token exists in local storage
  //   const token = localStorage.getItem('TOKEN');
  //   if (!token) {
  //     // Redirect to login page if token doesn't exist
  //     navigateTo('/auth/signin');
  //   }
  // }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div>
        <div className="m-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                  <img className="hidden dark:block" src={Logo} alt="Logo" />
                  <img className="dark:hidden" src={LogoDark} alt="Logo" />
                </Link>

                <p className="2xl:px-20"></p>

                <span className="mt-15 inline-block">
                  <img src={Brand3} alt="login illustration" />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium">Start for free</span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign In to Educore
                </h2>

                <form onSubmit={handleSignIn}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your username"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <span className="absolute right-4 top-4">
                        <img src={icon1} alt="icon" />
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <span className="absolute right-4 top-4">
                        <img src={icon2} alt="" />
                      </span>
                    </div>
                  </div>
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  <div className="mb-5">
                    <button
                      type="submit"
                      // onClick={notify}
                      className="text-center font-bold block w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Sign in
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      Don’t have any account?{' '}
                      <Link to="/auth/signup" className="text-primary">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
