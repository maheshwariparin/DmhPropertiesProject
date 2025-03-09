import React from "react";
import  "./Loader.css"

const Loader = () => {
  return (
    <div className="w-10 bg-blue-100 aspect-square relative">
      <div className="absolute w-4 aspect-square bg-teal-400 animate-loader1"></div>
      <div className="absolute w-4 aspect-square bg-pink-500 animate-loader2"></div>
    </div>
  );
};

export default Loader;
