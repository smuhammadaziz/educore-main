import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
// import './App.css'; // Your custom styles

const GuideComponentForStudent = () => {
  const [run, setRun] = useState(false);
  const [steps] = useState([
    {
      target: '.st1',
      content:
        'In this section, you will view and buy new course and send your payment after buying one course',
    },
    {
      target: '.st2',
      content: 'In this section, You can see all groups you have joined',
    },
    {
      target: '.st3',
      content:
        'In this section, You can see all lessons belonging to your group ',
    },
    {
      target: '.st4',
      content:
        'In this section, You can see all homeworks belonging to your group',
    },
    {
      target: '.st5',
      content:
        'In this section, You can see all payments belong to your course and group and checking your payment status',
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
    <div className="flex flex-row items-center bg-gray-100">
      <button
        onClick={() => setRun(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
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
