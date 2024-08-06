import React from 'react';

const SubmitButton = ({ text }) => (
  <button
    type="submit"
    className="w-full inline-flex justify-center py-3 md:py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-dark hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark sm:text-base md:text-lg lg:text-xl xl:text-2xl"
  >
    {text}
  </button>
);

export default SubmitButton;
