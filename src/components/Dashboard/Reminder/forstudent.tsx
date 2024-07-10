import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
// import './App.css'; // Your custom styles

import { TiLocationArrow } from 'react-icons/ti';

const GuideComponentForStudent = () => {
  const [run, setRun] = useState(false);
  const [steps] = useState([
    {
      target: '.st1',
      content: 'In this section you can search and buy our courses',
    },
    {
      target: '.st2',
      content: 'Here you can see all the groups you have joined',
    },
    {
      target: '.st3',
      content:
        'In this section you can view all the lessons from the groups you have joined',
    },
    {
      target: '.st4',
      content:
        'Here you can see all the homework from the courses you have bought',
    },
    {
      target: '.st5',
      content: 'Check the status of your payment here',
    },
  ]);

  useEffect(() => {
    const showGuide = localStorage.getItem('showGuide');
    if (showGuide !== 'false') {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data: any) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('showGuide', 'false');
    setRun(false);
  };

  return (
    <div className="flex flex-row items-center bg-gray-100 justify-end">
      <button
        onClick={() => setRun(true)}
        className="flex flex-row items-center px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        <span className="me-2">
          <TiLocationArrow size={20} />
        </span>
        Show Guide
      </button>

      <button
        onClick={handleDontShowAgain}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
      >
        Don't show me again
      </button>

      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        run={run}
        continuous
        showSkipButton
        styles={{
          options: {
            arrowColor: '#e3ffeb',
            backgroundColor: '#e3ffeb',
            // overlayColor: 'rgba(79, 26, 0, 0.4)',
            primaryColor: '#4196e1',
            textColor: '#000',
            width: 500,
            zIndex: 1000,
          },
        }}
      />
    </div>
  );
};

export default GuideComponentForStudent;
