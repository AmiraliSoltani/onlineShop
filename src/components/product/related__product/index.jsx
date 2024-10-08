import "./../../../css/related__product.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { checkForStock, getcolors, getPriceClasses } from "./../../common/functionsOfProducts";
import { Link } from "react-router-dom";

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

const RelatedProduct = ({ product, allProducts, allAttributeItemS }) => {
  const [products, setProducts] = useState([]);
  const [imageStates, setImageStates] = useState({});

  const fallbackImage = require('./../../../assets/icons/placeholder.png'); // Path to your placeholder image

  const getRelatedProduct = () => {
    let category = allProducts.filter(
      (p) => p.categoryId === product.categoryId
    );
    let result = category.filter((p) => p.id !== product.id);
    console.log("result",result)
    result = result.filter(p => checkForStock(p));
    return result;
  };

  useEffect(() => {
    if (product !== undefined) {
      setProducts(getRelatedProduct());
    }
  }, [product]);

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

  var settings2 = {
    rtl: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,  // Change to show 5 products instead of 6
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="last__offer">
      <div className="container">
        <div className="main__offer">
          <div className="top__offer">
            <div className="top__offer__category orange-striped">
              <img
                className="icon"
                src={require("./../../../assets/icons/product-2.png")}
                alt="logo"
              />
              <span>Related Products</span>
            </div>
          </div>

          <div className="middle__offer__slider"></div>
          {products.length > 0 && (
            <div className="buttom__offer__slider">
              <Slider {...settings2}>
                {products.map((product) => {
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
                              {product.title_En.slice(0, 29)}
                              {product.title_En.length > 28 && <span> ...</span>}
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
                              {(parseFloat(product.price) * (100 - parseInt(product.off)) / 100).toFixed(2)} $
                            </span>
                          )}

                          <Link to={`/product/${product.id}`}>
                            <span className="add__to__cart"> Let's see It</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
