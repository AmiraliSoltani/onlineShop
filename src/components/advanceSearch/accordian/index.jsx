import React, { useEffect, useState } from "react";
import "./../../../css/customAccordian.css";

const CustomAccordion = ({ colors , handelColorClick , listOfColors}) => {
  console.log("listOfColors",listOfColors,"colors",colors)
  const [isOpen, setIsOpen] = useState(true);
  const[showColorReset,setShowColorReset]=useState(false)

  const toggleAccordion = () => setIsOpen(!isOpen);


  useEffect(() => {
    setShowColorReset(false)
    if(Object.keys(listOfColors).length === 0) setShowColorReset(false)
    else{
      Object.values(listOfColors).forEach((value) => {
        if(value)  setShowColorReset(true)
      });
  }
  }, [listOfColors]);

  const getClassnameOfColor = (name) => {
    console.log("listOfColors22",listOfColors)
    let className = "check__box__image";
    if (listOfColors[name] !== undefined) {
      if (listOfColors[name] === true) {
        className += " visible";
      }
    }
    return className;
  };



  return (
    <div className="accordion__container">
      <div className="filter__title" >
        <img
        onClick={toggleAccordion}
          className={`title__icon ${isOpen ? "open__accordion" : "close__accordian"}`}
          src={require("./../../../assets/icons/play2.png")}
          alt="Toggle"
        />
        
        <span onClick={toggleAccordion}>Color</span>
        {showColorReset && <span className="reset" onClick={()=>handelColorClick(-1)}>Reset</span>}

      </div>
      {isOpen && (
        <div className="filter__content">
          <ul>
            {colors.map((c, index) => (
              <li key={index} onClick={() => handelColorClick(c)}>
                <div className="check__box__color">
                  <div className={`main__check__box bg-${c.class}`}>
                    <img
                      className={getClassnameOfColor(c.class)}
                      src={require("./../../../assets/icons/tick-gray.png")}
                      alt="Selected"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
