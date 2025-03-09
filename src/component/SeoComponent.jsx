import React from 'react';
import { Helmet } from 'react-helmet';
import keywordsData from "../Realestate.json"

const SEOComponent = () => {

  const metaKeywords = keywordsData.keywords.join(", ");

  return (
    <div>

    
    <Helmet>
     
      <title>Best Real Estate Deals in Ahmedabad | Flats, Shops, Offices & More</title>
      <meta 
        name="description" 
        content="Discover top property deals in Ahmedabad. Browse listings for flats, apartments, shops, offices, plots, and villas in prime areas like Shela, Bopal, and more." 
      />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href="https://dmhproperties.in" />

    
      <meta property="og:title" content="Best Real Estate Deals in Ahmedabad" />
      <meta 
        property="og:description" 
        content="Discover top property deals in Ahmedabad. Browse listings for flats, apartments, shops, offices, plots, and villas in prime areas like Shela, Bopal, and more." 
      />
      <meta property="og:url" content="https://dmhproperties.in" />
    
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Best Real Estate Deals in Ahmedabad" />
      <meta 
        name="twitter:description" 
        content="Discover top property deals in Ahmedabad. Browse listings for flats, apartments, shops, offices, plots, and villas in prime areas like Shela, Bopal, and more." 
      />
    </Helmet>
     
    <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(metaKeywords) }}
                        />

    </div>
  );
};

export default SEOComponent;
