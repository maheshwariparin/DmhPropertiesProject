// import { useEffect, useState } from "react";
// import { useProperty } from "../context/PropertyContext";
// import { FaBath, FaBed, FaRulerCombined, FaCar, FaHome,FaToilet,FaBuilding,FaCompass} from "react-icons/fa";
// import { IoLocationSharp } from "react-icons/io5";
// import { MdBalcony } from "react-icons/md";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStairs } from "@fortawesome/free-solid-svg-icons";
// import { FaCouch, FaCheckCircle, FaDoorOpen } from "react-icons/fa";


// const Preview = () => {
//   const {
//     location,
//     bedrooms,
//     bathrooms,
//     balconies,
//     carpetArea,
//     areaUnit,
//     totalFloors,
//     selectedFloor,
//     expectedPrice,
//     summary,
//     images,
//     coverImage,
//     selectedAmenities,
//     furnishing,
//     facing,
//     propertyType,
//     openParking,
//     coveredParking,
//     propertyCategory,    
//     selectedRooms,
//   } = useProperty();

//   const formatPrice = (price) => {
//     if (price >= 10000000) {
//       return (price / 10000000).toFixed(1) + ' Cr';
//     } else if (price >= 100000) {
//       return (price / 100000).toFixed(0) + ' Lakh';
//     }
//     return price?.toLocaleString();
//   };

//   const pricePerSqFt = expectedPrice && carpetArea ? (expectedPrice / carpetArea).toFixed(2) : null;

  
//     const [currentImage, setCurrentImage] = useState(null);
    

//     const handlePrevImage = () => {
//       const currentIndex = images.findIndex((img) => img.preview === currentImage);
//       const prevIndex = (currentIndex - 1 + images.length) % images.length;
//       setCurrentImage(images[prevIndex]?.preview);
//     };
  
//     const handleNextImage = () => {
//       const currentIndex = images.findIndex((img) => img.preview === currentImage);
//       const nextIndex = (currentIndex + 1) % images.length;
//       setCurrentImage(images[nextIndex]?.preview);
//     };
  
   
          
  
//   return (
//     <div className="p-6 w-full bg-white rounded-xl mt-0">
//       <div className="w-full h-[100px] bg-white p-4 flex items-center border-b border-gray-500">
//         <div className="flex-1">
//           <div className="ml-25 text-3xl font-bold text-gray-500 mt-[-35px]">
//             ₹{formatPrice(expectedPrice)}
//             {pricePerSqFt && <span className="text-sm text-gray-400 ml-2">@ ₹{pricePerSqFt} per sq.ft.</span>}
//           </div>
//         </div>
//         <div className="flex-1 border-l pl-4 ml-0 mr-80 text-gray-500">
//           <div className="text-2xl font-semibold">
//             {bedrooms}BHK {bathrooms}Baths
//           </div>
//           <div className="text-sm text-gray-400 mt-1">
//             {propertyType} for Sale
//           </div>
//           <div className="text-xs text-gray-400 mt-1">
//             in {location?.locality}, {location?.society}
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-6 p-6 w-full bg-gray-100 rounded-xl">
//         <div className="w-1/2">
      
//             <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
//               <img
//                 src={currentImage || coverImage || images[0]?.preview}
//                 alt="Property Preview"
//                 className="w-full h-full object-cover"
//               />
//               {images.length > 1 && (
//                 <>
//                   <button
//                     onClick={handlePrevImage}
//                     className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                   >
//                     &lt;
//                   </button>
//                   <button
//                     onClick={handleNextImage}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                   >
//                     &gt;
//                   </button>
//                 </>
//               )}
            
//           </div>
//         </div>
//         <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold text-gray-700 mb-4">Property Details</h2>
//           <div className="grid grid-cols-2 gap-4 text-gray-600">
//           <div className="flex items-center gap-2">
//   {propertyCategory === "commercial" ? (
//     <>
//       <FaBuilding /> {bedrooms} Rooms
//     </>
//   ) : (
//     <>
//       <FaBed /> {bedrooms} Bedrooms
//     </>
//   )}
// </div>

