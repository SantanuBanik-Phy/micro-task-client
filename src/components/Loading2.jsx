import React from 'react';

const Loading2 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-spin"
          style={{
            maskImage: "radial-gradient(circle, white 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle, white 60%, transparent 100%)",
          }}
        ></div>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      </div>
    </div>
  );
};

export default Loading2;