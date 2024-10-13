import React from "react";
import "./../../../css/instagram.css";

function Instagram() {
  const numbers = [1, 2, 3, 4, 5, 6];

  return (
    <div className="instagram">
      <div className="container-special salam">
        <div className="title">
          <div className={`top__offer__category lavender-strip`}>
            <img
              className="icon"
              src={require("./../../../assets/icons/instagram.png")}
              alt="logo"
            />
            <span>Follow us on Instagram</span>
          </div>
        </div>
        <div className="whole__pics">
          {numbers.map((n) => (
            <div className={`one__pic pic${n}`} key={n}>
              <div className="pic">
                <img
                  className="main__pic"
                  src={require(`./../../../assets/products/ins${n}.jpg`)}
                  alt="logo"
                />
                <img
                  className="instagram__icon"
                  src={require("./../../../assets/icons/ins1.png")}
                  alt="logo"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Instagram;
