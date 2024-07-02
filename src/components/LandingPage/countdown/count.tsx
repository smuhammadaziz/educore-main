import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const CountdownLanding: React.FC = () => {
  const [countDownTime, setCountDownTime] = useState({
    days: '10',
    hours: '10',
    minutes: '10',
    seconds: '10',
  });

  const getTimeDifference = (endTime: number) => {
    const currentTime = new Date().getTime();
    const timeDifference = endTime - currentTime;

    if (timeDifference < 0) {
      setCountDownTime({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      });
      return;
    }

    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
      .toString()
      .padStart(2, '0');
    const hours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60),
    )
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (1000 * 60),
    )
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000)
      .toString()
      .padStart(2, '0');

    setCountDownTime({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  const startCountDown = useCallback(() => {
    const savedEndTime = localStorage.getItem('countdownEndTime');
    let countDownDate: number;

    if (savedEndTime) {
      countDownDate = parseInt(savedEndTime, 10);
    } else {
      const customDate = new Date();
      countDownDate = new Date(
        customDate.getFullYear(),
        customDate.getMonth(),
        customDate.getDate() + 10,
        customDate.getHours() + 10,
        customDate.getMinutes() + 10,
        customDate.getSeconds() + 10,
      ).getTime();
      localStorage.setItem('countdownEndTime', countDownDate.toString());
    }

    const interval = setInterval(() => {
      getTimeDifference(countDownDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startCountDown();
  }, [startCountDown]);

  return (
    <div className="max-w-full bg-fuchsia-400 py-10">
      <div className="container text-white text-center mx-auto font-bold">
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
          <span className="uppercase text-2xl sm:text-3xl font-semibold text-black text-center tracking-widest">
            Until the marathon
          </span>
          <div className="flex justify-center gap-3 sm:gap-8">
            {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
              <div key={index} className="flex flex-col gap-5 relative">
                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-30 lg:h-30 flex justify-between items-center bg-[#343650] rounded-lg">
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -left-[6px] rounded-full bg-fuchsia-400"></div>
                  <span className="lg:text-6xl sm:text-5xl text-3xl font-semibold text-fuchsia-400">
                    {countDownTime[unit as keyof typeof countDownTime]}
                  </span>
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-fuchsia-400"></div>
                </div>
                <span className="text-black text-xs sm:text-2xl text-center capitalize">
                  {countDownTime[unit as keyof typeof countDownTime] === '01'
                    ? unit.slice(0, -1)
                    : unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* <NavLink to="/auth/signup" className="text-lg underline">
          Go
        </NavLink> */}
      </div>
    </div>
  );
};

export default CountdownLanding;
