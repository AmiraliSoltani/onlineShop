import React from 'react';
import "../../../css/mobile-box.css"
import Slider from 'react-slick';

const MobileBox = () => {
    const settings2 = {
        ltr: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        //slidesToShow: 4,
        variableWidth: true, // Allow slides to adjust to their content width
    
      };

  return(
    <div className="mobile_box ">
        <div className="sort">
        <img src={require("./../../../assets/icons/sort.png")} alt="sort" />

<span>Sort</span>

        </div>

        <div className="filter">
            <img src={require("./../../../assets/icons/filter-mobile-2.png")} alt="sort" />
            <span>Filter</span>

        </div>
        <div className="all">
        <Slider {...settings2}>
           <div className='one-filter'>
            <span>Categories</span>
           </div> 
           <div className='one-filter'> <span>only Discounted </span></div> 
           <div className='one-filter'>  <span>Price Range</span></div> 
           <div className='one-filter'>  <span>Color</span></div> 
           <div className='one-filter'>  <span>Size</span></div> 
           <div className='one-filter'>  <span>Brand</span></div> 



                                  </Slider>
                                  </div>

</div>
  )
};

export default MobileBox;
