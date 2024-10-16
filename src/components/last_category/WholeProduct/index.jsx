import React, { useState, useReducer, useEffect } from "react";
import ContentLoader from 'react-content-loader';
import { Link } from "react-router-dom";
import allA from "../../../json/attributeItem.json";
import { getStars, getcolors, getPriceClasses, checkForStock } from "../../common/functionsOfProducts";
import productReducer from "../../reducers/productReducer";
import "./../../../css/products__category.css";

// Loader for 4 rows with 4 boxes each

const ProductLoader = () => {
  return (
    <div className="buttom__offer__slider">
      {[...Array(4)].map((_, rowIndex) => (
        <div key={rowIndex} className="loader-row">
          {[...Array(4)].map((_, boxIndex) => (
            <ContentLoader
              key={boxIndex}
              width={210}
              height={360}
              backgroundColor="#f0f0f0"
              foregroundColor="#ecebeb"
              className="loader-box"
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
              <circle cx="180" cy="320" r="14" />
              <circle cx="150" cy="320" r="14" />
              <rect x="0" y="310" rx="5" ry="5" width="60" height="10" />
              <rect x="0" y="330" rx="5" ry="5" width="120" height="10" />
            </ContentLoader>
          ))}
        </div>
      ))}
    </div>
  );
};



function WholeProduct({ finalPaginateProducts , loading }) {
  console.log("loaaaaaaaaaaaaaaaaa",loading,finalPaginateProducts)
  const allAttributeItem = allA.data;
  const [value, dispatch] = useReducer(productReducer);
  const [imageStates, setImageStates] = useState({});

  const fallbackImage = require('./../../../assets/icons/placeholder.png'); // Path to your placeholder image

  const handleImageError = (e, productId) => {
    e.target.src = fallbackImage;
    setImageStates((prev) => ({
      ...prev,
      [productId]: fallbackImage,
    }));
  };

  const handleImageChange = (productId, imageUrl) => {
    setImageStates((prev) => ({
      ...prev,
      [productId]: imageUrl,
    }));
  };

  const handleImageReset = (productId, defaultImageUrl) => {
    setImageStates((prev) => ({
      ...prev,
      [productId]: defaultImageUrl,
    }));
  };

  // // Simulate fetching data
  // useEffect(() => {
  //   const timeout = setTimeout(() => setLoading(false), 1500); // Simulate loading for 1.5 seconds
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
<div className="whole__product">
  <div className="m">
    <div className="main__offer">
      {loading ? (
        <ProductLoader /> // Show skeleton loader if loading
      ) : (
        <div className="buttom__offer__slider">
          {finalPaginateProducts && finalPaginateProducts.length > 0 ? (
            finalPaginateProducts.map((product) => {
              const defaultImage = product.productPic[Object.keys(product.productPic)[0]];
              const currentImage = imageStates[product.id] || defaultImage;

              return (
                <div className="one__product" key={product.id}>
                  {product.off != 0 && (
                    <div className="tag__discount">{product.off}%</div>
                  )}
                  <Link to={`/product/${product.id}`} style={{width:"100%"}}>
                    <div className="product__images">
                      <div className="overlay">
                        <div className="product__star">
                          <ul>
                          {getStars(product.comments).map(
                                (star, index) => {
                                  if (star >= 1) {
                                    return (
                                      <li className="star__icon" key={index}>
                                        <svg
                                          className={`without__color positive number${index + 1} `}
                                          style={{ zIndex: `${index + 1}` }}
                                          viewBox="0 -10 511.98685 511"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                                        </svg>
                                      </li>
                                    );
                                  }
                                  if (star > 0 && star < 1) {
                                    return (
                                      <li className="star__icon" key={index}>
                                        <svg
                                          className={`without__color positive number${index + 1}`}
                                          //style={{ zIndex: `${index + 1}` }}
                                          viewBox="0 -10 511.98685 511"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          {/* Full star background */}
                                          <path
                                            d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                                            fill="gray" // Default star color
                                          />
                                          {/* Half-filled star */}
                                          <path
                                            d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                                            fill="#ff7675" // Yellow color for the half-filled star
                                            clipPath="polygon(0 0, 50% 0, 50% 100%, 0% 100%)" // This will clip the star to show only the left half
                                          />
                                        </svg>
                                      </li>
                                    );
                                    
                                    
                                  }

                                  if (star <= 0) {
                                    return (
                                      <li className="star__icon" key={index}>
                                        <svg
                                          className={`without__color number${index + 1} `}
                                          viewBox="0 -10 511.98685 511"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                                        </svg>
                                      </li>
                                    );
                                  }
                                }
                              )}
                          </ul>
                        </div>
                      </div>
                      <div className="pic">
                        <img
                          className="main__pic"
                          src={currentImage}
                          alt="product"
                          onError={(e) => handleImageError(e, product.id)}
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="product__detail">
                    <div className="price__color">
                      <div className="product__box__color">
                        <ul>
                          {getcolors(product, allAttributeItem).map((a) => (
                            <li
                              key={a.class}
                              className={a.class}
                              onMouseEnter={() =>
                                handleImageChange(product.id, product.productPic[a.class])
                              }
                              onMouseLeave={() =>
                                handleImageReset(product.id, defaultImage)
                              }
                            ></li>
                          ))}
                        </ul>
                      </div>
                      <div className="product__price__and__icon">
                        <span className={getPriceClasses(product)}>
                          ${product.price}
                        </span>
                        {product.off != 0 && (
                          <span className="discount">
                            ${(parseInt(product.price) * (100 - parseInt(product.off))) / 100}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="product__name">
                      {product.title_En.slice(0, 25)}
                      {product.title_En.length > 25 && <span>...</span>}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-products-message">
              <p>There are no products to show</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</div>

  );
}

export default WholeProduct;
