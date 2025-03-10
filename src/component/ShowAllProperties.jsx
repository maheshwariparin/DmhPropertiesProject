import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate,Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Loader from "./Loader";

function ShowAllProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
   
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('dmhproperties')
            .select('*');

        if (error) {
            console.error('Error fetching properties:', error.message);
        } else {
            const propertiesWithImages = await Promise.all(
                data.map(async (property) => {
                    const imageUrl = await getFirstImageUrl(property.id);
                    return { ...property, imageUrl };
                })
            );
            setProperties(propertiesWithImages);
        }
        setLoading(false);
    };
    const handleDelete = async (propertyId) => {
      // Show confirmation dialog
      const confirmed = window.confirm("Are you sure you want to delete this property?");
      if (!confirmed) return;
    
      const { error } = await supabase
        .from('dmhproperties')
        .delete()
        .eq('id', propertyId);
    
      if (error) {
        console.error('Error deleting property:', error.message);
      } else {
        setProperties(properties.filter((property) => property.id !== propertyId));
        console.log('Property deleted successfully!');
      }
    };
    

    const formatPrice = (price) => {
        if (price >= 10000000) {
            return (price / 10000000).toFixed(1) + ' Cr';
        } else if (price >= 100000) {
            return (price / 100000).toFixed(0) + ' Lakh';
        }
        return price?.toLocaleString();
    };

    const calculatePricePerSqFt = (expectedPrice, carpetArea) => {
        return expectedPrice && carpetArea ? (expectedPrice / carpetArea).toFixed(2) : null;
    };

    const getFirstImageUrl = async (propertyId) => {
        const { data, error } = await supabase.storage
            .from('property-images')
            .list(`${propertyId}/images`, { limit: 1, sortBy: { column: 'name', order: 'asc' } });

        if (error) {
            console.error('Error fetching image:', error.message);
            return null;
        }

        if (data && data.length > 0) {
            const filePath = `${propertyId}/images/${data[0].name}`;
            const { data: urlData } = supabase.storage
                .from('property-images')
                .getPublicUrl(filePath);
            return urlData.publicUrl;
        }
        return null;
    };

    const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  

  useEffect(() => {
    if (!sessionStorage.getItem("isLoggedIn")) {
      navigate("/login");
    } else {
      setTimeout(() => setLoading(false), 2000);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-100">
        <Loader />
      </div>
    );
  }

const filteredProperties = properties.filter((property) =>
          property.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location?.locality?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location?.society?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
        <div className="space-y-6 bg-blue-50 h-full">
          
          <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="text-2xl font-bold">DMH Properties</div>
        <div className="flex gap-4">
         
        <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by city, locality, or society..."
                    className="p-2 w-full border border-blue-300 rounded-lg shadow"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

          <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow">
            Logout
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow" 
            onClick={()=>{navigate("/dmhpropertiesformsubmitonlyforadmin")}}
          >
            Add Property
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow"
          onClick={()=>{navigate("/")}}
          >
            Home
          </button>
        </div>
      </nav>

      <div className="flex">
        <div
          className={`$ {
            sidebarOpen ? "w-80" : "w-16"
          } h-auto border-r border-blue-300 transition-all duration-300 ${
            sidebarOpen ? 'bg-blue-200' : 'bg-blue-50 border-none'
          } shadow-lg`}
        >
          <button
            className="p-4 text-blue-700 hover:text-blue-900"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {sidebarOpen && (
            <ul className="mt-4 flex flex-col space-y-2 p-4">
              <Link to="/admin" className="hover:bg-blue-300 p-2 rounded cursor-pointer">Admin</Link>
              <Link to="/maincorosole" className="hover:bg-blue-300 p-2 rounded cursor-pointer">Set Corosole</Link>
            </ul>
          )}
        </div>
          

        <div className="h-auto ml-[15px] w-[1350px] bg-blue-50">
        {filteredProperties.length === 0 ? (
                <p className="text-center text-blue-700">No properties found.</p>
            ) : ( 
                filteredProperties.map((property, index) => (
                  <div key={property.id || index} className="flex w-full mt-2 border h-auto border-blue-200 rounded-2xl shadow-lg bg-white overflow-hidden">
                                           {property.imageUrl ? (
                                              <img 
                                                  src={property.imageUrl} 
                                                  alt="Property banner" 
                                                  className="w-1/3 mt-5 ml-3 h-64 object-cover rounded-2xl"
                                              />
                                          ) : (
                                              <div className="w-1/3 h-64 bg-gray-300 flex items-center justify-center rounded-l-2xl">
                                                  <span className="text-gray-500">No Image Available</span>
                                              </div>
                                          )}
                                          <div className="w-2/3 p-3">
                                              <div className='flex justify-between items-center mb-2'>
                                                  <h2 className="text-2xl font-bold text-black">{property.location?.society}</h2>
                                                  <div>
                                                      <button 
                                                          className="px-3 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-full mr-2 hover:bg-red-200"
                                                          onClick={() => handleDelete(property.id)}
                                                      >
                                                          Delete
                                                      </button>
                                                      <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">{property.listing_type}</span>
                                                  </div>
                                              </div>
                                              <div className='flex'>
                                                  <h3 className="text-lg text-black">{property.location?.city}, {property.location?.locality}</h3>
                                                  <h2 className="text-lg text-black ml-20">{property.property_category} - {property.property_type}</h2>
                                              </div>
                                              <p className="text-gray-500 mb-2">Property ID: {property.id}</p>
                                              {property.property_category === 'residential' && property.property_type === 'Flat/Apartment' && (
                                                  <p className="text-lg text-black">{property.bedrooms} BHK - {property.bathrooms} Baths</p>
                                              )}
                                              <div className="flex items-center mt-4">
                                                  <div className="text-black">
                                                      {/* <p className="text-xl font-bold">₹{formatPrice(property.expected_price)}</p>
                                                      <p className="text-md text-gray-500">₹{calculatePricePerSqFt(property.expected_price, property.carpet_area)}/sqft</p> */}
                                                       <p className="text-xl font-bold">
                                                      ₹{property.rent_price ? formatPrice(property.rent_price) + " / month" : formatPrice(property.expected_price)}
                                                      </p>
                                                     <p className="text-md text-gray-500">
                                                     {property.rent_price ? "" : "₹"+calculatePricePerSqFt(property.expected_price, property.carpet_area) + "/sqft"}
                                                    </p>
                                                  </div>
                                                  <div className="h-[45px] w-[2px] bg-gray-500 mx-12"></div>
                                                  <div>
                                                      <p className="text-black font-bold">{property.carpet_area} {property.area_unit}</p>
                                                  </div>
                                              </div>
                                              <p className="mt-4 text-sm text-gray-600">{property.summary}</p>
                                          </div>
                                      </div>
                ))
            )}
          
        </div>
      </div>
        </div>
    );
}

export default ShowAllProperties;
