import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
// import './App.css'; // Your custom styles

const GuideComponent = () => {
  const [run, setRun] = useState(false);
  const [steps] = useState([
    {
      target: '.link1',
      content:
        'You can add new courses, edit them and delete them in this section',
    },
    {
      target: '.link2',
      content:
        'You can add new groups belong to your courses, edit them and delete them in this section',
    },
    {
      target: '.link3',
      content:
        'You can add new lessons belong to your groups, edit them and delete them in this section',
    },
    {
      target: '.link4',
      content:
        'You can add new homeworks belong to your groups, edit them and delete them in this section',
    },
    {
      target: '.link5',
      content:
        'you can see your all students belong to your groups and view their payment status',
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
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={() => setRun(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
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

export default GuideComponent;
