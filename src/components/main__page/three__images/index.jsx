import React from "react";
import "./../../../css/three__images.css";
import { Link } from "react-router-dom";

function ThreeImages() {
  return (
    <div className="container-special">
      <div className="three__images">
        <div className="right__images">
          <Link to="/last__category/1/optionalFilter=Summer">
            <div className="top__right__images">
              <img
                src={require("./../../../assets/banners/h84.jpg")}
                alt=""
              />
              <div className="detail__image">
                <span className="title"></span>
              </div>
              <span className="button">Women's Summer Collection</span>
            </div>
          </Link>
          <Link to="/last__category/1/range=1">
            <div className="buttom__right__images">
              <img
                src={require("./../../../assets/banners/h85.jpg")}
                alt=""
              />
              <div className="detail__image">
                <span className="title"></span>
              </div>
              <span className="button">Women's Beauty Essentials</span>
            </div>
          </Link>
        </div>
        <div className="left">
          <Link to="/last__category/1/discount=true">
            <div className="left__image">
              <img src={require("./../../../assets/banners/h86.jpg")} alt="" />
              <div className="detail__image">
                <span className="title"></span>
              </div>
              <span className="text"></span>
              <span className="button">Autumn Discount Festival</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThreeImages;
