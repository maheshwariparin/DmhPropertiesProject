import React, { useState } from 'react'
import {useStage} from "../context/SetStageContext"
import {useProperty}  from "../context/PropertyContext"

const stage2 = () => {

        const { stage, setStage } = useStage();
        const [error, setError] = useState("");

        const {location, setLocation, handleChange} = useProperty()

        const handleNext = () => {
          if (!location.city || !location.locality || !location.society) {
            setError("All fields except House No. are required.");
            return;
          }
          setError("");
          setStage(3);
        };

        const steps = ['Listing Type-Category', 'Property Location', 'Property Detail', 'Add Images', 'Add Amenities'];

  return (
    <div className="flex w-full min-h-screen bg-gray-100"> {/* Set background to gray */}
      <div className="w-1/3 mt-7 ml-15">
        <div className="w-1/2 flex flex-col items-center">
          {steps.map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              {index !== 0 && (
                <div className={`w-1 h-7 ${stage > index + 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
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

      <div className="w-2/3 p-6 mr-48 ml-20 mt-15">
        <div className="w-2/3 p-6 rounded-2xl bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-3 text-center"> Property Location</h2>
          <p className="text-gray-600 text-center mb-4 text-sm">
            Enter accurate details to help buyers find your property easily.
          </p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="space-y-4">
            <input
              type="text"
              name="city"
              value={location.city}
              onChange={handleChange}
              placeholder="Enter City (e.g., Ahmedabad West)"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-blue-500 placeholder-gray-400 shadow-sm"
            />

            <input
              type="text"
              name="locality"
              value={location.locality}
              onChange={handleChange}
              placeholder="Enter Locality"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-blue-500 placeholder-gray-400 shadow-sm"
            />

            <input
              type="text"
              name="society"
              value={location.society}
              onChange={handleChange}
              placeholder="Apartment / Society"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-blue-500 placeholder-gray-400 shadow-sm"
            />

            <input
              type="text"
              name="houseNo"
              value={location.houseNo}
              onChange={handleChange}
              placeholder="House No. (Optional)"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-blue-500 placeholder-gray-400 shadow-sm"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button 
              className="w-1/2 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleNext}
            >
              Save & Continue
            </button>

            <button 
              className="w-1/2 bg-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              onClick={() => setStage(1)}
            >
              Previous
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default stage2
