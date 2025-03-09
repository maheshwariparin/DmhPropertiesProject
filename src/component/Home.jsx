import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { supabase } from '../supabaseClient';
import logo from "../assets/dmhlogo.svg";
import { CiLocationOn } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
export default function Home() {

    const [images, setImages] = useState([]);
    const [propertyDetails, setPropertyDetails] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate=useNavigate()
    const phoneNumber = "9925001226";

    const handleWhatsAppMessage = (property) => {
        const message = `Hello, I'm interested in the property at ${property.location?.society || "Unnamed Property"}, ${property.location?.city}, ${property.location?.locality}. 
        It is a ${property.property_category}, ${property.property_type} with ${property.bedrooms || 0} BHK and ${property.bathrooms || 0} Baths.
        Price: ₹${property.rent_price ? formatPrice(property.rent_price) + " / month" : formatPrice(property.expected_price)}
        Area: ${property.carpet_area} ${property.area_unit}.
        
        Can you please provide me with more details?`;
      
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
      };
   

    const fetchCarouselData = async () => {
        try {
            const { data, error } = await supabase
                .from('dmhpropertiescorosole')
                .select('code');

            if (error) {
                console.error('Error fetching carousel data:', error.message);
                return;
            }

            const ids = data.map(item => item.code);

            const imageUrls = await Promise.all(
                ids.map(async (id) => {
                    if (!id) return null;
                    const { data, error } = await supabase.storage
                        .from('property-images')
                        .list(`${id}/images`, { limit: 1, sortBy: { column: 'name', order: 'asc' } });

                    if (error || !data || data.length === 0) return null;

                    const filePath = `${id}/images/${data[0].name}`;
                    const { data: urlData } = supabase.storage
                        .from('property-images')
                        .getPublicUrl(filePath);

                    return { id, url: urlData.publicUrl };
                })
            );

            setImages(imageUrls.filter(Boolean));

            const { data: propertyData } = await supabase
                .from('dmhproperties')
                .select('*')
                .in('id', ids);

            setPropertyDetails(propertyData || []);
        } catch (error) {
            console.error('Unexpected error fetching carousel data:', error.message);
        }
    };

    useEffect(() => {
        fetchCarouselData();
    }, []);

   

    const capitalizeFirstLetter = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

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

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
  

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
            const uniqueLocalities = [...new Set(data.map(p => p.location?.locality))].filter(Boolean);
            setLocalities(uniqueLocalities);
        }
        setLoading(false);
    };

    const getFirstImageUrl = async (propertyId) => {
        const { data, error } = await supabase.storage
            .from('property-images')
            .list(`${propertyId}/images`, { limit: 1, sortBy: { column: 'name', order: 'asc' } });

          

        if (error) return null;
        if (data && data.length > 0) {
            const filePath = `${propertyId}/images/${data[0].name}`;
            const { data: urlData } = supabase.storage.from('property-images').getPublicUrl(filePath);
            return urlData.publicUrl;
        }
        return null;
    };

    const generateSlug = (property) => {
        return `${property.bedrooms}-bhk-${property.location.society}-${property.location.locality}-${property.location.city}`
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")  
            .replace(/\s+/g, "-")     
            .replace(/-+/g, "-");      
    };
    

    const handleViewDetails = async (id) => {
        const { data, error } = await supabase
            .from('dmhproperties')
            .select('*')
            .eq('id', id)
            .single();
    
        if (error) {
            console.error('Error fetching properties:', error.message);
        } else {
            setProperties(data);
    
            const slug = generateSlug(data);
            navigate(`/property/${data.id}/${slug}`);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [localities, setLocalities] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState('');
    const [rentRange, setRentRange] = useState([0, 100000000]);
    const [sellRange, setSellRange] = useState([0, 1000000000]);
    const [propertyCategory, setPropertyCategory] = useState('');
    
    const filteredProperties = properties.filter((property) => {
        const localityMatch = selectedLocality ? property.location?.locality === selectedLocality : true;
        const rentMatch = property.rent_price ? (property.rent_price >= rentRange[0] && property.rent_price <= rentRange[1]) : true;
        const sellMatch = property.expected_price ? (property.expected_price >= sellRange[0] && property.expected_price <= sellRange[1]) : true;
        const categoryMatch = propertyCategory ? property.property_category === propertyCategory : true;
        const searchMatch = searchQuery ? (
            property.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location?.locality?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location?.society?.toLowerCase().includes(searchQuery.toLowerCase())
        ) : true;
    
        return localityMatch && rentMatch && sellMatch && categoryMatch && searchMatch;
    });


    return (
        <div className="min-h-screen border-1 pt-20 border-gray-100 bg-[#F3F4F6]">
        <div className="fixed top-0 left-0 w-full z-50 flex items-center p-2 border-b border-gray-300 shadow-sm bg-white md:justify-between">
          <img src={logo} alt="Logo" className="h-16 w-auto object-contain ml-3" />
          <div className="flex">
            <h1 className="text-xl text-blue-500 font-bold">DMH</h1>
            <h1 className="text-xl text-gray-500 font-bold">Properties</h1>
          </div>
          <div className="hidden md:flex space-x-2 ml-[550px]">
            <button
              className="px-4 py-2 rounded-lg font-semibold text-blue-600 bg-blue-100 border-b-2 border-blue-600"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="px-4 py-2 rounded-lg font-semibold text-blue-600 bg-white hover:bg-blue-50 transition shadow"
              onClick={() => navigate("/sellproperty")}
            >
              Sell
            </button>
            <button
              className="px-4 py-2 rounded-lg font-semibold text-blue-600 bg-white hover:bg-blue-50 transition shadow"
              onClick={() => navigate("/rent_leaseproperty")}
            >
              Rent/Lease
            </button>
            <button
              className="px-4 py-2 rounded-lg font-semibold text-blue-600 bg-white hover:bg-blue-50 transition shadow"
              onClick={() => navigate("/pg")}
            >
              PG
            </button>
          </div>
          <div className="hidden md:flex text-lg bg-white rounded-lg ml-4 hover:bg-gray-200 p-2 font-bold text-blue-500">
            <FaPhoneAlt className="mr-2 mt-2" /> +91 99250-01226
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FaBars className="text-2xl ml-22 text-blue-500" />
            </button>
          </div>
        </div>
      
        {isMenuOpen && (
          <div className="fixed top-[68px] left-0 w-full md:hidden flex flex-col items-start p-4 space-y-2 bg-gray-100 z-40">
            <button
              className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow w-full"
              onClick={() => navigate("/sellproperty")}
            >
              Sell
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow w-full"
              onClick={() => navigate("/rent_leaseproperty")}
            >
              Rent/Lease
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow w-full"
              onClick={() => navigate("/pg")}
            >
              PG
            </button>
          </div>
        )}
      
        <div className="fixed bottom-4 right-4 md:hidden">
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center justify-center text-lg bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600"
          >
            <FaPhoneAlt />
          </a>
        </div>
            
            <div
    className="w-full h-auto border-gray-100 flex  mt-2 justify-center relative md:h-[450px] md:bg-cover md:bg-center">
    {images.length > 0 ? (
        <Carousel
            autoPlay
            infiniteLoop
            interval={1500}
            showThumbs={false}
            showIndicators={true}
            showStatus={false}
            className="w-[80%] h-[150px] sm:h-[300px]   max-w-screen-xl shadow-2xl"
        >
            {images.map((image, index) => {
                const property = propertyDetails.find(p => p.id === image.id);
                return (
                    <div key={index} className="relative">
    <img
    src={image.url}
    alt="crosole image property ahmedabad south bopal shela jodhpur satellite anandnagar" 
    className="w-full h-full aspect-[16/9] md:aspect-[22/9] object-cover  opacity-90"
/>

                        {property && (
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-800 to-transparent p-3 flex items-center">
                          <CiLocationOn className="h-6 w-6 text-white" />
                          <div className="ml-2">
                            <h1 className="text-lg font-bold text-white truncate">
                              {property.location?.society || "Unknown Society"}
                            </h1>
                            <h1 className="text-base text-gray-200 truncate">
                              {property.location?.locality || "Unknown Locality"}
                            </h1>
                          </div>
                        </div>
                        )}
                    </div>
                );
            })}
        </Carousel>
    ) : (
        <p className="text-gray-600 text-lg">No images found. Add valid property IDs!</p>
    )}
</div>
          <div>
          <div className="space-y-6 mt-7     h-full">
          <div className="p-4">
          <div className="flex flex-wrap items-center gap-4 justify-evenly">
  <div className="flex flex-col">
    <label className="mb-2 text-blue-500 font-semibold">Search by Locality</label>
    <input
      type="text"
      placeholder="Enter locality..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-1 border bg-white border-gray-300 w-[200px] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-500 placeholder:italic"
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-2 text-blue-500 font-semibold">Select Locality</label>
    <select
      value={selectedLocality}
      onChange={(e) => setSelectedLocality(e.target.value)}
      className="p-1 border border-gray-300 w-[200px] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <option value="">All Localities</option>
      {localities.map((loc, index) => (
        <option key={index} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col">
    <label className="mb-2 text-blue-500 font-semibold">Property Category</label>
    <select
      value={propertyCategory}
      onChange={(e) => setPropertyCategory(e.target.value)}
      className="p-1 border border-gray-300 w-[200px] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <option value="">All Categories</option>
      <option value="residential">Residential</option>
      <option value="commercial">Commercial</option>
    </select>
  </div>

  <div className="flex flex-col">
    <label className="text-blue-800 font-semibold">
      Sell Price Range: ₹{sellRange[0]} - ₹{sellRange[1]}
    </label>
    <input 
      type="range" 
      min="0" 
      max="1000000000" 
      value={sellRange[1]} 
      onChange={(e) => setSellRange([0, parseInt(e.target.value)])} 
      className="mt-2 w-[260px]"
    />
  </div>

  <div className="flex flex-col">
    <label className="text-blue-800 font-semibold">
      Rent Price Range: ₹{rentRange[0]} - ₹{rentRange[1]}
    </label>
    <input 
      type="range" 
      min="0" 
      max="100000000" 
      value={rentRange[1]} 
      onChange={(e) => setRentRange([0, parseInt(e.target.value)])} 
      className="mt-2 w-[260px]"
    />
  </div>
</div>



            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] mx-auto">
    {filteredProperties.length === 0 ? (
        <p>No properties found.</p>
    ) : (
        filteredProperties.map((property, index) => (
            <div 
                key={property.id || index} 
                className="flex flex-col w-full border border-blue-200 rounded-2xl shadow-lg bg-white overflow-hidden"
            >
                {property.imageUrl ? (
                    <img 
                        src={property.imageUrl} 
                        alt={`${property.location.society} in ${property.location.locality}, ${property.location.city}`} 
                        className="w-full h-64 object-cover rounded-t-2xl"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-2xl">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}

                <div className="p-3">
                <div className="flex flex-col mb-2">
    <div className="mb-4">
        <h2 className="text-xl font-bold text-blue-500 truncate">
            {property.location?.society || "Unnamed Property"}
        </h2>
    </div>
    <div className="flex items-center space-x-2">
        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            {property.listing_type}
        </span>
        <button 
            className="px-3 py-1 text-sm font-medium bg-blue-100 text-green-800 rounded-full truncate"
            onClick={() => handleViewDetails(property.id)}
        >
            View Details
        </button>
        <button 
            onClick={() => handleWhatsAppMessage(property)}
            className="text-green-500 text-2xl p-1 bg-green-100 rounded-full hover:bg-green-200 shadow-lg"
        >
            <FaWhatsapp />
        </button>
    </div>
</div>

                    <div className="flex flex-col md:flex-row">
                        <h3 className="text-md text-black">
                            {capitalizeFirstLetter(property.location?.city)}, {capitalizeFirstLetter(property.location?.locality)}
                        </h3>
                        <h2 className="text-md text-black md:ml-20">
                            {capitalizeFirstLetter(property.property_category)}, {capitalizeFirstLetter(property.property_type)}
                        </h2>
                    </div>

                    {property.property_category === 'residential' && property.property_type === 'Flat/Apartment' && (
                        <p className="text-lg text-black font-medium mt-2">{property.bedrooms} BHK {property.bathrooms} Baths</p>
                    )}

                    <div className="flex flex-wrap items-center justify-between mt-4">
                        <div className="text-black">
                            <p className="text-xl font-bold text-blue-500">
                                ₹{property.rent_price ? formatPrice(property.rent_price) + " / month" : formatPrice(property.expected_price)}
                            </p>
                            <p className="text-md text-gray-500">
                                {property.rent_price ? "" : "₹" + calculatePricePerSqFt(property.expected_price, property.carpet_area) + "/sqft"}
                            </p>
                        </div>

                        <div className="h-[35px] w-[1px] bg-gray-400 hidden md:block"></div>

                        <div>
                            <p className="text-black font-bold">
                                {property.carpet_area} {property.area_unit}
                            </p>
                        </div>
                    </div>
                    <p className="hidden md:block mt-4 text-sm text-gray-600 desktop-line-clamp">
  {property.summary}
</p>



                </div>
            </div>
        ))
    )}
</div>

        
        </div>
          </div>

          <div className='w-full bg-blue-100 mt-5'>
    <footer className="bg-gray-700 text-white py-6">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
           
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-blue-500">Contact Us</h3>
                    <div className="space-y-2 text-gray-500 text-sm">
                        <p><strong>Phone:</strong> +91 9925001226</p>
                        <p><strong>Email:</strong> dmproperties@gmail.com</p>
                        <p>
                            <strong>Address:</strong> B-302 Sun South Street,  
                            Near Bopal Firestation,  
                            South Bopal, Ahmedabad
                        </p>
                    </div>
                </div>

               
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-3 text-blue-500">Quick Links</h3>
                    <ul className="text-sm text-gray-500 space-y-2">
                        <li>
                            <Link to="/sellproperty" className="hover:text-blue-700">
                                View Selling Property
                            </Link>
                        </li>
                        <li>
                            <Link to="/rent_leaseproperty" className="hover:text-blue-700">
                                View Rent Property
                            </Link>
                        </li>
                        <li>
                            <Link to="/Pg" className="hover:text-blue-700">
                                View Any Available PG
                            </Link>
                        </li>
                    </ul>

                    <div className="flex justify-center sm:justify-start space-x-4 mt-4">
                        <a 
                            href="https://www.instagram.com/dmhproperties?igsh=YWp5ZDA1ZnZqdWNo" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-pink-500 hover:text-pink-600 text-2xl transition-transform transform hover:scale-110 hover:shadow-lg"
                        >
                            <FaInstagram />
                        </a>
                        <a 
                            href="https://www.facebook.com/dmhproperties?mibextid=ZbWKwL" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:text-blue-600 text-2xl transition-transform transform hover:scale-110 hover:shadow-lg"
                        >
                            <FaFacebook />
                        </a>
                        <a 
                            href="https://maps.app.goo.gl/m4mPE7jMbh9fi7Sz6" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:text-blue-600 text-2xl transition-transform transform hover:scale-110 hover:shadow-lg"
                        >
                             <FaLocationDot className=""/>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 mt-7">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                    </div>
                    <p className="text-sm text-center">Your Dream Home Awaits</p>
                </div>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-3 text-center">
                <p className="text-xs  text-gray-400">
                    Disclaimer: DMH Properties is only an intermediary offering its platform to advertise properties of Seller for a Customer/Buyer/User coming on its Website and is not and cannot be a party to or privy to or control in any manner any transactions between the Seller and the Customer/Buyer/User. All the prices or rates on this Website have been extended by various Builder(s)/Developer(s) who have advertised their products. Company shall neither be responsible nor liable to mediate or resolve any disputes or disagreements between the Customer/Buyer/User and the Seller and both Seller and Customer/Buyer/User shall settle all such disputes without involving Company in any manner.
                </p>
            </div>
        </div>     
    </footer>
</div>
        </div>
    );
}
