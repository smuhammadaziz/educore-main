import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
// import './App.css'; // Your custom styles

import { TiLocationArrow } from 'react-icons/ti';

const GuideComponent = () => {
  const [run, setRun] = useState(false);
  const [steps] = useState([
    {
      target: '.link1',
      content: 'Here you can create, edit, and delete courses',
    },
    {
      target: '.link2',
      content: 'Here you can manage groups for your existing courses',
    },
    {
      target: '.link3',
      content: 'Here you can manage lessons for your existing groups',
    },
    {
      target: '.link4',
      content: 'Here you can manage homeworks for your existing groups',
    },
    {
      target: '.link5',
      content: 'Check your students and their payment status here',
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
        className="ms-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
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
