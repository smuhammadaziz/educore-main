import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

import PhotoBack from '../../../images/brand/book.jpg';

const CountdownLanding: React.FC = () => {
  const [selectedLanguage] = useLang();
  const [countDownTime, setCountDownTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
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
    const countDownDate = new Date('2024-07-15T00:00:00').getTime();

    const interval = setInterval(() => {
      getTimeDifference(countDownDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startCountDown();
  }, [startCountDown]);

  return (
    <div className="relative max-w-full py-7">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${PhotoBack})`,
          filter: 'brightness(20%)',
        }}
      ></div>
      <div className="relative container text-white text-center mx-auto font-bold">
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-8">
          <span className="text-2xl sm:text-3xl font-semibold text-white text-center tracking-widest uppercase">
            {content[selectedLanguage as string].marathon.until}
          </span>
          <div className="flex justify-center gap-3 sm:gap-8">
            {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
              <div key={index} className="flex flex-col gap-5 relative">
                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-20 lg:h-20 flex justify-between items-center bg-[#343650] rounded-lg">
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -left-[6px] rounded-full bg-transparent"></div>
                  <span className="lg:text-4xl sm:text-3xl text-3xl font-semibold text-white">
                    {countDownTime[unit as keyof typeof countDownTime]}
                  </span>
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-transparent"></div>
                </div>
                <span className="text-white text-sm sm:text-lg text-center capitalize">
                  {countDownTime[unit as keyof typeof countDownTime] === '01'
                    ? unit.slice(0, -1)
                    : unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownLanding;
