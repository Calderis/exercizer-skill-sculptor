
import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading exercise...</p>
    </div>
  );
};

export default LoadingState;
