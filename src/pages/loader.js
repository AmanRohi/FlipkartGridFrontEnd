import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen from-gray-900 to-gray-600 bg-gradient-to-b flex flex-col">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loader;
