// import { useState,useEffect } from "react";
// import {useStage} from "../context/SetStageContext"
// import {useProperty}  from "../context/PropertyContext"

// const Stage5 = () => {
//   const { stage, setStage } = useStage();

//   const {furnishing,setFurnishing,selectedRooms,setSelectedRooms,selectedAmenities,setSelectedAmenities,
//     coveredParking,setCoveredParking,openParking,setOpenParking,facing,setFacing,roomOptions,amenitiesList,facingOptions,
//     handleRoomSelection,handleAmenityToggle
//   }=useProperty()

//   // const [furnishing, setFurnishing] = useState("");
//   // const [selectedRooms, setSelectedRooms] = useState([]);
//   // const [selectedAmenities, setSelectedAmenities] = useState([]);
//   // const [coveredParking, setCoveredParking] = useState(0);
//   // const [openParking, setOpenParking] = useState(0);
//   // const [facing, setFacing] = useState("");

//   // const roomOptions = ["Pooja Room", "Servant Room", "Study Room", "Store Room"];
//   // const amenitiesList = [
//   //   "Light", "Fans", "AC", "TV", "Beds", "Wardrobe", "Geyser", "Sofa",
//   //   "WashingMachine", "Fridge", "Microwave", "Stove", "WaterPurifier",
//   //   "ModularKitchen", "DiningTable", "Chimney", "Curtains", "ExhaustFan"
//   // ];
//   // const facingOptions = [
//   //   "North", "South", "East", "West",
//   //   "North-East", "North-West", "South-East", "South-West"
//   // ];

//   // const handleRoomSelection = (room) => {
//   //   setSelectedRooms((prev) =>
//   //     prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
//   //   );
//   // };

//   // const handleAmenityToggle = (amenity) => {
//   //   setSelectedAmenities((prev) =>
//   //     prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
//   //   );
//   // };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md border border-gray-300">
//       <h2 className="text-lg font-semibold mb-4 text-blue-700">Property Details</h2>

//       {/* Furnishing Selection */}
//       <label className="font-medium text-gray-700">Furnishing:</label>
//       <div className="flex gap-2 mt-2">
//         {["Furnished", "Semi-Furnished", "Unfurnished"].map((option) => (
//           <button
//             key={option}
//             className={`px-4 py-2 rounded-full border ${
//               furnishing === option ? "bg-blue-600 text-white" : "bg-gray-100"
//             }`}
//             onClick={() => setFurnishing(option)}
//           >
//             {option}
//           </button>
//         ))}
//       </div>

//       {/* Amenities (Appear only if Furnished or Semi-Furnished) */}
//       {(furnishing === "Furnished" || furnishing === "Semi-Furnished") && (
//         <div className="mt-4">
//           <label className="font-medium text-gray-700">Select at least 3 Amenities:</label>
//           <div className="grid grid-cols-2 gap-3 mt-2">
//             {amenitiesList.map((amenity) => (
//               <button
//                 key={amenity}
//                 className={`px-4 py-2 rounded-full border ${
//                   selectedAmenities.includes(amenity) ? "bg-green-600 text-white" : "bg-gray-100"
//                 }`}
//                 onClick={() => handleAmenityToggle(amenity)}
//               >
//                 {amenity}
//               </button>
//             ))}
//           </div>
//           {selectedAmenities.length < 3 && (
//             <p className="text-red-500 text-sm mt-2">You must select at least 3 amenities.</p>
//           )}
//         </div>
//       )}