// <div className="flex items-center gap-2">
//   {propertyCategory === "commercial" ? (
//     <>
//       <FaToilet /> {bathrooms} Washrooms
//     </>
//   ) : (
//     <>
//       <FaBath /> {bathrooms} Bathrooms
//     </>
//   )}
// </div>
//             <div className="flex items-center gap-2"><MdBalcony /> {balconies} Balconies</div>
//             <div className="flex items-center gap-2"><FaRulerCombined /> {carpetArea} {areaUnit}</div>
//             <div className="flex items-center gap-2">
//   <FaCar />
//   Parking:{" "}
//   {coveredParking
//     ? " Available"
//     : openParking
//     ? " Available"
//     : "Not Available"}
// </div>
//             <div className="flex items-center gap-2"><FaHome /> {propertyType}</div>
//             <div className="flex items-center gap-2"><IoLocationSharp /> {location?.locality}, {location?.society}</div>
//             {/* <div className="flex items-center gap-2">Floor : {selectedFloor}th of {totalFloors}</div>
//              */}
//              <div className="flex items-center gap-2"><FaCompass /> Facing: {facing || "Not Specified"}</div>
//           <div className="flex items-center gap-2">
//   {(propertyType === "Flat/Apartment" || propertyType === "Office Space") && (
//     <>
//       <FontAwesomeIcon icon={faStairs} className="text-xl" />
//       Floor : {selectedFloor}
//       <sup className="ml-[-7px]">
//         {selectedFloor === 1
//           ? "st"
//           : selectedFloor === 2
//           ? "nd"
//           : selectedFloor === 3
//           ? "rd"
//           : "th"}
//       </sup>{" "}
//       of {totalFloors}
//     </>
//   )}
// </div>

//           </div>
//           <h3 className="mt-6 text-lg font-semibold text-gray-700">Summary</h3>
//           <p className="text-sm text-gray-500 mt-2">{summary || 'No summary provided'}</p>
//         </div>
//       </div>

//       <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
//   <h2 className="text-xl font-bold text-gray-700 mb-4">Additional Details</h2>
  
//   <div className="grid grid-cols-2 gap-6">
//     {/* Furnishing */}
//     <div>
//       <h3 className="text-lg font-semibold text-gray-600 mb-2">Furnishing</h3>
//       <div className="flex items-center gap-2 text-gray-500">
//         <FaCouch />
//         {furnishing || "Not furnished"}
//       </div>
//     </div>

//     {/* Facing */}
//     <div>
//     <h3 className="text-lg font-semibold text-gray-600 mb-2">Rooms</h3>
//       <div className="grid grid-cols-2 gap-2">
//         {selectedRooms?.map((room, index) => (
//           <div key={index} className="flex items-center gap-2 text-gray-500">
//             <FaDoorOpen />
//             {room}
//           </div>
//         )) || <p className="text-gray-400">No additional rooms</p>}
//       </div>
//     </div>

//     {/* Amenities */}
//     <div className="mb-19">
//       <h3 className="text-lg font-semibold text-gray-600 mb-2">Amenities</h3>
//       <div className="grid grid-cols-2 gap-2">
//         {selectedAmenities?.map((amenity, index) => (
//           <div key={index} className="flex items-center gap-2 text-gray-500">
//             <FaCheckCircle className="text-green-500" />
//             {amenity}
//           </div>
//         )) || <p className="text-gray-400">No amenities available</p>}
//       </div>
//     </div>

//     {/* Rooms */}
//     <div>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// };

// export default Preview;


















import { useEffect, useState } from "react";
import { useProperty } from "../context/PropertyContext";
import { FaBath, FaBed, FaRulerCombined, FaCar, FaHome, FaToilet, FaBuilding, FaCompass } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdBalcony } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStairs } from "@fortawesome/free-solid-svg-icons";
import { FaCouch, FaCheckCircle, FaDoorOpen } from "react-icons/fa";
import {FaParking } from "react-icons/fa";

