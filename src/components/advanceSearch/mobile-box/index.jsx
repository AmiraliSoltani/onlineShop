import React from 'react';
import "../../../css/mobile-box.css"

const MobileBox = () => {
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
</div>
  )
};

export default MobileBox;