//       {/* Facing Direction Selection */}
//       <div className="mt-4">
//         <label className="font-medium text-gray-700">Facing:</label>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {facingOptions.map((direction) => (
//             <button
//               key={direction}
//               className={`px-4 py-2 rounded-full border ${
//                 facing === direction ? "bg-blue-600 text-white" : "bg-gray-100"
//               }`}
//               onClick={() => setFacing(direction)}
//             >
//               {direction}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Other Rooms Selection */}
//       <div className="mt-4">
//         <label className="font-medium text-gray-700">Other Rooms (Optional):</label>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {roomOptions.map((room) => (
//             <button
//               key={room}
//               className={`px-4 py-2 rounded-full border ${
//                 selectedRooms.includes(room) ? "bg-green-600 text-white" : "bg-gray-100"
//               }`}
//               onClick={() => handleRoomSelection(room)}
//             >
//               {room}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Reserved Parking */}
//       <div className="mt-4">
//         <label className="font-medium text-gray-700">
//           Reserved Parking <span className="text-gray-400">(Optional)</span>
//         </label>
//         <div className="flex items-center gap-6 mt-2">
//           {/* Covered Parking */}
//           <div className="flex items-center gap-3">
//             <span className="text-gray-700">Covered Parking</span>
//             <button
//               className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 text-gray-800"
//               onClick={() => setCoveredParking((prev) => Math.max(0, prev - 1))}
//             >
//               -
//             </button>
//             <span className="w-6 text-center">{coveredParking}</span>
//             <button
//               className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white"
//               onClick={() => setCoveredParking((prev) => prev + 1)}
//             >
//               +
//             </button>
//           </div>

//           {/* Open Parking */}
//           <div className="flex items-center gap-3">
//             <span className="text-gray-700">Open Parking</span>
//             <button
//               className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 text-gray-800"
//               onClick={() => setOpenParking((prev) => Math.max(0, prev - 1))}
//             >
//               -
//             </button>
//             <span className="w-6 text-center">{openParking}</span>
//             <button
//               className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white"
//               onClick={() => setOpenParking((prev) => prev + 1)}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button
//         className="mt-4 w-full bg-blue-600 text-white p-3 rounded-full disabled:bg-gray-400"
//         disabled={furnishing !== "Unfurnished" && selectedAmenities.length < 3}
//       >
//         Submit Property
//       </button>  <button
//         className="mt-4 w-full bg-blue-600 text-white p-3 rounded-full disabled:bg-gray-400"
//           onClick={()=>{setStage(4)}}
//       >
//         Previous
//       </button>
//     </div>
//   );
// };

// export default Stage5;






import { useState, useEffect } from "react";
import { useStage } from "../context/SetStageContext";
import { useProperty } from "../context/PropertyContext";

