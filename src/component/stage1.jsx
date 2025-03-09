import React from 'react';
import { useStage } from "../context/SetStageContext";
import { useProperty } from "../context/PropertyContext";

const Stage1 = () => {
  const { listingType, setListingType, propertyCategory, setPropertyCategory, propertyType, setPropertyType } = useProperty();
  const { stage, setStage } = useStage();

  const propertyTypes = {
    residential: [
      "Flat/Apartment",
      "Independent House / Villa",
      "Independent / Builder Floor",
      "Plot / Land",
      "Serviced Apartment",
      "Farmhouse",
      "Other",
    ],
    commercial: ["Office Space", "Shop", "Warehouse", "Commercial Land", "Other"],
  };

  const steps = ['Listing Type-Category', 'Property Location', 'Property Detail', 'Add Images', 'Add Aminities'];

  return (
    <>
      <div className="flex  gap-6 w-full h-full bg-gray-100 rounded-xl">
        <div className="w-1/3 mt-7 ml-15 h-9/10">
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

        <div className="w-2/3 p-6 mr-52">
          <div className="p-6 max-w-lg mx-auto bg-white w-lg rounded-xl mt-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome</h2>
            <p className="text-gray-500 mb-4 text-sm">Fill out basic details</p>

            {/* Listing Type */}
            <h3 className="text-sm font-medium mb-2">I'm looking to</h3>
            <div className="flex gap-2 mb-4">
              {["sell", "rent/lease", "pg"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 text-sm rounded-full ${
                    listingType === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setListingType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Property Category */}
            <h3 className="text-sm font-medium mb-2">Property Type</h3>
            <div className="flex gap-2 mb-4">
              {["residential", "commercial"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm rounded-full ${
                    propertyCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setPropertyCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Property Subtype */}
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes[propertyCategory]?.map((type) => (
                <button
                  key={type}
                  className={`px-3 py-2 text-xs rounded-lg border ${
                    propertyType === type ? "border-blue-500 bg-blue-100" : "border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setPropertyType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              className={`mt-6 w-full text-sm font-medium py-2 rounded-lg transition-all duration-300 ${
                listingType && propertyCategory && propertyType
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={() => listingType && propertyCategory && propertyType && setStage(2)}
              disabled={!listingType || !propertyCategory || !propertyType}
            >
              Save and Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stage1;
