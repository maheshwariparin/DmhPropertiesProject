import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { supabase } from '../supabaseClient';

export default function ISDImageCarousel() {
    const [ids, setIds] = useState(Array(5).fill(''));
    const [images, setImages] = useState([]);
    const [isdCodes, setIsdCodes] = useState(Array(5).fill(''));
    const [propertyDetails, setPropertyDetails] = useState([]);

    // Function to fetch image URL from Supabase
    const getFirstAvailableImageUrl = async (propertyId) => {
        try {
            const { data, error } = await supabase.storage
                .from('property-images')
                .list(`${propertyId}/images`, { limit: 2, sortBy: { column: 'name', order: 'asc' } });

            if (error) {
                console.error('Error fetching image:', error.message);
                return null;
            }

            if (data && data.length > 0) {
                // Try first image, fallback to second if available
                const filePath = `${propertyId}/images/${data[0]?.name}`;
                const { data: urlData } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath);

                if (urlData.publicUrl) return urlData.publicUrl;
                
                // Try second image if first fails
                if (data[1]) {
                    const fallbackPath = `${propertyId}/images/${data[1]?.name}`;
                    const { data: fallbackUrl } = supabase.storage
                        .from('property-images')
                        .getPublicUrl(fallbackPath);
                    return fallbackUrl.publicUrl;
                }
            }
            return null;
        } catch (error) {
            console.error('Unexpected error fetching image:', error.message);
            return null;
        }
    };

    // Load images and property details when IDs change
    useEffect(() => {
        const fetchImagesAndDetails = async () => {
            const imageUrls = await Promise.all(ids.map(id => id ? getFirstAvailableImageUrl(id) : null));
            setImages(imageUrls.filter(url => url));

            const { data, error } = await supabase
                .from('dmhproperties')
                .select('*')
                .in('id', ids.filter(id => id));

            if (error) {
                console.error('Error fetching property details:', error.message);
            } else {
                setPropertyDetails(data || []);
            }
        };

        if (ids.some(id => id !== '')) {
            fetchImagesAndDetails();
        }
    }, [ids]);

    // Fetch saved IDs from database
    const fetchSavedIDs = async () => {
        try {
            const { data, error } = await supabase
                .from('dmhpropertiescorosole')
                .select('id, code')
                .order('id', { ascending: true });

            if (error) {
                console.error('Error fetching saved IDs:', error.message);
            } else if (data && data.length > 0) {
                const savedIds = data.map(item => item.code || '');
                setIsdCodes(savedIds);
                setIds(savedIds);
            }
        } catch (error) {
            console.error('Unexpected error fetching saved IDs:', error.message);
        }
    };

    // Handle input changes
    const handleChange = (index, value) => {
        const updatedCodes = [...isdCodes];
        updatedCodes[index] = value;
        setIsdCodes(updatedCodes);
    };

    // Save IDs to database
    // Save IDs to database
const saveISDToDatabase = async () => {
    // Trim spaces from both sides of each code
    const trimmedCodes = isdCodes.map(code => code.trim());

    const payload = trimmedCodes.map((code, index) => ({ id: index, code }));

    try {
        const { error } = await supabase
            .from('dmhpropertiescorosole')
            .upsert(payload, { onConflict: ['id'] });

        if (error) {
            console.error('Error saving to database:', error.message);
        } else {
            alert('Carousel IDs saved successfully!');
            setIds(trimmedCodes); // Update IDs after saving
        }
    } catch (error) {
        console.error('Unexpected error saving to database:', error.message);
    }
};

    // Fetch saved IDs on component mount
    useEffect(() => {
        fetchSavedIDs();
    }, []);

    return (
        <div className="p-6 bg-gray-100 w-full h-auto">
            <h1 className="text-2xl font-bold mb-6">ISD Image Carousel</h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {isdCodes.map((code, index) => (
                    <input
                        key={index}
                        type="text"
                        value={code}
                        onChange={(e) => handleChange(index, e.target.value)}
                        placeholder={`Enter ISD ${index + 1}`}
                        className="p-2 border-2 border-gray-300 rounded"
                    />
                ))}
                <button
                    onClick={saveISDToDatabase}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save Carousel IDs
                </button>
            </div>

            <Carousel 
                autoPlay 
                infiniteLoop 
                interval={2000} 
                showThumbs={true} 
                showIndicators={false} 
                className="w-[600px] h-[350px] ml-50 mt-6 align-middle justify-center"
            >
                {images.length > 0 ? (
                    images.map((url, index) => {
                        const property = propertyDetails.find(p => p.id === ids[index]);
                        return (
                            <div 
                                key={index} 
                                className="relative p-6 bg-white h-full w-full rounded shadow"
                            >
                                <img 
                                    src={url} 
                                    alt={`Image ${index + 1}`} 
                                    className="rounded object-cover w-full h-full"
                                />
                                {property && (
                                    <div className="absolute bottom-0 left-0 w-full bg-opacity-60 text-white p-3">
                                        <h1 className="text-lg text-blue-700 font-bold">
                                            {property.location?.society || 'Unknown Society'}
                                        </h1>
                                        <h6 className="text-sm text-blue-600">
                                            {property.location?.locality || 'Unknown Locality'}
                                        </h6>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No images found. Add valid property IDs!</p>
                )}
            </Carousel>
        </div>
    );
}