const Stage5 = () => {
  const { stage, setStage } = useStage();
  const {
    furnishing,
    setFurnishing,
    selectedRooms,
    setSelectedRooms,
    selectedAmenities,
    setSelectedAmenities,
    coveredParking,
    setCoveredParking,
    openParking,
    setOpenParking,
    facing,
    setFacing,
    roomOptions,
    amenitiesList,
    facingOptions,
    handleRoomSelection,
    handleAmenityToggle,
    SethouseStatus,
        houseStatus,
        HouseStatus,
        setPossessionDate,
        possessionDate,
  } = useProperty();

  const steps = ['Listing Type-Category', 'Property Location', 'Property Detail', 'Add Images', 'Add Aminities'];

  useEffect(() => {
    if (houseStatus === "Ready To Move") {
      setPossessionDate("");
    }
  }, [houseStatus]);

  return (


    <div className="flex w-full min-h-screen bg-gray-100"> 
    <div className="w-1/3 mt-7 ml-15">
      <div className="w-1/2 flex flex-col items-center">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            {index !== 0 && (
              <div className={`w-1 h-7 ${stage > index + 1 ? 'bg-gray-300' : 'bg-gray-300'}`} />
            )}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 ${
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
    

    <div className="w-2/3 p-6 mr-48 ml-20 ">
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md border border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Property Details</h2>

      {/* Furnishing Selection */}
      <label className="font-medium text-gray-700">Furnishing:</label>
      <div className="flex gap-2 mt-2">
        {["Furnished", "Semi-Furnished", "Unfurnished"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full border ${
              furnishing === option ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => setFurnishing(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Amenities Selection (Only if Furnished or Semi-Furnished) */}
      {(furnishing === "Furnished" || furnishing === "Semi-Furnished") && (
        <div className="mt-4">
          <label className="font-medium text-gray-700">Select at least 3 Amenities:</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity}
                className={`px-4 py-2 rounded-full border ${
                  selectedAmenities.includes(amenity) ? "bg-green-600 text-white" : "bg-gray-100"
                }`}
                onClick={() => handleAmenityToggle(amenity)}
              >
                {amenity}
              </button>
            ))}
          </div>
          {selectedAmenities.length < 3 && (
            <p className="text-red-500 text-sm mt-2">You must select at least 3 amenities.</p>
          )}
        </div>
      )}

      {/* Facing Direction Selection */}
      <div className="mt-4">
        <label className="font-medium text-gray-700">Facing:</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {facingOptions.map((direction) => (
            <button
              key={direction}
              className={`px-4 py-2 rounded-full border ${
                facing === direction ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => setFacing(direction)}
            >
              {direction}
            </button>
          ))}
        </div>
      </div>


      <div className="mt-4">
                 <label className="font-medium text-gray-700">Facing:</label> 
                         <div className="flex flex-wrap gap-2 mt-2">
                                     {HouseStatus.map((direction) => (  
                                      <button key={direction} className={`px-4 py-2 rounded-full border ${houseStatus === direction ? "bg-blue-600 text-white" : "bg-gray-100" }`}
                                     onClick={() => SethouseStatus(direction)}> 
                                                  {direction}             
                               </button>           
                      ))}       
                                                  
                          </div>       
                        </div>

        {houseStatus === "Under Construction" && (
  <div className="my-4">
    <label htmlFor="possessionDate" className="block mb-2 font-semibold">
      Possession Date (Month &amp; Year):
    </label>
    <input
      type="month"
      id="possessionDate"
      name="possessionDate"
      className="border border-gray-300 rounded p-2"
      // Add value and onChange as needed, for example:
      value={possessionDate}
      onChange={(e) => setPossessionDate(e.target.value)}
    />
  </div>
)}






      {/* Other Rooms Selection */}
      <div className="mt-4">
        <label className="font-medium text-gray-700">Other Rooms (Optional):</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {roomOptions.map((room) => (
            <button
              key={room}
              className={`px-4 py-2 rounded-full border ${
                selectedRooms.includes(room) ? "bg-green-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => handleRoomSelection(room)}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      {/* Reserved Parking Selection */}
      <div className="mt-4">
        <label className="font-medium text-gray-700">
          Reserved Parking <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="flex items-center gap-6 mt-2">
          {/* Covered Parking */}
          <div className="flex items-center gap-3">
            <span className="text-gray-700">Covered Parking</span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 text-gray-800"
              onClick={() => setCoveredParking((prev) => Math.max(0, prev - 1))}
            >
              -
            </button>
            <span className="w-6 text-center">{coveredParking}</span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white"
              onClick={() => setCoveredParking((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Open Parking */}
          <div className="flex items-center gap-3">
            <span className="text-gray-700">Open Parking</span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 text-gray-800"
              onClick={() => setOpenParking((prev) => Math.max(0, prev - 1))}
            >
              -
            </button>
            <span className="w-6 text-center">{openParking}</span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white"
              onClick={() => setOpenParking((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-400 text-white p-3 rounded-full"
          onClick={() => setStage(stage - 1)}
        >
          Previous
        </button>
        <button
          className="bg-blue-600 text-white p-3 rounded-full disabled:bg-gray-400"
          disabled={furnishing !== "Unfurnished" && selectedAmenities.length < 3}
          onClick={()=>{setStage(stage+1)}}
        >
          Submit Property
        </button>
      </div> */}



      <div className="mt-6 flex gap-3">
        <button className="w-1/2 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg" 
         disabled={furnishing !== "Unfurnished" && selectedAmenities.length < 3}
          onClick={()=>{setStage(stage+1)}}>
          Save & Continue
        </button>
        <button className="w-1/2 bg-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg" onClick={() => setStage(4)}>
          Previous
        </button>
      </div>


    </div>
    </div>
    </div>
  );
};

export default Stage5;
