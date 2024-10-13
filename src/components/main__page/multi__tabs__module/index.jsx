


import React, { useState, useEffect, useReducer, useContext } from "react";
import Slider from "react-slick";
import "./../../../css/multi__tabs__module.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import allA from "../../../json/attributeItem.json";
import { Link } from "react-router-dom";

import {
  getStars,
  getcolors,
  getPriceClasses,
  checkForStock,
} from "../../common/functionsOfProducts";
import productReducer from "../../reducers/productReducer";
import MultiTabsSkeletonLoader from "./MultiTabsSkeletonLoader"; // Import the skeleton loader
import blurContext from "../../contexts/blur";
import cardContext from "../../contexts/cardContext";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />
  );
}

function MultiTabsModule(props) {
  const {blurState,blurDispatch}=useContext(blurContext)
  const {cardState, cardDispatch}= useContext(cardContext)

  const allAttributeItem = allA.data;
  const [value, dispatch] = useReducer(productReducer);
  const [multitabCategories, setMultitabCategories] = useState([]);
  const [multitabsProduct, setMultitabsProduct] = useState([]);
  const [show, setShow] = useState();
  const [line, setLine] = useState("0");
  const [imageStates, setImageStates] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state

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

  const getProducts = (category,index) => {
    dispatch({
      type: "getProductsOfOneCategory",
      payload: category,
      data: { allCategories: props.allCategories, allProducts: props.allProducts }
    });
    const productsOfCategory = value.productOfOneCategory.filter((p) => checkForStock(p));
    setMultitabsProduct(productsOfCategory);
    setShow(category.id);
    setLine(index);
  };


  useEffect(() => {
    const getCategories = () => {
      let LastVisitedCategories=[]
      if(cardState.lastVisitedProducts.length>0){
        cardState.lastVisitedProducts.map(productID=>{
          if(productID && props.allProducts.length>0 ){
            
            let product= props.allProducts.find(product=>product.id==productID)
            if(!LastVisitedCategories.includes(product.categoryId)) LastVisitedCategories.push(product.categoryId)
          } 
          })
      }
      console.log("lastttttttttttt",cardState.lastVisitedProducts,LastVisitedCategories)
      const choices = [12, 801, 7, 11, 800];

// Combine LastVisitedCategories with choices, ensuring no duplicates and correct order
const mergedChoices = [...LastVisitedCategories];

// Add remaining choices to mergedChoices, if they are not already present
if(mergedChoices.length<5){
choices.forEach((choice) => {
  if (!mergedChoices.includes(choice)) {
    mergedChoices.push(choice);
  }
});
}

// Trim mergedChoices to a maximum of 5 elements (as per your requirement)
const finalChoices = mergedChoices.slice(0, 5);

console.log("Final merged choices:", finalChoices);

// Now filter categories based on the finalChoices array and keep the order
const selectedCategories = props.allCategories.filter((category) =>
  finalChoices.includes(category.id)
);

// Ensure the selected categories are in the same order as finalChoices
const orderedSelectedCategories = finalChoices.map(choiceId =>
  selectedCategories.find(category => category.id === choiceId)
).filter(Boolean); // Remove any undefined elements

console.log("orderedSelectedCategories",orderedSelectedCategories)

setShow(orderedSelectedCategories[0].id)
setMultitabCategories(orderedSelectedCategories);

      setLoading(false);
    };

    if (props.allCategories.length > 0 && props.allProducts.length > 0) {
      getCategories();
    }
  }, [props.allCategories, props.allProducts,cardState.lastVisitedProducts]);


  useEffect(() => {
    if (show) {
      dispatch({
        type: "getProductsOfOneCategory",
        payload: props.allCategories.find((category) => category.id == show),
        data: { allCategories: props.allCategories, allProducts: props.allProducts }
      });

    }
  }, [show]);

  useEffect(() => {
    if (value) {
      const productsOfCategory = value.productOfOneCategory.filter((p) => checkForStock(p));
      setMultitabsProduct(productsOfCategory);
    }
  }, [value]);

  // var settings2 = {
  //   ltr: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };

  var settings2 = {
    ltr: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 980, // When the screen is 1200px or less
        settings: {
          slidesToShow: 4, // Show 4 slides instead of 5
          slidesToScroll: 4,

        },
      },
      {
        breakpoint: 650, // When the screen is 992px or less
        settings: {
          slidesToShow: 3, // Show 3 slides instead of 5
          slidesToScroll: 3,

        },
      },
      {
        breakpoint: 1, // When the screen is 768px or less
        settings: {
          slidesToShow: 2, // Show 2 slides instead of 5
        },
      },
      
    ],
  };
  

  if (loading) {
    return <MultiTabsSkeletonLoader />;
  }

  return (
    <div className={blurState.blur ? 'amazing__offer blurred' : 'amazing__offer'}>
      <div className="container-special">
        <div className="main__offer">
        <div className="top__offer">
  {/* {multitabCategories.length !== 0 && multitabCategories.map((category) => {
    console.log("Category:", category);
    return (
      <div
        onClick={() => getProducts(category)}
        className={`top__offer__category bg-${category.backgroundcolor}`}
        key={category.id}
      >
        <span>{category.title}</span>
        <img className="icon" src={category.iconPic} alt="category" />
        {show === category.id && (
          <svg
            className={`arrow arrow__bg-${category.backgroundcolor}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 494.148 494.148"
            space="preserve"
          >
            <path
              d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
              c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
              C432.632,229.572,422.964,213.288,405.284,201.188z"
            />
          </svg>
        )}
      </div>
    );
  })} */}
{multitabCategories.length !== 0 && multitabCategories.map((category,index) => {
  console.log("Category:", category);
  return (
    <div
      onClick={() => getProducts(category,index)}
      className={`top__offer__category bg-${index}`}

      key={category.id}
    >
      <div className="icon-container">
        <img className="icon" src={category.iconPic} alt="category" />
      </div>
      <span>{category.title}</span>
      {show === category.id && (
        <svg
          className={`arrow arrow__bg-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 494.148 494.148"
          space="preserve"
        >
          <path
            d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
            c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
            C432.632,229.572,422.964,213.288,405.284,201.188z"
          />
        </svg>
      )}
    </div>
  );
})}


</div>


          <div className="middle__offer__slider">
            <div className={`line2 bg-${line}`}></div>
          </div>

          <div className="buttom__offer__slider">
            <Slider {...settings2} key={show}>
      
              {multitabsProduct?.slice(0,12).map((product) => {
                const defaultImage = product.productPic[Object.keys(product.productPic)[0]];
                const currentImage = imageStates[product.id] || defaultImage;

                return (
                  <div className="one__product" key={product.id}>
                    {product.off!=0 && (
                      <div className="tag__discount">{product.off}%</div>
                    )}
                    <Link to={`/product/${product.id}`}>
                      <div className="product__images">
                      <img
                            className="main__pic"
                            src={currentImage}
                            alt="product"
                            onError={(e) => handleImageError(e, product.id)}
                          />
                          <div className="product__star">
                            <ul>
                              {getStars(product.comments).map(
                                (star, index) => {
                                  if (star >= 1) {
                                    return (
                                      <li className="star__icon" key={index}>
                                        <svg
                                          className={`without__color positive number${index + 1} `}
                                          style={{ zIndex: `${100-index}` }}
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
                                          style={{ zIndex: `${100-index}` }}
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
                                          style={{ zIndex: `${100-index}` }}
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
                    </Link>
                    <div className="product__detail">
                      <div className="product__box__color">
                        <ul>
                          {getcolors(product, allAttributeItem).map((a) => (
                            <li
                              key={a.class}
                              className={a.class}
                              onMouseEnter={() =>
                                handleImageChange(
                                  product.id,
                                  product.productPic[a.class]
                                )
                              }
                              onMouseLeave={() =>
                                handleImageReset(
                                  product.id,
                                  defaultImage
                                )
                              }
                            ></li>
                          ))}
                        </ul>
                      </div>

                      <div className="product__name">
                        {product.title_En.slice(0, 24)}
                        {product.title_En.length > 24 && <span>...</span>}
                      </div>
                      <div className="product__price__and__icon">
                        <span className={getPriceClasses(product)}>
                          {product.price}.00 $
                        </span>

                        {product.off!=0 && (
                          <span className="discount">
                            {(parseInt(product.price) *
                              (100 - parseInt(product.off))) /
                              100}{" "}.00 $
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <Link to={`/lastCategory/${show}`}  className="no-decoration" style={{textDecoration:"none !important"}}>
              <div className={`see-more2 bg-${line}`} >

<span> See all the products</span>
<img
                className="arrow-icon"
                src={require("./../../../assets/icons/arrow-right.png")}
                alt="logo"
              />
              </div>
</Link>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiTabsModule;
