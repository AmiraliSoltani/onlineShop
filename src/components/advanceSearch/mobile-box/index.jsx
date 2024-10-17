import React, { useState } from 'react';
import "../../../css/mobile-box.css"
import Slider from 'react-slick';

const MobileBox = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtFirstSlide, setIsAtFirstSlide] = useState(true);

  const settings2 = {
    ltr: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true, 
    onSwipe: () => handleSlideScroll(),  // Detect user swipe
    afterChange: (index) => handleSlideChange(index), // Detect slide index
  };

  const handleSlideScroll = () => {
    setIsScrolling(true); // Set scrolling state to true when user swipes
  };

  const handleSlideChange = (index) => {
    if (index === 0) {
      setIsAtFirstSlide(true);  // User is at the first slide
      setIsScrolling(false);    // Stop the shrinking when at first slide
    } else {
      setIsAtFirstSlide(false); // User is no longer at the first slide
    }
  };

  return (
    <div className={`mobile_box ${isScrolling && !isAtFirstSlide ? 'is-scrolling' : ''}`}> 
      <div className="sort">
        <img src={require("./../../../assets/icons/sort.png")} alt="sort" />
        <span>Sort</span>
      </div>

      <div className="filter">
        <img src={require("./../../../assets/icons/filter-mobile-2.png")} alt="filter" />
        <span>Filter</span>
      </div>

      <div className="slider-container">
        <Slider {...settings2}>
          <div className='one-filter'>
            <span><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Categories</span>
          </div>
          <div className='one-filter'>
            <span>only Discounted</span>
          </div>
          <div className='one-filter'>
            <span><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Price Range</span>
          </div>
          <div className='one-filter'>
            <span><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Color</span>
          </div>
          <div className='one-filter'>
            <span><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Size</span>
          </div>
          <div className='one-filter'>
            <span><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Brand</span>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default MobileBox;
