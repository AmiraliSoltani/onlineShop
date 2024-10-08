import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./../../../css/popular__module.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import allA from "../../../json/attributeItem.json";
import {
  getcolors,
  getPriceClasses,
  findingChildren,
} from "./../../common/functionsOfProducts";

import PopularModuleSkeletonLoader from "./PopularModuleSkeletonLoader";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PopularModule({ categoryId, typeProp, allCategories, allProducts }) {
  const allAttributeItemS = allA.data;
  const [mostVisitedProduct, setMostVisitedProduct] = useState([]);
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [imageStates, setImageStates] = useState({});
  const [loading, setLoading] = useState(true);

  const fallbackImage = require('./../../../assets/icons/placeholder.png'); // Path to your placeholder image

  const getMostVisitedProduct = () => {
    setType(typeProp);
    categoryId = parseInt(categoryId);
    if (isNaN(categoryId)) categoryId = 0;

    const allIDs = findingChildren(categoryId, allCategories);
    const products = allProducts.filter((p) => allIDs.includes(p.categoryId));

    let result = [];

    if (type === "visit") {
      result = products.map((p) => p.visited);
      setColor("orange");
    }
    if (type === "sold") {
      result = products.map((p) => p.sold);
      setColor("blue");
    }

    let number = [];
    if (result.length > 5) {
      while (number.length <= 5) {
        let max = Math.max(...result);
        number.push(...result.filter((m) => m === max));
        result = result.filter((m) => m !== max);
      }
    }

    number = [...new Set(number)];

    const finalResult = [];
    products.forEach((product) => {
      number.forEach((num) => {
        if ((type === "visit" && num === product.visited) || 
            (type === "sold" && num === product.sold)) {
          finalResult.push(product);
        }
      });
    });

    setMostVisitedProduct(finalResult);
    if(finalResult.length>0)setLoading(false);

  };

  useEffect(() => {
    getMostVisitedProduct();
  }, [type, allCategories, allProducts]);

  const handleImageError = (e, productId) => {
    setImageStates((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], imageUrl: fallbackImage, hasError: true },
    }));
  };

  const handleImageChange = (productId, imageUrl) => {
    setImageStates((prev) => {
      if (!prev[productId]?.hasError) {
        return {
          ...prev,
          [productId]: { ...prev[productId], imageUrl },
        };
      }
      return prev;
    });
  };

  const handleImageReset = (productId, defaultImageUrl) => {
    setImageStates((prev) => {
      if (!prev[productId]?.hasError) {
        return {
          ...prev,
          [productId]: { ...prev[productId], imageUrl: defaultImageUrl },
        };
      }
      return prev;
    });
  };

  const settings2 = {
    ltr: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  if (loading) {
return <PopularModuleSkeletonLoader></PopularModuleSkeletonLoader>
  }
  return (
    <div className="last__offer">
      <div className="container">
        <div className="main__offer">
          <div className="top__offer">
            <div className={`top__offer__category orange-striped`}>
              <img
                className="icon"
                src={require("./../../../assets/icons/fire.png")}
                alt="logo"
              />
              {type === "visit" && <span> Recently Popular Products</span>}
              {type === "sold" && <span> Recently Bestselling Products</span>}
              {type === "visit" &&
              <Link to={`/lastCategory/1/&order=popularity_desc`} className="plus">
                <span style={{fontSize:"29px",color:"white"}}> + </span>
              </Link>
              }
              {type === "sold" &&
              <Link to={`/last__category/${categoryId}/order=numberInStock.sold_desc`} className="plus">
                <span style={{fontSize:"29px",color:"white"}}> + </span>
              </Link>
              }
            </div>
          </div>

          <div className="middle__offer__slider"></div>
          <div className="buttom__offer__slider">
            <Slider {...settings2}>
              {mostVisitedProduct?.map((product) => {
                const defaultImage = product.productPic[Object.keys(product.productPic)[0]];
                const currentImage = imageStates[product.id]?.imageUrl || defaultImage;

                return (
                  <div className="one__product" key={product.id}>
                    {product.off != 0 && (
                      <div className="tag__discount">{product.off}%</div>
                    )}
                    <Link to={`/product/${product.id}`}>
                      <div className="product__images">
                        <div className="overlay__name">
                          <span>
                            {product.title_En.slice(0, 25)}
                            {product.title_En.length > 25 && <span>...</span>}
                          </span>
                        </div>
                        <img
                          src={currentImage}
                          alt="main_image"
                          onError={(e) => handleImageError(e, product.id)}
                        />
                      </div>
                    </Link>
                    <div className="product__detail">
                      <div className="product__box__color">
                        <ul>
                          {getcolors(product, allAttributeItemS).map((a) => (
                            <li
                              key={a.class}
                              className={a.class}
                              onMouseEnter={() => handleImageChange(product.id, product.productPic[a.class])}
                              onMouseLeave={() => handleImageReset(product.id, defaultImage)}
                            ></li>
                          ))}
                        </ul>
                      </div>
                      <Link to={`/product/${product.id}`}>

                      <div className="product__price__and__icon">
                        <div className="icon__basket">
                          <img
                            className="add__basket"
                            src={require("./../../../assets/icons/bag-4.png")}
                            alt=""
                          />
                          <img
                            className="pluse"
                            src={require("./../../../assets/icons/plus.png")}
                            alt=""
                          />
                        </div>
                        <span className={getPriceClasses(product)}>
                          {parseFloat(product.price).toFixed(2)} $
                        </span>
                        {product.off != 0 && (
                          <span className="discount__price__main">
                            {(parseInt(product.price) * (100 - parseInt(product.off)) / 100).toFixed(2)} $
                          </span>
                        )}

                          <span className="add__to__cart">
                            Let's see It
                          </span>
                      </div>
                        </Link>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularModule;
