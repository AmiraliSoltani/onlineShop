import React from 'react';
import ContentLoader from 'react-content-loader';

const MultiTabsSkeletonLoader = () => {
  return (
    <div className="multi-tabs-skeleton-loader" style={{ maxWidth: '1140px', margin: '0 auto' }}>
      <ContentLoader 
        speed={2}
        width="100%"
        height={500}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* Top offer section */}
        <rect x="20" y="20" rx="5" ry="5" width="215" height="58" />
        <rect x="245" y="20" rx="5" ry="5" width="215" height="58" />
        <rect x="470" y="20" rx="5" ry="5" width="215" height="58" />
        <rect x="695" y="20" rx="5" ry="5" width="215" height="58" />
        <rect x="920" y="20" rx="5" ry="5" width="215" height="58" />

        {/* Middle line */}
        <rect x="20" y="90" rx="2" ry="2" width="98%" height="4" /> 

        {/* Product slider */}
        <rect x="20" y="110" rx="10" ry="10" width="220" height="285" /> 
        <rect x="250" y="110" rx="10" ry="10" width="220" height="285" /> 
        <rect x="480" y="110" rx="10" ry="10" width="220" height="285" /> 
        <rect x="710" y="110" rx="10" ry="10" width="220" height="285" /> 
        <rect x="940" y="110" rx="10" ry="10" width="220" height="285" /> 

        {/* Product names */}
        <rect x="0" y="410" rx="4" ry="4" width="220" height="20" /> 
        <rect x="230" y="410" rx="4" ry="4" width="220" height="20" /> 
        <rect x="460" y="410" rx="4" ry="4" width="220" height="20" /> 
        <rect x="690" y="410" rx="4" ry="4" width="220" height="20" /> 
        <rect x="920" y="410" rx="4" ry="4" width="220" height="20" /> 

        {/* Price and discount section */}
        <rect x="0" y="440" rx="4" ry="4" width="100" height="20" /> 
        <rect x="120" y="440" rx="4" ry="4" width="60" height="20" /> 

        <rect x="230" y="440" rx="4" ry="4" width="100" height="20" /> 
        <rect x="350" y="440" rx="4" ry="4" width="60" height="20" /> 

        <rect x="460" y="440" rx="4" ry="4" width="100" height="20" /> 
        <rect x="580" y="440" rx="4" ry="4" width="60" height="20" /> 

        <rect x="690" y="440" rx="4" ry="4" width="100" height="20" /> 
        <rect x="810" y="440" rx="4" ry="4" width="60" height="20" /> 

        <rect x="920" y="440" rx="4" ry="4" width="100" height="20" /> 
        <rect x="1040" y="440" rx="4" ry="4" width="60" height="20" /> 
      </ContentLoader>
    </div>
  );
};

export default MultiTabsSkeletonLoader;
