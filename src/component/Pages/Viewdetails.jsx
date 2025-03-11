import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBath, FaBed, FaRulerCombined, FaCar, FaHome, FaToilet, FaBuilding, FaCompass } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdBalcony } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStairs } from "@fortawesome/free-solid-svg-icons";
import { FaCouch, FaCheckCircle, FaDoorOpen } from "react-icons/fa";
import {FaParking } from "react-icons/fa";
import { supabase } from '../../supabaseClient';
import { useNavigate } from "react-router-dom";
import Loader from "../Loader"
import { FaStairs } from "react-icons/fa6";
import { Helmet } from 'react-helmet';
import { CiStopwatch } from "react-icons/ci";
const Viewdetails = () => {
    const [properties, setProperties] = useState({});
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
const [seoData, setSeoData] = useState({ title: '', description: '', schema: {} });
    const { id , slug} = useParams();
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate("/");
    };
  
    const expectedPrice = properties.expected_price || 0;
    const carpetArea = properties.carpet_area || 0;
    // const propertyType = properties.property_type || '';
    const coverImage = currentImage || images[0]?.preview;

    const formatPrice = (price) => {
        if (price >= 10000000) {
            return (price / 10000000).toFixed(1) + ' Cr';
        } else if (price >= 100000) {
            return (price / 100000).toFixed(0) + ' Lakh';
        }
        return price?.toLocaleString();
    };

    const pricePerSqFt = expectedPrice && carpetArea ? (expectedPrice / carpetArea).toFixed(2) : null;

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('dmhproperties')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching properties:', error.message);
        } else {
            setProperties(data);
            const imageUrls = await getImageUrls(data.id);
            setImages(imageUrls);
            setCurrentImage(imageUrls[0]?.preview || null);
            generateSeoData(data, imageUrls[0]?.preview || null);
        }
        setLoading(false);
    };






    const generateSeoData = (property, image) => {
      const {
          property_type, bedrooms, bathrooms, carpet_area, area_unit, location,
          expected_price, rent_price, selected_amenities, summary, imageUrl
      } = property;

      const title = `${bedrooms} BHK ${property_type} in ${location?.society}, ${location?.city}`;
      const description = summary || `Find a spacious ${bedrooms} BHK ${property_type} with ${bathrooms} bathrooms, spread across ${carpet_area} ${area_unit}.`;
      const price = expected_price ? `₹${expected_price}` : rent_price ? `₹${rent_price}/month` : "Price on request";

      const schemaForHelmet = {
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": title,
          "description": description,
          "image": imageUrl || image,
          "address": {
              "@type": "PostalAddress",
              "streetAddress": location?.society,
              "addressLocality": location?.locality,
              "addressRegion": location?.city,
              "addressCountry": "IN",
          },
          "numberOfRooms": bedrooms,
          "numberOfBathroomsTotal": bathrooms,
          "floorSize": {
              "@type": "QuantitativeValue",
              "value": carpet_area,
              "unitCode": area_unit,
          },
          "price": expected_price || rent_price,
          "priceCurrency": "INR",
          "amenities": selected_amenities,
      };

      setSeoData({ title, description, schema: schemaForHelmet });
  };

    const getImageUrls = async (propertyId) => {
        const { data, error } = await supabase.storage
            .from('property-images')
            .list(`${propertyId}/images`);

        if (error) return [];
        return data.map((file) => ({
            preview: supabase.storage.from('property-images').getPublicUrl(`${propertyId}/images/${file.name}`).data.publicUrl
        }));
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

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
          <Loader />
        </div>
      );
    }
  if (properties.property_type === "Commercial Land" || properties.property_type === "Plot / Land") {
     return (
       <div className="p-6 w-full bg-white rounded-xl mt-0">

              <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={properties?.selected_amenities?.join(", ") || ''} />
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />
                <meta property="og:image" content={properties?.imageUrl || currentImage} />
                <meta property="og:type" content="product" />
                <meta property="og:locale" content="en_IN" />
                <script type="application/ld+json">
                    {JSON.stringify(seoData.schema, null, 2)}
                </script>
            </Helmet>


       <div className="w-full h-[100px] bg-white p-4 flex items-center border-b border-gray-500">
         <div className="flex-1">
           <div className="ml-25 w-[300px] text-3xl font-bold text-gray-500">
             {properties.listing_type?.toLowerCase() === "sell" ? (
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
                 ₹{formatPrice(properties.rent_price)} / month
               </>
             )}
           </div>
         </div>
     
         <div className="flex-1 border-l pl-4 ml-0 mr-80 text-gray-500">
           <div className="text-sm text-gray-400 mt-1">
             {`${properties.property_type} for ${properties.listing_type}`}
           </div>
           <div className="text-xs text-gray-400 mt-1">
             in {properties.location?.locality}, {properties.location?.society}
           </div>
         </div>

    
         <div>
          <button  className="px-6 py-2 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition" onClick={handleNavigate} >Home</button>
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
           <p className="text-sm text-gray-500 mt-2">
             {properties.summary || "No summary provided"}
           </p>
         </div>
       </div>
     </div>
     
     );
   }
 
   return (
    <div className="p-6 w-full bg-white rounded-xl mt-0">
    <div className="w-full h-auto bg-white p-4 flex flex-col md:flex-row items-start md:items-center border-b border-gray-500">
      <div className="flex-1 w-full md:w-auto mb-4 md:mb-0">
        <div className="text-3xl font-bold text-gray-500">
          {properties.listing_type?.toLowerCase() === "sell" ? (
            <>
              ₹{formatPrice(expectedPrice)}
              {pricePerSqFt && (
                <span className="text-sm text-gray-400 ml-2">
                  @ ₹{pricePerSqFt} per sq.ft.
                </span>
              )}
            </>
          ) : (
            <>₹{formatPrice(properties.rent_price)} / month</>
          )}
        </div>
      </div>
  
      <div className="flex-1 w-full md:w-auto border-l md:pl-4 md:ml-0 text-gray-500 mr-2 md:mr-0">
  <div className="text-2xl ml-2 font-semibold">
    {properties.property_category === "commercial" ? (
      <>
        {properties.bedrooms > 1 ? `${properties.bedrooms} Working Space Rooms` : `Full Space Office`}
      </>
    ) : (
      <>{properties.bedrooms}BHK {properties.bathrooms} Baths</>
    )}
  </div>
  <div className="text-sm text-gray-400 ml-2 mt-1">
    {`${properties.property_type} for ${properties.listing_type}`}
  </div>
  <div className="text-xs text-gray-400 ml-2 mt-1">
    in {properties.location?.locality}, {properties.location?.society}
  </div>
</div>

  
      <div className='mt-4 md:mt-0'>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 transition" onClick={handleNavigate}>Home</button>
      </div>
    </div>
  
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full bg-white  rounded-xl">
      <div className="w-full lg:w-1/2">
       <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
    <img
        src={currentImage || coverImage || images[0]?.preview}
        alt="Property Preview"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
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
  
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-2xl">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Property Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            {properties.property_category === "commercial" ? <FaBuilding /> : <FaBed />} {properties.bedrooms} {properties.property_category === "commercial" ? "Working Space Rooms" : "Bedrooms"}
          </div>
          <div className="flex items-center gap-2">
            {properties.property_category === "commercial" ? <FaToilet /> : <FaBath />} {properties.bathrooms} {properties.property_category === "commercial" ? "Washrooms" : "Bathrooms"}
          </div>
          <div className="flex items-center gap-2"><MdBalcony /> {properties.balconies} Balconies</div>
          <div className="flex items-center gap-2"><FaRulerCombined /> {properties.carpet_area} {properties.area_unit}</div>
           <div className="flex items-center gap-2">
                          <CiStopwatch />
            <span className="">
              {properties.possessiondate ? `Possession in ${properties.possessiondate}` : "Ready to Move"}
            </span>
          </div>
          <div className="flex items-center gap-2"><FaHome /> {properties.property_type}</div>
          <div className="flex items-center gap-2"><IoLocationSharp /> {properties.location?.locality}, {properties.location?.society}</div>
          <div className="flex items-center gap-2"><FaCompass /> Facing: {properties.facing || "Not Specified"}</div>
          <div className="flex items-center gap-2">
      {(properties.property_type === "Flat/Apartment" || properties.property_type === "Office Space") && (
        <>
          <FaStairs />
          Floor : {properties.selected_floor}
          <sup className="ml-[-7px]">
            {properties.selectedFloor === 1
              ? "st"
              : properties.selectedFloor === 2
              ? "nd"
              : properties.selectedFloor === 3
              ? "rd"
              : "th"}
          </sup>{" "}
          of {properties.total_floors}
        </>
      )}
        
    </div>
          {/* <div className="flex items-center gap-2"><FaDoorOpen /> Facing: {properties.house_status || "Not Specified"}</div> */}
        </div>
  
        <h3 className="mt-6 text-lg font-semibold text-blue-500">Summary</h3>
        <p className="text-sm text-gray-500 mt-2">{properties.summary || 'No summary provided'}</p>
      </div>
    </div>
  
    <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
  <h2 className="text-xl font-bold text-blue-500 mb-4">Additional Details</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Furnishing + Details of Furnishing */}
    <div>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">Furnishing</h3>
      <div className="text-gray-500 flex items-center gap-2 mb-4">
        <FaCouch /> {properties.furnishing || "Not furnished"}
      </div>

      {properties.selected_amenities?.length>0&& (
  <h3 className="text-lg font-semibold text-gray-600 mb-2">Details Of Furnishing</h3>
)}
      <div className="grid grid-cols-2 gap-2">
        {properties.selected_amenities?.length > 0 ? (
          properties.selected_amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-500">
              <FaCheckCircle className="text-blue-500" /> <span className='truncate'>{amenity}</span>
            </div>
          ))
        ) : (
         <></>
        )}
      </div>
    </div>

    {/* Additional Rooms with Parking Info */}
    <div>
    {properties.selected_rooms?.length>0&& (
  <h3 className="text-lg font-semibold text-gray-600 mb-2">Addiotional Rooms</h3>
)}
      <div className="grid grid-cols-2 gap-2">
        {properties.selected_rooms?.length > 0 ? (
          properties.selected_rooms.map((room, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-500">
              <FaDoorOpen /> {room}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

     
      <div className="mt-4">
      {(properties.covered_parking > 0 || properties.open_parking > 0) && (
  <h2 className="text-lg font-semibold mb-4">Parking Info</h2>
)}
        <div className="space-y-2">
          {properties.open_parking > 0 ? (
            <div className="flex items-center space-x-2">
              <FaParking className="text-gray-500" size={20} />
              <span className=' text-gray-500'>Open Parking: {properties.open_parking}</span>
            </div>
          ) : (
            <></>
          )}

          {properties.covered_parking > 0 ? (
            <div className="flex items-center space-x-2">
              <FaCar className="text-gray-500" size={20} />
              <span className='text-gray-500'>Covered Parking: {properties.covered_parking}</span>
            </div>
          ) : (
           <></>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
  
   );
};

export default Viewdetails;





