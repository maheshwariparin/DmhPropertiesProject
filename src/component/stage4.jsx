// import React, { useState } from "react";
// import { useStage } from "../context/SetStageContext";
// import { useProperty } from "../context/PropertyContext";

// const Stage4 = () => {
//   const { stage, setStage } = useStage();
//   const {
//     images,
//     coverImage,
//     handleImageChange,
//     handleRemoveImage,
//     handleSetCover,
//     propertyType,
//   } = useProperty();

//   const [currentImage, setCurrentImage] = useState(null);
//   const steps = [
//     "Type-Category",
//     "Property Location",
//     "Property Detail",
//     "Add Images",
//     "Add Amenities",
//   ];

//   const handleNextStage = () => {
//     if (images.length === 0) {
//       alert("Please upload at least one image before proceeding.");
//       return;
//     }
//     if (!coverImage) {
//       alert("Please select a cover photo before proceeding.");
//       return;
//     }
//     if (propertyType === "Commercial Land" || propertyType === "Plot / Land") {
    
//       setStage((prevStage) => prevStage + 2); // Use functional update
    
//     } else {
//       setStage((prevStage) => prevStage + 1); // Use functional update
//     }
//   };

//   const handlePrevImage = () => {
//     const currentIndex = images.findIndex((img) => img.preview === currentImage);
//     const prevIndex = (currentIndex - 1 + images.length) % images.length;
//     setCurrentImage(images[prevIndex]?.preview);
//   };

//   const handleNextImage = () => {
//     const currentIndex = images.findIndex((img) => img.preview === currentImage);
//     const nextIndex = (currentIndex + 1) % images.length;
//     setCurrentImage(images[nextIndex]?.preview);
//   };

//   return (
//     <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
//       <div className="w-1/5 mt-7 ml-5">
//       <div className="w-1/2 flex flex-col items-center">
//         {steps.map((label, index) => (
//           <div key={index} className="flex flex-col items-center">
//             {index !== 0 && (
//               <div className={`w-1 h-7 ${stage > index + 1 ? 'bg-gray-300' : 'bg-gray-300'}`} />
//             )}
//             <div
//               className={`w-12 h-12 flex items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 ${
//                 stage === index + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-700 border-gray-400'
//               }`}
//             >
//               {index + 1}
//             </div>
//             <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
//           </div>
//         ))}
//       </div>
//       </div>

//       <div className="w-4/5 p-6">
//         <div className="w-full mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
//           <h2 className="text-2xl font-bold mb-6 text-gray-500">
//             Upload Property Images
//           </h2>

//           <label className="block border-2 border-dashed border-blue-500 p-6 text-center bg-blue-50 text-blue-700 rounded-xl cursor-pointer hover:bg-blue-100">
//   Click to Upload Images (Min 3, Max 15)
//   <input
//     type="file"
//     multiple
//     accept="image/png, image/jpeg, image/jpg"
//     className="hidden"
//     onChange={handleImageChange}
//   />
// </label>

//           {images.length > 0 && (
//             <div className="flex gap-6 p-6 w-full bg-gray-50 rounded-2xl shadow-inner">
//               <div className="w-1/2">
//                 <div className="relative w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden border border-gray-300">
//                   <img
//                     src={currentImage || coverImage || images[0]?.preview}
//                     alt="Property Preview"
//                     className="w-full h-full object-cover"
//                   />
//                   {images.length > 1 && (
//                     <>
//                       <button
//                         onClick={handlePrevImage}
//                         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
//                       >
//                         &lt;
//                       </button>
//                       <button
//                         onClick={handleNextImage}
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
//                       >
//                         &gt;
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="w-1/2 grid grid-cols-3 gap-4">
//                 {images.map((img, index) => (
//                   <div
//                     key={index}
//                     className="relative group border p-2 rounded-lg bg-white shadow-md cursor-pointer hover:shadow-xl"
//                   >
//                     <img
//                       src={img.preview}
//                       alt="Uploaded"
//                       className="w-full h-28 object-cover rounded-lg"
//                       onClick={() => setCurrentImage(img.preview)}
//                     />
//                     <button
//                       className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
//                       onClick={() => handleRemoveImage(index)}
//                     >
//                       ✖
//                     </button>
//                     <button
//                       className={`absolute bottom-2 left-2 px-2 py-1 text-xs rounded shadow-md ${
//                         coverImage === img.preview
//                           ? "bg-green-600 text-white"
//                           : "bg-gray-300 hover:bg-gray-400"
//                       }`}
//                       onClick={() => handleSetCover(img.preview)}
//                     >
//                       {coverImage === img.preview ? "Cover Photo ✅" : "Set Cover"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="mt-8 flex gap-4">
//             <button
//               className="w-1/2 bg-blue-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 shadow-lg"
//               onClick={handleNextStage}
//             >
//               Save & Continue
//             </button>
//             <button
//               className="w-1/2 bg-gray-300 text-gray-700 text-sm font-semibold py-3 rounded-xl hover:bg-gray-400 shadow-lg"
//               onClick={() => setStage(3)}
//             >
//               Previous
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stage4;