const Preview = () => {
  const {
    location,
    bedrooms,
    bathrooms,
    balconies,
    carpetArea,
    areaUnit,
    totalFloors,
    selectedFloor,
    expectedPrice,
    summary,
    images,
    coverImage,
    selectedAmenities,
    furnishing,
    facing,
    propertyType,
    openParking,
    coveredParking,
    propertyCategory,    
    selectedRooms,
    listingType,
    rentPrice,
  } = useProperty();

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(1) + ' Cr';
    } else if (price >= 100000) {
      return (price / 100000).toFixed(0) + ' Lakh';
    }
    return price?.toLocaleString();
  };

  const pricePerSqFt = expectedPrice && carpetArea ? (expectedPrice / carpetArea).toFixed(2) : null;

  const [currentImage, setCurrentImage] = useState(null);

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

  if (propertyType === "Commercial Land" || propertyType === "Plot / Land") {
    return (
      <div className="p-6 w-full bg-white rounded-xl mt-0">
      <div className="w-full h-[100px] bg-white p-4 flex items-center border-b border-gray-500">
        <div className="flex-1">
        <div className="ml-25 text-3xl font-bold text-gray-500">
  {listingType?.toLowerCase() === "sell" ? (
    <>
      ₹{formatPrice(expectedPrice)}
      {pricePerSqFt && (
        <span className="text-sm text-gray-400 ml-2">
          @ ₹{pricePerSqFt} per sq.ft.
        </span>
      )}
    </>
  ) : (
    <>
      ₹{formatPrice(rentPrice)} / month
    </>
  )}
</div>

    </div>
        <div className="flex-1 border-l pl-4 ml-0 mr-80 text-gray-500">
        
        <div className="text-sm text-gray-400 mt-1">
  {`${propertyType} for ${listingType}` }
</div>
          <div className="text-xs text-gray-400 mt-1">
            in {location?.locality}, {location?.society}
          </div>
        </div>
      </div>
      <div className="flex gap-6 p-6 w-full bg-gray-100 rounded-xl">
        <div className="w-1/2">
     
            <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={currentImage || coverImage || images[0]?.preview}
               alt="Property Preview"
               className="w-full h-full object-cover"
             />
             {images.length > 1 && (
               <>
                 <button
                   onClick={handlePrevImage}
                   className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                 >
                   &lt;
                 </button>
                 <button
                   onClick={handleNextImage}
                   className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                 >
                   &gt;
                 </button>
               </>
             )}
           
         </div>
       </div>
       <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
    

        
         <h3 className="mt-6 text-lg font-semibold text-gray-700">Summary</h3>
         <p className="text-sm text-gray-500 mt-2">{summary || 'No summary provided'}</p>
       </div>
     </div>
  </div>
    );
  }

  return (
    <div className="p-6 w-full bg-white rounded-xl mt-0">
           <div className="w-full h-[100px] bg-white p-4 flex items-center border-b border-gray-500">
             <div className="flex-1">
             <div className="ml-25 text-3xl font-bold text-gray-500">
  {listingType?.toLowerCase() === "sell" ? (
    <>
      ₹{formatPrice(expectedPrice)}
      {pricePerSqFt && (
        <span className="text-sm text-gray-400 ml-2">
          @ ₹{pricePerSqFt} per sq.ft.
        </span>
      )}
    </>
  ) : (
    <>
      ₹{formatPrice(rentPrice)} / month
    </>
  )}
</div>

         </div>
             <div className="flex-1 border-l pl-4 ml-0 mr-80 text-gray-500">
               <div className="text-2xl font-semibold">
                 {bedrooms}BHK {bathrooms}Baths
               </div>
               <div className="text-sm text-gray-400 mt-1">
               {`${propertyType} for ${listingType}` }
               </div>
               <div className="text-xs text-gray-400 mt-1">
                 in {location?.locality}, {location?.society}
               </div>
             </div>
           </div>
           <div className="flex gap-6 p-6 w-full bg-gray-100 rounded-xl">
             <div className="w-1/2">
          
                 <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                   <img
                     src={currentImage || coverImage || images[0]?.preview}
                    alt="Property Preview"
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                      >
                        &gt;
                      </button>
                    </>
                  )}
                
              </div>
            </div>
            <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div className="flex items-center gap-2">
      {propertyCategory === "commercial" ? (
        <>
          <FaBuilding /> {bedrooms} Rooms
        </>
      ) : (
        <>
          <FaBed /> {bedrooms} Bedrooms
        </>
      )}
    </div>
    
    <div className="flex items-center gap-2">
      {propertyCategory === "commercial" ? (
        <>
          <FaToilet /> {bathrooms} Washrooms
        </>
      ) : (
        <>
          <FaBath /> {bathrooms} Bathrooms
        </>
      )}
    </div>
                <div className="flex items-center gap-2"><MdBalcony /> {balconies} Balconies</div>
                <div className="flex items-center gap-2"><FaRulerCombined /> {carpetArea} {areaUnit}</div>
                <div className="flex items-center gap-2">
      <FaCar />
      Parking:{" "}
      {coveredParking
        ? " Available"
        : openParking
        ? " Available"
        : "Not Available"}
    </div>
                <div className="flex items-center gap-2"><FaHome /> {propertyType}</div>
                <div className="flex items-center gap-2"><IoLocationSharp /> {location?.locality}, {location?.society}</div>
                {/* <div className="flex items-center gap-2">Floor : {selectedFloor}th of {totalFloors}</div>
                 */}
                 <div className="flex items-center gap-2"><FaCompass /> Facing: {facing || "Not Specified"}</div>
              <div className="flex items-center gap-2">
      {(propertyType === "Flat/Apartment" || propertyType === "Office Space") && (
        <>
          <FontAwesomeIcon icon={faStairs} className="text-xl" />
          Floor : {selectedFloor}
          <sup className="ml-[-7px]">
            {selectedFloor === 1
              ? "st"
              : selectedFloor === 2
              ? "nd"
              : selectedFloor === 3
              ? "rd"
              : "th"}
          </sup>{" "}
          of {totalFloors}
        </>
      )}
    </div>
    
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-700">Summary</h3>
              <p className="text-sm text-gray-500 mt-2">{summary || 'No summary provided'}</p>
            </div>
          </div>
    
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Additional Details</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Furnishing */}
        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Furnishing</h3>
          <div className="flex items-center gap-2 text-gray-500">
            <FaCouch />
            {furnishing || "Not furnished"}
          </div>
        </div>
    
        {/* Facing */}
        <div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Rooms</h3>
          <div className="grid grid-cols-2 gap-2">
            {selectedRooms?.map((room, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-500">
                <FaDoorOpen />
                {room}
              </div>
            )) || <p className="text-gray-400">No additional rooms</p>}
          </div>
        </div>
    
        {/* Amenities */}
        <div className="mb-19">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {selectedAmenities?.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-500">
                <FaCheckCircle className="text-green-500" />
                {amenity}
              </div>
            )) || <p className="text-gray-400">No amenities available</p>}
          </div>
        </div>
    
        {/* Rooms */}
        <div className="text-lg font-semibold text-gray-600 mt-1">
        
      <h2 className="text-lg font-semibold mb-4">Parking Info</h2>

      <div className="space-y-4 text-lg">
        {openParking > 0 && (
          <div className="flex items-center space-x-2">
            <FaParking className="text-gray-400" size={24} />
            <span>Open Parking: {openParking}</span>
          </div>
        )}

        {coveredParking > 0 && (
          <div className="flex items-center space-x-2">
            <FaCar className="text-gray-400" size={24} />
            <span className="text-lg">Covered Parking: {coveredParking}</span>
          </div>
        )}
      </div>
  
        </div>
      </div>
    </div>
    
        </div>
  );
};

export default Preview;
