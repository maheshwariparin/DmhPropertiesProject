import React, { useState, useEffect } from 'react';
import { useStage } from '../context/SetStageContext';
import { useProperty } from '../context/PropertyContext';

const Stage3 = () => {
  const { stage, setStage } = useStage();

  const {
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    balconies,
    setBalconies,
    carpetArea,
    setCarpetArea,
    areaUnit,
    setAreaUnit,
    totalFloors,
    setTotalFloors,
    selectedFloor,
    setSelectedFloor,
    selectedAge,
    setSelectedAge,
    listingType,
    propertyType,
    generateFloorOptions,
    ageOptions,
    expectedPrice,
    setExpectedPrice,
    rentPrice,
    setRentPrice,
    pricePerSqft,
    setPricePerSqft,
    summary,
    setSummary,
    handleAutoGenerate,
    propertyCategory,
  } = useProperty();

  const showFloorOptions = propertyType === 'Flat/Apartment' || propertyType === 'Office Space';
 
  

  useEffect(() => {
    if (listingType === 'sell' && expectedPrice && carpetArea > 0) {
      setPricePerSqft((expectedPrice / carpetArea).toFixed(2));
    } else {
      setPricePerSqft('');
    }
  }, [expectedPrice, carpetArea, listingType]);

  // Validation State
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!bedrooms) return setError('Please select the number of bedrooms.');
    if (!bathrooms) return setError('Please select the number of bathrooms.');
    if (!carpetArea || carpetArea <= 0) return setError('Please enter a valid carpet area.');
    if (showFloorOptions && (!totalFloors || totalFloors < 0)) return setError('Please enter the total floors.');
    if (showFloorOptions && (!selectedFloor || selectedFloor === '')) return setError('Please select a floor.');
    if (!selectedAge) return setError('Please select the property age.');
    if (listingType === 'sell' && (!expectedPrice || expectedPrice <= 0)) {
      return setError('Please enter the expected price.');
    }
    if ((listingType === 'rent/lease' || listingType === 'pg') && (!rentPrice || rentPrice <= 0)) {
      return setError('Please enter the rent price.');
    }

    setError('');
    setStage(4);
  };

  const steps = ['Listing Type-Category', 'Property Location', 'Property Detail', 'Add Images', 'Add Aminities'];

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
    <div className="max-w-lg mx-auto p-4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Tell us about your property</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {propertyType !== "Commercial Land" && propertyType !== "Plot / Land" && (
  <>
    {/* Bedrooms or Rooms */}
    <div>
      <p className="font-medium text-sm">
        {propertyCategory?.toLowerCase() === "commercial" ? "No. of Rooms" : "No. of Bedrooms"}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => setBedrooms(num)}
            className={`px-3 py-1 border rounded-full text-sm ${
              bedrooms === num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>

    {/* Bathrooms */}
    <div>
      <p className="font-medium text-sm">No. of Bathrooms</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => setBathrooms(num)}
            className={`px-3 py-1 border rounded-full text-sm ${
              bathrooms === num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>

    {/* Balconies */}
    <div>
      <p className="font-medium text-sm">Balconies</p>
      <div className="flex gap-2 mt-2">
        {[0, 1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setBalconies(num)}
            className={`px-3 py-1 border rounded-full text-sm ${
              balconies === num ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setBalconies("More than 3")}
          className={`px-3 py-1 border rounded-full text-sm ${
            balconies === "More than 3" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          3+
        </button>
      </div>
    </div>
  </>
)}


      {/* Carpet Area */}
      <div>
        <p className="font-medium text-sm">Super Built Up Area</p>
        <div className="flex items-center gap-2">
        <input
  type="number"
  className="border p-2 rounded-md w-full text-sm mt-1 outline-none appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-moz-number-spin-box]:appearance-none"
  placeholder="Enter Super Built Up Area(sq ft)"
  value={carpetArea}
  onChange={(e) => setCarpetArea(e.target.value)}
  min="0"
/>
          <select className="border p-2 rounded-md text-sm" value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)}>
            <option value="sq.ft">sq.ft</option>
          </select>
        </div>
      </div>

      {/* Floors */}
      {showFloorOptions && (
        <div className="flex flex-wrap gap-2">
          <div>
            <p className="font-medium text-sm">Total Floors</p>
            <input
  type="number"
  className="border p-2 rounded-md w-24 text-sm outline-none appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-moz-number-spin-box]:appearance-none"
  placeholder="Enter total floors"
  value={totalFloors}
  onChange={(e) => setTotalFloors(e.target.value)}
  min="0"
/>
          </div>
          <div>
            <p className="font-medium text-sm">Select Floor</p>
            <select
              className="border p-2 rounded-md text-sm w-32"
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              disabled={totalFloors === ''}
            >
              {generateFloorOptions().map((floor, index) => (
                <option key={index} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Age of Property */}
      <div>
        <p className="font-medium text-sm">Age of Property</p>
        <div className="flex space-x-3 mt-2">
          {ageOptions.map((age, index) => (
            <button
              key={index}
              onClick={() => setSelectedAge(age)}
              className={`px-4 py-2 border rounded-full text-sm transition ${
                selectedAge === age ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300"'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Price Details */}
      <div className=" bg-white ">
        <p className="font-medium text-sm">Price Details</p>

        {listingType === 'sell' && (
          <div className="mt-2">
            <label className="text-sm">Expected Price</label>
            <input
  type="number"
  className="border p-2 rounded-md w-full text-sm mt-1 appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-moz-number-spin-box]:appearance-none"
  placeholder="Enter expected price in INR"
  value={expectedPrice}
  onChange={(e) => setExpectedPrice(e.target.value)}
/>
            {pricePerSqft && <p className="text-xs text-gray-600 mt-1">Price per sqft: ₹{pricePerSqft}</p>}
          </div>
        )}

        {(listingType === 'rent/lease' || listingType === 'pg') && (
          <div className="mt-2">
            <label className="text-sm">Rent Price</label>
            <input
              type="number"
              className="border p-2 rounded-md w-full text-sm mt-1"
              placeholder="Enter rent price"
              value={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
            />
          </div>
        )}
      </div>
       
      <div className="mt-4">
               <label className="font-medium text-sm">Summary</label>
       <textarea
         className="border p-2 w-full h-24 rounded-md text-sm"
         placeholder="Enter property summary"
         value={summary}
        onChange={(e) => setSummary(e.target.value)}
       />
       <button
         onClick={handleAutoGenerate}
         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
      >
         Auto Generate
       </button>
     </div>
  
      <div className="mt-6 flex gap-3">
        <button className="w-1/2 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg" onClick={handleNext}>
          Save & Continue
        </button>
        <button className="w-1/2 bg-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg" onClick={() => setStage(2)}>
          Previous
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Stage3;
