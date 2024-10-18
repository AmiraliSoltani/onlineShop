import React, { useState, useRef, Fragment } from 'react';
import "../../../css/mobile-box.css";
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';

const MobileBox = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtFirstSlide, setIsAtFirstSlide] = useState(true);
  const sliderRef = useRef(null); // Create a ref for the slider
  const totalSlides = 6; // Total number of slides
  const scrollLimit = 1; // Set your desired scroll limit
  const [isMobileFilter, setIsMobileFilter] = useState(false);
  const [isMobileSort, setIsMobileSort] = useState(false);

  const settings2 = {
    ltr: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    onSwipe: () => handleSlideScroll(), // Detect user swipe
    afterChange: (index) => handleSlideChange(index), // Detect slide index
    beforeChange: (current, next) => {
      // Prevent scrolling if the next index exceeds the allowed limit
      if (next >= scrollLimit) {
        // Move back to the last allowed slide if out of bounds
        sliderRef.current.slickGoTo(scrollLimit - 1);
        return false; // Prevent changing to the next slide
      }
    },
  };

  const handleSlideScroll = () => {
    setIsScrolling(true); // Set scrolling state to true when user swipes
  };

  const handleSlideChange = (index) => {
    if (index === 0) {
      setIsAtFirstSlide(true); // User is at the first slide
      setIsScrolling(false); // Stop the shrinking when at first slide
    } else {
      setIsAtFirstSlide(false); // User is no longer at the first slide
    }
  };

  const mobileFilter=()=>{
    setIsMobileFilter(false);

  }
  const openSort=()=>{
    setIsMobileFilter(true);
    setIsMobileSort(true)
  }

  return (
    <Fragment>
                     <div className={`account-menu ${isMobileFilter ? "visible-account" : ""} ` }>
       {isMobileSort && <Fragment>

           <div className="tab-header-container">
             
             <div className="write">
               <div>
                 <div className="header">
             <img src={require("../../../assets/icons/close.png")} alt="" className="close"
              onClick={()=>mobileFilter(false)} />
       
               <h2>Sort</h2> {/* Title */}
             </div>
             <div className="footer-button">      
                   <Button className="button-submit" variant="primary"  >
See the products                   </Button>
                   <Button className="button-reset" variant="primary" >
                     Reset
                   </Button>
                   </div> 
               </div>
             
           </div>
           
           </div>
 </Fragment>}

           </div>
      



    <div className={`mobile_box ${isScrolling && !isAtFirstSlide ? 'is-scrolling' : ''}`}> 
      <div className="sort bg-orange " onClick={openSort}>
        <img src={require("./../../../assets/icons/sort.png")} alt="sort" />
        <span>Sort</span>
      </div>

      <div className="filter bg-orange">
        <img src={require("./../../../assets/icons/filter-mobile-2.png")} alt="filter" />
        <span>Filter</span>
      </div>

      <div className="slider-container">
        <Slider ref={sliderRef} {...settings2}>
          <div className='one-filter'>
            <span className='bg-orange'><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Categories</span>
          </div>
          <div className='one-filter'>
            <span className='bg-orange' >   Only Discounted</span>
          </div>
          <div className='one-filter'>
            <span className='bg-orange'><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Price Range</span>
          </div>
          <div className='one-filter'>
            <span className='bg-orange'><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Color</span>
          </div>
          <div className='one-filter'>
            <span className='bg-orange'><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Size</span>
          </div>
          <div className='one-filter'>
            <span className='bg-orange'><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Brand</span>
          </div>
        </Slider>
      </div>
    </div>
    </Fragment>
  );
};

export default MobileBox;

