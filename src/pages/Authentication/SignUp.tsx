import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-1.svg';
import iconphone from '../../images/brand/iconphone.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jwtDecode } from 'jwt-decode';

import backurl from '../../links';
import useLang from '../../hooks/useLang';
import content from '../../localization/content';

import 'react-phone-input-2/lib/bootstrap.css';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [l_name, setl_name] = useState('');
  const [email, setEmail] = useState('');
  const [hashedpass, setHashedPass] = useState('');
  const [age, setAge] = useState('');
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
      formData.append('adress', 'Tashkent');

      const response = await fetch(`${backurl}/api/register`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          position: 'top-right',
        });
        navigateTo('/auth/code/entry');
        const token = data.token;

        localStorage.setItem('TOKEN_FOR_REGISTER', token);
      }

      if (!response.ok) {
        toast.error(data.message, {
          position: 'top-right',
        });
      }
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
      <div className="h-screen bg-white">
        <div className="m-2 rounded-sm  border border-stroke bg-white shadow-default">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                  <img className="" src={LogoDark} alt="Logo" />
                </Link>
                <p className="2xl:px-20"></p>

                <span className=" inline-block">
                  <img src={iconphone} alt="phone icon for register" />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium sm:flex-row sm:items-center ">
                  {content[selectedLang as string].log.start}
                </span>
                <div className="mb-10 flex flex-col items-center sm:flex-row sm:items-center">
                  <h2 className="mb-6 text-2xl font-bold text-black sm:text-title-xl2 sm:mb-0 sm:mr-6">
                    {content[selectedLang as string].log.register}
                  </h2>
                  <a
                    href="https://forms.gle/ZFRt7bNVWxSqNGgc6"
                    target="_blank"
                    className="mt-3 sm:mt-0 inline-block text-sm font-semibold leading-6 text-gray-900 primary bg-white border border-black text-black px-5 py-2 rounded-full hover:bg-slate-100 active:bg-slate-100 focus:outline-none focus:ring focus:ring-slate-100"
                  >
                    {content[selectedLang as string].header.teacher} →
                  </a>
                </div>

                <form onSubmit={handleRegister}>
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mr-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black">
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
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="mb-4 md:ml-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black">
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
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black">
                      {content[selectedLang as string].log.email}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content[selectedLang as string].log.email}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mr-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black">
                        {content[selectedLang as string].log.phone}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9+]/g,
                              '',
                            );
                          }}
                          placeholder={
                            content[selectedLang as string].log.phone
                          }
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="mb-4 md:ml-4 lg:w-1/2">
                      <label className="mb-2.5 block font-medium text-black">
                        {content[selectedLang as string].log.age}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder={content[selectedLang as string].log.age}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black">
                      {content[selectedLang as string].log.tg}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={tgusername}
                        onChange={(e) => setTgUsername(e.target.value)}
                        placeholder={content[selectedLang as string].log.pass}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black">
                      {content[selectedLang as string].log.pass}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={hashedpass}
                        onChange={(e) => setHashedPass(e.target.value)}
                        placeholder={content[selectedLang as string].log.pass}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                      />
                    </div>
                  </div>
                  {error && <div className="text-red-500 mb-4">{error}</div>}

                  <div className="mb-5">
                    <input
                      type="submit"
                      value={content[selectedLang as string].log.create}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-fuchsia-800 p-4 text-white transition hover:bg-opacity-90"
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
