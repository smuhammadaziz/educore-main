import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-1.svg';
import Logo from '../../images/logo/logo-light-1.svg';
import iconphone from '../../images/brand/iconphone.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jwtDecode } from 'jwt-decode';

import backurl from '../../links';
import useLang from '../../hooks/useLang';
import content from '../../localization/content';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [l_name, setl_name] = useState('');
  const [email, setEmail] = useState('');
  const [hashedpass, setHashedPass] = useState('');
  const [age, setAge] = useState('');
  const [adress, setAdress] = useState('');
  const [tgusername, setTgUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const navigateTo = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', hashedpass);
      formData.append('name', name);
      formData.append('l_name', l_name);
      formData.append('age', age);
      formData.append('phone', phone);
      formData.append('tgusername', tgusername);
      formData.append('adress', adress);

      const response = await fetch(`${backurl}/api/register`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Login successful!', {
          position: 'top-right',
        });
      }

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }

      const data = await response.json();

      const token = data.token;

      localStorage.setItem('TOKEN', token);

      setTimeout(() => {
        window.location.href = '/dashboard/student';
      }, 100);
    } catch (error: any) {
      setError(error.message);

      toast.error(error.message, {
        position: 'top-right',
      });
    }
  };

  const [selectedLang] = useLang();

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="bg-white">
        <div className="m-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                  <img className="hidden dark:block" src={Logo} alt="Logo" />
                  <img className="dark:hidden" src={LogoDark} alt="Logo" />
                </Link>
                <p className="2xl:px-20"></p>

                <span className=" inline-block">
                  <img src={iconphone} alt="phone icon for register" />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium">
                  {content[selectedLang as string].log.start}
                </span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  {content[selectedLang as string].log.register}
                </h2>

                <form onSubmit={handleRegister}>
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mr-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        {content[selectedLang as string].log.fname}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={
                            content[selectedLang as string].log.fname
                          }
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4 md:ml-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        {content[selectedLang as string].log.lname}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={l_name}
                          onChange={(e) => setl_name(e.target.value)}
                          placeholder={
                            content[selectedLang as string].log.lname
                          }
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {content[selectedLang as string].log.email}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content[selectedLang as string].log.email}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mr-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        {content[selectedLang as string].log.phone}
                      </label>
                      <div className="relative">
                        <input
                          type="telephone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={`+998 (__) ___-__-__`}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4 md:ml-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        {content[selectedLang as string].log.age}
                      </label>
                      <div className="relative">
                        <input
                          type="telephone"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder={content[selectedLang as string].log.age}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mr-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        {content[selectedLang as string].log.address}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={adress}
                          onChange={(e) => setAdress(e.target.value)}
                          placeholder={
                            content[selectedLang as string].log.address
                          }
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4 md:ml-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        {content[selectedLang as string].log.tg}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={tgusername}
                          onChange={(e) => setTgUsername(e.target.value)}
                          placeholder={content[selectedLang as string].log.tg}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {content[selectedLang as string].log.pass}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={hashedpass}
                        onChange={(e) => setHashedPass(e.target.value)}
                        placeholder={content[selectedLang as string].log.pass}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  {error && <div className="text-red-500 mb-4">{error}</div>}

                  <div className="mb-5">
                    <input
                      type="submit"
                      value={content[selectedLang as string].log.create}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      {content[selectedLang as string].log.already}{' '}
                      <Link
                        to="/auth/signin"
                        className="text-primary hover:underline"
                      >
                        {content[selectedLang as string].log.signin}
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

export default SignUp;
