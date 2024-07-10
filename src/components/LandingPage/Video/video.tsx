import React, { useState } from 'react';
import videoBg from '../../../images/brand/videobg.jpg';
import { FiPlayCircle } from 'react-icons/fi';
import ReactModal from 'react-modal';

import { CgClose } from 'react-icons/cg';

function VideoComponentHome() {
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
        className="container mx-auto rounded-xl relative flex items-center justify-center bg-cover bg-center my-10"
        style={{ backgroundImage: `url(${videoBg})` }}
      >
        <div className="text-center text-white p-10 sm:p-10 md:p-20 rounded-lg">
          <h4 className="text-md sm:text-lg font-semibold mb-2 uppercase">
            {' '}
            Educore Team{' '}
          </h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-10">
            {' '}
            Why should you study at Educore?{' '}
          </h2>
          <button
            className="flex flex-row items-center mx-auto bg-white hover:bg-fuchsia-300 text-black hover:text-black uppercase text-lg sm:text-xl md:text-2xl py-2 sm:py-3 px-5 sm:px-10 rounded-full font-semibold transition duration-300"
            onClick={openModal}
          >
            <span className="me-2">
              <FiPlayCircle />
            </span>
            Watch Video
          </button>
        </div>
      </div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            maxWidth: '800px',
            maxHeight: '450px',
            margin: '0 auto',
            padding: '10px',
            border: 'none',
          },
        }}
        //    className="h-1/6 "
      >
        <button
          onClick={closeModal}
          className="justify-end inline-block text-right"
        >
          <CgClose size={25} />
        </button>
        <iframe
          width="100%"
          height="400px"
          src="https://www.youtube.com/embed/JW_bGE0lYm4?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </ReactModal>
    </div>
  );
}

export default VideoComponentHome;
