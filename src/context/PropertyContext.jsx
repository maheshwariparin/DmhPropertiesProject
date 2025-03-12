import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";
const PropertyContext = createContext();

// Context Provider component
export const PropertyProvider = ({ children }) => {
  
  const [listingType, setListingType] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState({
    city: "",
    locality: "",
    society: "",
    houseNo: "",
  });
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [balconies, setBalconies] = useState(0);
  const [carpetArea, setCarpetArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("sq.ft");
  const [totalFloors, setTotalFloors] = useState("0");
  const [selectedFloor, setSelectedFloor] = useState("0");
  const [selectedAge, setSelectedAge] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [pricePerSqft, setPricePerSqft] = useState("");
  const [summary, setSummary] = useState("");
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [furnishing, setFurnishing] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [coveredParking, setCoveredParking] = useState(0);
  const [openParking, setOpenParking] = useState(0);
  const [facing, setFacing] = useState("");
  const [houseStatus,SethouseStatus]=useState("")
  const [possessionDate, setPossessionDate] = useState("");
  // Static Data
  const roomOptions = ["Pooja Room", "Servant Room", "Study Room", "Store Room"];
  const amenitiesList = [
    "Light", "Fans", "AC", "TV", "Beds", "Wardrobe", "Geyser", "Sofa",
    "WashingMachine", "Fridge", "Microwave", "Stove", "WaterPurifier",
    "ModularKitchen", "DiningTable", "Chimney", "Curtains", "ExhaustFan"
  ];
  const facingOptions = [
    "North", "South", "East", "West",
    "North-East", "North-West", "South-East", "South-West"
  ];

  const HouseStatus = [
    "Ready To Move", "Under Construction",
  ];


  const ageOptions = ["0-1 years", "1-3 years", "3-10 years", "10+ years"];

  // Functions
  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const generateFloorOptions = () => {
    if (totalFloors === "") return ["Enter total floors first"];
    if (totalFloors === "0") return ["Basement", "Ground"];
    let floors = ["Basement", "Ground"];
    for (let i = 1; i <= Number(totalFloors); i++) {
      floors.push(i);
    }
    return floors;
  };

  const handleAutoGenerate = () => {
    let autoSummary = "";
    console.log(propertyCategory, propertyType);

    if (propertyCategory === "commercial") {
        if (propertyType === "Commercial Land") {
            autoSummary = `This commercial land is located in ${location.society || "N/A"}, ${location.locality || "N/A"}, ${location.city || "N/A"}.

            The land spans a total area of ${carpetArea || "N/A"} sq.ft, making it suitable for various development opportunities.

            It’s an excellent choice for investors or developers looking to build in a thriving location.`;
        } else if (propertyType === "Office Space" || propertyType === "Shop" || propertyType === "Warehouse" || propertyType === "Other") {
            autoSummary = `This ${propertyType} is located in ${location.locality || "N/A"}, ${location.city || "N/A"}.

            The property offers a super built up area of ${carpetArea || "N/A"} sq.ft, featuring ${bedrooms || "N/A"} work space rooms  and ${bathrooms || "N/A"} washrooms.

            It is spread across ${totalFloors || "N/A"} floors, with this unit on the ${selectedFloor || "N/A"} floor.

            The property is ${selectedAge || "N/A"} years old and ready to move in, making it ideal for offices, shops, or commercial setups.`;
        }
    } else if (propertyCategory === "residential") {
        if (propertyType === "Plot / Land") {
            autoSummary = `This land is located in ${location.society || "N/A"}, ${location.locality || "N/A"}, ${location.city || "N/A"}.

            The land spans a total area of ${carpetArea || "N/A"} sq.ft, making it suitable for various development opportunities.

            It’s an excellent choice for investors or developers looking to build in a thriving location.`;
        } else {
            autoSummary = `This ${bedrooms || "N/A"} BHK ${propertyType} is located in ${location.society || "N/A"}, ${location.locality || "N/A"}, ${location.city || "N/A"}.

            The flat occupies a super built up area of ${carpetArea || "N/A"} sq.ft. That consists of ${bedrooms || "N/A"} bedrooms, ${bathrooms || "N/A"} bathrooms, and ${balconies || "N/A"} balconies.

            The flat has a total of ${totalFloors || "N/A"} floors, and this property is situated on the ${selectedFloor || "N/A"} floor.

            This is a ready-to-move project, and the property is ${selectedAge || "N/A"} years old.`;
        }
    }

    setSummary(autoSummary);
};


  const handleSetCover = (imagePreview) => {
    setCoverImage(imagePreview);
  
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      const index = updatedImages.findIndex((img) => img.preview === imagePreview);
  
      if (index !== -1 && index !== 0) {
        [updatedImages[0], updatedImages[index]] = [updatedImages[index], updatedImages[0]];
      }
  
      return updatedImages;
    });
  };
  
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter((file) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );
  
    const newImages = validFiles
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      .filter((img) => img.preview !== coverImage); // Exclude cover image
  
    const totalImages = newImages.length + images.filter(img => img.preview !== coverImage).length;
  
    if (totalImages > 15) {
      alert("You can upload a maximum of 15 images.");
      return;
    }
  
    if (totalImages < 3) {
      alert("You must upload at least 3 images.");
      return;
    }
    setImages((prevImages) => [
      ...prevImages.filter((img) => img.preview !== coverImage), // Remove existing cover image from the array
      ...newImages,
    ]);
  };
  


  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (coverImage === images[index].preview) {
      setCoverImage(null);
    }
  };

 

  
  const handleRoomSelection = (room) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };


  const uploadImages = async (propertyId, images) => {
    const imageUrls = [];
  
    for (const image of images) {
      const filePath = `${propertyId}/images/${Date.now()}-${image.name}`;
  
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(filePath, image, {
          cacheControl: '3600',
          upsert: false,
        });
      if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
  
      const { data: urlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);
      
      if (urlData && urlData.publicUrl) {
        imageUrls.push(urlData.publicUrl);
      } else {
        throw new Error("Failed to get public URL for uploaded image");
      }
    }
  
    return imageUrls;
  };
  
  const saveProperty = async (propertyData, images, coverImage) => {
    try {
      const propertyId = crypto.randomUUID();
      const imageUrls = await uploadImages(propertyId, images.map((img) => img.file));
      const { data, error } = await supabase
        .from('dmhproperties')
        .insert([
          {
            id: propertyId,
            listing_type: propertyData.listingType,
            property_category: propertyData.propertyCategory,
            property_type: propertyData.propertyType,
            bedrooms: propertyData.bedrooms,
            bathrooms: propertyData.bathrooms,
            balconies: propertyData.balconies,
            carpet_area: propertyData.carpetArea,
            area_unit: propertyData.areaUnit,
            expected_price: propertyData.expectedPrice,
            price_per_sqft: propertyData.pricePerSqft,
            rent_price: propertyData.rentPrice || "",
            facing: propertyData.facing,
            furnishing: propertyData.furnishing,
            covered_parking: propertyData.coveredParking,
            open_parking: propertyData.openParking,
            selected_age: propertyData.selectedAge,
            selected_floor: propertyData.selectedFloor,
            total_floors: propertyData.totalFloors,
            summary: propertyData.summary,
            images: imageUrls || [],
            selected_amenities: propertyData.selectedAmenities,
            selected_rooms: propertyData.selectedRooms,
            location: {
              house_no: propertyData.location.houseNo,
              locality: propertyData.location.locality,
              society: propertyData.location.society,
              city: propertyData.location.city,
            },
            house_status:propertyData.houseStatus,
            possessiondate:possessionDate,
          },
        ]);
  
        if (error && (!data || data.length === 0)) {
          throw new Error(`Failed to save property data: ${error.message}`);
        }
    
        console.log("Property saved successfully with ID:", propertyId);
        return data;
      } catch (error) {
        console.error("Error saving property:", error.message);
        throw error;
      }
  };
  

  
  
  
