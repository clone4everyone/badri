import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Share = ({ setShareModel, image, title, url }) => {
  
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6  md:p-8 w-[50%] max-h-[80%] overflow-y-auto max-w-3xl custom-scrollbar relative shadow-lg transition-transform duration-300 ease-in-out transform scale-100">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors "
            onClick={() => setShareModel(false)}
            aria-label="Close Modal"
          >
            ✖
          </button>

          {/* Content */}
          <div className="text-center mt-4">
            {/* Image */}
            {image && (
              <img
                src={image}
                alt={title}
                className="rounded-lg mx-auto w-full max-w-md object-cover mb-6 shadow-md"
              />
            )}

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {title}
            </h1>

            {/* Share Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <WhatsappShareButton url={url} >
                <div className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition">
                  <FaWhatsapp className="text-lg" />
                </div>
              </WhatsappShareButton>
              <FacebookShareButton url={url} quote={`Check out this project: ${title}`}>
                <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                  <FaFacebook className="text-lg" />
                </div>
              </FacebookShareButton>
              <TwitterShareButton url={url} title={`Check out this: ${title}`}>
                <div className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition">
                  <FaTwitter className="text-lg" />
                </div>
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
