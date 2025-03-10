// import React from "react";
// import  "./Loader.css"

// const Loader = () => {
//   return (
//     <div className="w-10 bg-blue-100 aspect-square relative">
//       <div className="absolute w-4 aspect-square bg-teal-400 animate-loader1"></div>
//       <div className="absolute w-4 aspect-square bg-pink-500 animate-loader2"></div>
//     </div>
//   );
// };

// export default Loader;

import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="flex items-center  justify-center min-h-screen p-4">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        {/* Rotating ring */}
        <div className="absolute inset-0 w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        
        {/* Centered logo */}
        <div className="absolute inset-2 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center">
          <img src="/dmhlogo.svg" alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Loader;

// Made mobile-friendly with responsive sizing and padding!

// This adjusts the ring and logo size so they align perfectly!
