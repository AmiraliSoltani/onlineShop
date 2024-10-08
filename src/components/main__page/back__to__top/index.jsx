import React, { useState, useEffect } from "react";
import "./../../../css/back__to__top.css";

function BackToTop() {
  const [height, setHeight] = useState(0);

  const scrollFunction = () => {
    if (document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500) {
      return true;
    } else return false;
  };

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  useEffect(() => {
    const handleScroll = () => {
      if (height !== document.documentElement.scrollTop) {
        setHeight(document.documentElement.scrollTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [height]);

  return (
    <>
      {scrollFunction() && (
        <div
          className="back__to__top"
          onClick={() => {
            topFunction();
          }}
        >
          <img src={require("./../../../assets/icons/top-1.png")} alt="" />
        </div>
      )}
    </>
  );
}

export default BackToTop;