import React, { useState } from "react";
import { useStage } from "../context/SetStageContext";
import { useProperty } from "../context/PropertyContext";

const Stage4 = () => {
  const { stage, setStage } = useStage();
  const {
    images,
    coverImage,
    handleImageChange,
    handleRemoveImage,
    handleSetCover,
    propertyType,
  } = useProperty();

  const [currentImage, setCurrentImage] = useState(null);
  const steps = [
    "Type-Category",
    "Property Location",
    "Property Detail",
    "Add Images",
    "Add Amenities",
  ];

  const handleNextStage = () => {
    if (images.length === 0) {
      alert("Please upload at least one image before proceeding.");
      return;
    }
    if (!coverImage) {
      alert("Please select a cover photo before proceeding.");
      return;
    }
    if (propertyType === "Commercial Land" || propertyType === "Plot / Land") {
      setStage((prevStage) => prevStage + 2);
    } else {
      setStage((prevStage) => prevStage + 1);
    }
  };

  const handlePrevImage = () => {
    const currentIndex = images.findIndex((img) => img.preview === currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[prevIndex]?.preview);
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex((img) => img.preview === currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]?.preview);
  };

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="w-1/5 mt-7 ml-5">
        <div className="w-1/2 flex flex-col items-center">
          {steps.map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              {index !== 0 && (
                <div className={`w-1 h-7 ${stage > index + 1 ? 'bg-gray-300' : 'bg-gray-300'}`} />
              )}
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 shadow-lg ${
                  stage === index + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-700 border-gray-400'
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-4/5 p-6">
        <div className="w-full mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-500">Upload Property Images</h2>

          <label className="block border-2 border-dashed border-blue-500 p-6 text-center bg-blue-50 text-blue-700 rounded-xl cursor-pointer hover:bg-blue-100">
            Click to Upload Images (Min 3, Max 15)
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {images.length > 0 && (
            <div className="flex gap-6 p-6 w-full bg-gray-50 rounded-2xl shadow-inner">
              <div className="w-1/2">
                <div className="relative w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden border border-gray-300">
                  <img
                    src={currentImage || coverImage || images[0]?.preview}
                    alt="Property Preview"
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="w-1/2 grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group border p-2 rounded-lg bg-white shadow-md cursor-pointer hover:shadow-xl"
                  >
                    <img
                      src={img.preview}
                      alt="Uploaded"
                      className="w-full h-28 object-cover rounded-lg"
                      onClick={() => setCurrentImage(img.preview)}
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ✖
                    </button>
                    <button
                      className={`absolute bottom-2 left-2 px-2 py-1 text-xs rounded shadow-md ${
                        coverImage === img.preview ? "bg-green-600 text-white" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => handleSetCover(img.preview)}
                    >
                      {coverImage === img.preview ? "Cover Photo ✅" : "Set Cover"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <button
              className="w-1/2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 shadow-lg"
              onClick={handleNextStage}
            >
              Save & Continue
            </button>
            <button
              className="w-1/2 bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 shadow-lg"
              onClick={() => setStage(3)}
            >
              Previous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage4;