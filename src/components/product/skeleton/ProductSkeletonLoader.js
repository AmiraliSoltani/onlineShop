import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductSkeletonLoader = () => {
  return (
    <div className="product-skeleton-loader" style={{ maxWidth: '1140px', margin: '0 auto' }}>
      <ContentLoader 
        speed={2}
        width="100%"
        height={1200}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >

        {/* Image gallery loader */}
        <rect x="0" y="0" rx="10" ry="10" width="45%" height="400" />

        {/* Right side content */}
        <rect x="50%" y="0" rx="4" ry="4" width="45%" height="30" />
        <rect x="50%" y="50" rx="4" ry="4" width="30%" height="20" />
        <rect x="50%" y="100" rx="4" ry="4" width="20%" height="20" />
        
        {/* Star ratings */}
        <rect x="50%" y="140" rx="4" ry="4" width="15%" height="20" />
        <rect x="67%" y="140" rx="4" ry="4" width="15%" height="20" />

        {/* Price section */}
        <rect x="50%" y="180" rx="4" ry="4" width="20%" height="30" />
        <rect x="72%" y="180" rx="4" ry="4" width="10%" height="20" />

        {/* Add to cart button */}
        <rect x="50%" y="230" rx="20" ry="20" width="40%" height="50" />

        {/* Additional sections */}
        <rect x="50%" y="300" rx="4" ry="4" width="45%" height="15" />
        <rect x="50%" y="330" rx="4" ry="4" width="45%" height="15" />
        <rect x="50%" y="360" rx="4" ry="4" width="45%" height="15" />

        {/* Share icons */}
        <rect x="50%" y="390" rx="4" ry="4" width="8%" height="40" />
        <rect x="60%" y="390" rx="4" ry="4" width="8%" height="40" />
        <rect x="70%" y="390" rx="4" ry="4" width="8%" height="40" />
        <rect x="80%" y="390" rx="4" ry="4" width="8%" height="40" />

        {/* Related products section */}
        <rect x="0" y="450" rx="10" ry="10" width="100%" height="30" />
        <rect x="0" y="490" rx="10" ry="10" width="24%" height="200" />
        <rect x="26%" y="490" rx="10" ry="10" width="24%" height="200" />
        <rect x="52%" y="490" rx="10" ry="10" width="24%" height="200" />
        <rect x="78%" y="490" rx="10" ry="10" width="24%" height="200" />

        {/* Comments section */}
        <rect x="0" y="720" rx="10" ry="10" width="100%" height="30" />
        <rect x="0" y="760" rx="4" ry="4" width="100%" height="100" />
        <rect x="0" y="870" rx="4" ry="4" width="100%" height="100" />
        <rect x="0" y="980" rx="4" ry="4" width="100%" height="100" />

        {/* Specifications section */}
        <rect x="0" y="1100" rx="10" ry="10" width="100%" height="30" />
        <rect x="0" y="1140" rx="4" ry="4" width="100%" height="100" />
      </ContentLoader>
    </div>
  );
};

export default ProductSkeletonLoader;
