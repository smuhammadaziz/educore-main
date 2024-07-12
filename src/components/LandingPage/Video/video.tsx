import React, { useState } from 'react';
import videoBg from '../../../images/brand/videobg.jpg';
import { FiPlayCircle } from 'react-icons/fi';
import ReactModal from 'react-modal';

import { CgClose } from 'react-icons/cg';

import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

function VideoComponentHome() {
  const [selectedLanguage] = useLang();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white py-10 px-5">
      <div
        className="container mx-auto rounded-xl relative flex flex-col items-center justify-center bg-cover bg-center my-10"
        style={{ backgroundImage: `url(${videoBg})` }}
      >
        <div className="text-center text-white p-15 px-5 pb-0 sm:p-10 md:p-20 rounded-lg">
          <h4 className="text-md sm:text-lg font-semibold mb-3 uppercase">
            {' '}
            {content[selectedLanguage as string].video.team}
          </h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-10">
            {' '}
            {content[selectedLanguage as string].video.text}
          </h2>
          <div className="pb-15 px-0">
            <iframe
              width="100%"
              height="450px"
              src="https://www.youtube.com/embed/JW_bGE0lYm4?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg h-50 lg:h-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoComponentHome;