// Handle property save
const handleSaveProperty = async () => {
  const propertyData = {
    listingType,
    propertyCategory,
    propertyType,
    location,
    bedrooms,
    bathrooms,
    balconies,
    carpetArea,
    areaUnit,
    totalFloors,
    selectedFloor,
    selectedAge,
    expectedPrice,
    rentPrice,
    pricePerSqft,
    summary,
    furnishing,
    selectedRooms,
    selectedAmenities,
    coveredParking,
    openParking,
    facing,
    houseStatus,
    possessionDate
  };

  try {
    console.log(images,"---",coverImage)
    await saveProperty(propertyData, images, coverImage);
  
  } catch (error) {
  console.log(propertyData)
  console.log(images)
    console.error("Error adding property details:", error);
  }
};


  return (
    <PropertyContext.Provider
      value={{
        listingType, setListingType,
        propertyCategory, setPropertyCategory,
        propertyType, setPropertyType,
        location, setLocation, handleChange,
        bedrooms, setBedrooms,
        bathrooms, setBathrooms,
        balconies, setBalconies,
        carpetArea, setCarpetArea,
        areaUnit, setAreaUnit,
        totalFloors, setTotalFloors,
        selectedFloor, setSelectedFloor,
        selectedAge, setSelectedAge,
        expectedPrice, setExpectedPrice,
        rentPrice, setRentPrice,
        pricePerSqft, setPricePerSqft,
        summary, setSummary, handleAutoGenerate,
        images, setImages, coverImage, setCoverImage, handleImageChange, handleRemoveImage, handleSetCover,
        furnishing, setFurnishing,
        selectedRooms, setSelectedRooms, handleRoomSelection,
        selectedAmenities, setSelectedAmenities, handleAmenityToggle,
        coveredParking, setCoveredParking,
        openParking, setOpenParking,
        facing, setFacing,
        roomOptions, amenitiesList, facingOptions, ageOptions,
        generateFloorOptions,
        handleSaveProperty,
        HouseStatus,
        SethouseStatus,
        houseStatus,
        setPossessionDate,
        possessionDate
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// Custom Hook for using Context
export const useProperty = () => {
  return useContext(PropertyContext);
};
      