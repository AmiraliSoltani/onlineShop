 import React, { useState, useEffect, useContext, useMemo, useRef, Fragment } from 'react';
import "./../../css/product.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { WishList } from "./wish__list";
import RelatedProduct from "./related__product";
import Comment from "./comment";
import Specifications from "./Specifications";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import cardContext from '../contexts/cardContext';
import APIProduct from '../../services/api-product';
import { addToLastVisited } from '../../services/userData';
import loginContext from '../contexts/loginContext';
import { getAttributes, getcolors, getSize, getStars } from "../common/functionsOfProducts";
import Review from "./review/Review";
import ProductSkeletonLoader from "./skeleton/ProductSkeletonLoader";  // Import the loader

import allA from "../../json/attributeItem.json";
import Countdown from './countDown';
import blurContext from '../contexts/blur';
import axios from 'axios';

const Product = () => {
  const { cardState, cardDispatch } = useContext(cardContext);
  const {blurState,blurDispatch}=useContext(blurContext)

  const { loginState } = useContext(loginContext);
  const { productId } = useParams();
  const location = useLocation();
  const imageGalleryRef = useRef(null);

  const [productLoaded, setProductLoaded] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const [state, setState] = useState({
    tabs: {
      Review: true,
      Specifications: false,
      Comment: false,
    },
    comments: [],
    color: [],
    size: '',
    choice: { color: {}, size: { description: 'Choose' }, count: 1 },
    brand: ""
  });

  const commentsRef = useRef(null);
  const navigate = useNavigate();

  const allAttributeItemS = allA.data;


  useEffect(() => {
    const apiProduct = new APIProduct('/product');

    // Fetch product with ID = 1
    apiProduct.getSpecificProduct(1)
      .then(product => {
        console.log("Fetched Product:", product);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

    useEffect(() => {
    window.scrollTo(0, 105); // Scroll to the top when the component mounts
  }, [location.pathname]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const allProductsAPI = new APIProduct('/products');
        const allCategoriesAPI = new APIProduct('/categories');
        const [productsData, categoriesData] = await Promise.all([
          allProductsAPI.getAll(),
          allCategoriesAPI.getAll()
        ]);
        
        setAllProducts(productsData);
        setAllCategories(categoriesData);
        setProductLoaded(true);
      } catch (error) {
        console.error('Error fetching products or categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (productLoaded && allProducts.length > 0 && allCategories.length > 0) {
      let product = allProducts.find((p) => p.id === productId) || 
                    allProducts.find((p) => p.id === String(productId)) || 
                    allProducts.find((p) => p.id === Number(productId));

      if (product) {
        const comments = product.comments;
        const choice = { ...state.choice };
        const brand = getAttributes(product, allAttributeItemS, 4)[0].title.trim();
        choice.color = getcolors(product, allAttributeItemS)[0];
        choice.size=  { description: 'Choose' }
        choice.count=1;
        setState({ 
          ...state,
          tabs: {  // Reset tabs to default values
            Review: true,
            Specifications: false,
            Comment: false,
          },
          product: product, 
          comments, 
          choice,
          brand 
        });

        const timer = setInterval(() => {
          setTimeRemaining(calculteDiscountTime(product));
        }, 1000);

        // if (!hasVisited) {
        //   setHasVisited(true);
        //   addLastVisitedBackLocal();
        // }

        return () => clearInterval(timer);
      }
    }
  }, [productId, productLoaded, allProducts, allCategories]);

  useEffect(() => {
    if (productId) {
      cardDispatch({ type: "addVisitedProductAtBeginning", payload: Number(productId) });
    }
    // Run this effect only once when the component mounts
  }, [productId]);

  // const addLastVisitedBackLocal = () => {
  //   cardDispatch({ type: "addVisitedProductAtBeginning", payload: productId });
  // };

  const setTabs = (name) => {
    setState(prevState => ({
      ...prevState,
      tabs: { Review: false, Specifications: false, Comment: false, [name]: true }
    }));
  };

  const getParents = () => {
    const parentCategories = [];
    let currentCategoryId = state.product?.categoryId;
    
    while (currentCategoryId !== undefined) {
      const currentCategory = allCategories.find((category) => category.id === currentCategoryId);
      if (currentCategory && currentCategory.parentId !== undefined) {
        parentCategories.push(currentCategory);
      }
      currentCategoryId = currentCategory?.parentId;
    }
    
    return parentCategories.reverse();
  };

  const calculteDiscountTime = (product) => {
    if(product){
      let now = new Date();
      let discount = new Date(product.offerTime);
      let leftTime = discount - now;
      if( leftTime < 0) return false;

      let days = parseInt(leftTime / 86400000);
      let hours = parseInt((leftTime - days * 86400000) / 3600000);
      let minutes = parseInt((leftTime - days * 86400000 - hours * 3600000) / 60000);
      let seconds = parseInt(
        (leftTime - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000
      );
      let result = [
          ['Days', days],
          ['Hours', hours],
          ['minutes', minutes],
          ['Seconds', seconds],
        ];

      return result;
    }
  };

  const setSize = (size) => {
    let choice = { ...state.choice };
    choice.size = size;
    let sizeColor = getSizeColor().filter(
      (a) => a.color.class === choice.color.class && a.size === size
    );
    state.count = sizeColor[0].count;
    setState({ ...state, choice });
  };

  const classNameOfSize = (size) => {
    let className = 'regular2';
    let { choice } = state;
    let boolean = false;
    let sizeColor = getSizeColor().filter(
      (a) => a.color.class === choice.color.class && a.size === size
    );
    if (sizeColor[0]) {
      if (sizeColor[0].count === 0) {
        boolean = true;
      }
    }
    if (sizeColor.length === 0) boolean = true;

    if (size === choice.size) className += ' chose';
    return { className, boolean };
  };

  const setColor = (color) => {
    let choice = { ...state.choice };
    choice.color = color;
    choice.size = { description: "Choose" };
    setState({ ...state, choice });
  };

  const classNameOfColor = (color) => {
    let className = color.class;
    if (color.class.trim() === state.choice.color.class.trim()) className += ' chose';
    return className;
  };

  const getSizeColor = () => {
    if (state.product !== undefined) {
      let { categoryAttributes } = state.product;
      let allSizeColor = [];
      let oneSizeColor = {};
      categoryAttributes.map((attribute) => {
        if (attribute.items[0].id == 1) {
          oneSizeColor.count = attribute.count;
          oneSizeColor.color = attribute.items[0].attItem;
          oneSizeColor.size = attribute.items[1].attItem;
          allSizeColor.push(oneSizeColor);
          oneSizeColor = {};
        }
      });
      let newAllSizeColor = [];
      let newOneSizeColor = {};
      allSizeColor.map((one) => {
        for (let index = 0; index < allAttributeItemS.length; index++) {
          if (allAttributeItemS[index].id == one.color)
            newOneSizeColor.color = allAttributeItemS[index];
          if (allAttributeItemS[index].id == one.size)
            newOneSizeColor.size = allAttributeItemS[index];
        }
        newOneSizeColor.count = one.count;
        newAllSizeColor.push(newOneSizeColor);
        newOneSizeColor = {};
      });
      return newAllSizeColor;
    }
  };

  const getPriceClasses2 = (product) => {
    let priceClasses = 'product__price';
    priceClasses += product.off != 0 ? ' before__discount__price' : '';
    return priceClasses;
  };

  const getClassNameOfTabs = (name) => {
    let className = 'filter__title';
    let { tabs } = state;
    if (tabs[name] === true) className += ' c-white orange-striped';
    return className;
  };

  const resetTabs = () => {
    let tabs = { Review: true, Specifications: false, Comment: false };
    setState({ ...state, tabs });
  };

  const setImages = (product, colorClass) => {
    let images = [];
    let newImages = { original: '', thumbnail: '' };
    for (let key in product.productPic) {
      newImages.original = product.productPic[key];
      newImages.thumbnail = product.productPic[key];
      images.push(newImages);
      newImages = { original: '', thumbnail: '' };
    }
    return images;
  };

  const checkForStock = (product) => {
    return state.choice.count > 0;
  };

  const addToCard = () => {
    console.log("cardddddddddddddddddddddddddddd")
    let product = state.product;
    let choice = state.choice;
    let count = state.count;

    if (choice.size.description === "Choose") {
      toast.error('please choose the size first', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    toast.success('Successfully added to your cart', {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
     let color = [choice.color.class.trim(), `bg-${choice.color.class}`];
    let order = {product:product,color:color,size:choice.size.description,count:choice.count, maxCount:count}
    if(cardState.cartProducts.length>0 && cardState.cartProducts.find(oldOrder=>oldOrder.product._id===order.product._id && oldOrder.color[0]===order.color[0] && oldOrder.size===order.size)) {
      cardDispatch({type:"addExistProduct",payload:order})
    }
    else{
     cardDispatch({type:"addNewProduct",payload:order})
    }

  };

  const disableButton = (status) => {
    let count  = state.choice.count;
    let disable;
    if (status === 'min') {
      if (count === 1) disable = true;
      else disable = false;
    }
    if (status === 'max') {
      if (count === state.count) disable = true;
      else disable = false;
    }

    return disable;
  };

  const classNameOfAddToCart = () => {
    let className = 'add__to__cart';
    if (false) {
      className += ' animation';
    }
    return className;
  };

  const handleColorClick = (color) => {
    setColor(color);
    // Update the current image to match the selected color
    const imageIndex = Object.keys(state.product.productPic).indexOf(color.class.trim());
    if (imageIndex >= 0) {
      setImageIndex(imageIndex);
    }
  };

  const handleGalleryClick = () => {
    imageGalleryRef.current.pause(); // Prevent the gallery from opening on click
  };

  if (!productLoaded) {
    // Show the skeleton loader while the product data is being fetched
    return <ProductSkeletonLoader />;
  }

  return (
    <div className={blurState.blur ? 'main blurred' : "main"}>
      <div className="top__page">
        <div className="container-special">
          <div className="breadcrumb1">
            <div className="sixty"></div>
            {state.product !== undefined && (
              <Breadcrumb>
<Breadcrumb.Item onClick={()=>navigate(`/`)}>
  Main page
</Breadcrumb.Item>
                {getParents().map((c) => {
                  if (c.id !== state.product.categoryId) {
                    return (
                      <Breadcrumb.Item key={c.id}>
                        <Link to={`/lastCategory/${c.id}`}>
                          {c.title}
                        </Link>
                      </Breadcrumb.Item>
                    );
                  } else {
                    return (
                      <Breadcrumb.Item active key={c.id}>
                        <Link to={`/lastCategory/${c.id}`}>
                          &nbsp; {c.title}
                        </Link>
                      </Breadcrumb.Item>
                    );
                  }
                })}
              </Breadcrumb>
            )}
          </div>
          {state.product !== undefined && (
            <div className="top__right__and__left">
              <div className="detail__product__right">
                <div className="title__and__price">
                  <div className="title">
                    <span className="english__name">
                      {state.product.title_En}
                    </span>
                  </div>
                      <div className="brand">
                        <span className="title">Brand: &nbsp;</span>
                  <Link to={`/lastCategory/${state.product.categoryId}/brand=${state.product.Brand}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="description">{state.product.Brand}</span>
                    </Link>
                      </div>
                </div>
                <div className="review">
                  <ul>
                    {getStars(state.comments).map((star, index) => {
                      if (star >= 1) {
                        return (
                          <li className="star__icon" key={index}>
                            <svg
                              className="without__color positive "
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
                              className={`without__color  number${index + 1}`}
                              style={{ zIndex: `${index + 1}` }}
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
                                fill="#feca57" // Yellow color for the half-filled star
                                style={{ clipPath: 'inset(0 50% 0 0)' }} // This will clip the star to show only the left half
                              />
                            </svg>
                          </li>
                        );
                        
                        
                      }

                      if (star <= 0) {
                        return (
                          <li className="star__icon" key={index}>
                            <svg
                              className="without__color "
                              viewBox="0 -10 511.98685 511"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                            </svg>
                          </li>
                        );
                      }
                    })}
                  </ul>
                  {state.comments.length === 0 && <span> without ratings</span>}
                  {state.comments.length > 0 && (
                    <Fragment>
                    <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setTabs("Comment");
                      if (commentsRef.current) {
                        commentsRef.current.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {`${state.comments.length} ratings`}
                  </span>

                    </Fragment>
                  )}
                </div>
                <div className="price">
                  {state.product.off != 0 && (
                    <span className="percentage__discount">
                      {state.product.off}%
                    </span>
                  )}
                  <span className={getPriceClasses2(state.product)}>
                    {`$${Number(state.product.price).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }).slice(1)}`}
                  </span>
                  {state.product.off!=0 && (
                    <Fragment>
                      <span className="discount__price">
                        {`$${Number(
                          Math.ceil(
                            (parseInt(state.product.price) * (100 - parseInt(state.product.off))) /
                              100
                          )
                        ).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>

                      <div className="discount__icon">
                        <img
                          src={require("./../../assets/icons/sale.png")}
                          alt="logo"
                        />
                      </div>
                    </Fragment>
                  )} 
                </div>
                {state.product.off!=0 && (
                    <Fragment>
                      <div className="the__box__of__discount">
                        <div className="title">
                          Hurry up! This discount ends in:
                        </div>
                      </div>
                      <Countdown product={state.product}/>
                    </Fragment>
                )} 
                <div className="color__and__size">
                  <div className="product__box__color">
                    <div className="title__color">
                      <span className="title">Color:&nbsp;&nbsp;</span>
                      <span className="choose">
                        {state.choice.color.class.trim()}
                      </span>
                    </div>
                    <ul>
                      {getcolors(state.product, allAttributeItemS).map((a) => (
                        <li
                          key={a.class}
                          className={classNameOfColor(a)}
                          onClick={() => handleColorClick(a)}
                        >
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="product__box__size">
                    <div className="title__size">
                      <span className="title">Size:&nbsp;&nbsp;</span>
                      <span className="choose">
                        {state.choice.size.description}
                      </span>
                    </div>
                    <ul>
                      {getSize(state.product, allAttributeItemS).map((a) => {
                        if (!classNameOfSize(a).boolean) {
                          return (
                            <li
                              className={classNameOfSize(a).className}
                              onClick={() => {
                                setSize(a);
                              }}
                              key={a.id}
                            >
                              {" "}
                              {a.title.trim()}
                            </li>
                          );
                        } else {
                          return (
                            <li className="not__allowed" key={a.id}>
                              {" "}
                              {a.title.trim()}
                              <div className="out__of__stock"></div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className="buttons">
                  {checkForStock(state.product) && (
                    <div className="number__product">
                     <button
                        className="button"
                        disabled={disableButton("min")}
                        onClick={() => {
                          setState((prev) => ({
                            ...prev,
                            choice: {
                              ...prev.choice,
                              count: prev.choice.count -1
                            }
                          }));
                        }}                            
                      >
                        -
                      </button>

                      <span className="quantity">{state.choice.count}</span>
                    
                      <button
                        className="button"
                        disabled={disableButton("max")}
                        onClick={() => {
                          setState((prev) => {
                            const newState = {
                              ...prev,
                              choice: {
                                ...prev.choice,
                                count: prev.choice.count + 1,
                              },
                            };
                            return newState;
                          });
                        }}                           
                      >
                        +
                      </button>
                    </div>
                  )}
                     {checkForStock(state.product) && (
                    <div
                      className={classNameOfAddToCart()}
                      onClick={() => {
                        addToCard();
                      }}
                    >
                      <span>Add to Cart</span>
                      <img
                        className="icon"
                        src={require("./../../assets/icons/bag-4.png")}
                        alt=""
                      />
                      <img
                        className="pluse"
                        src={require("./../../assets/icons/plus.png")}
                        alt=""
                      />
                    </div>
                  )}
                  {!checkForStock(state.product) && (
                    <span className="out__of__stock">
Unfortunately, this item is out of stock.                    </span>
                  )}
                   <div className="wish__list">
                    <WishList productID={productId} authenticated={loginState.authenticated} />
                  </div>
                </div>

                <div className="guid">
                  <div className="size__info">
                    <img
                      className="icon"
                      src={require("./../../assets/icons/size-guide.png")}
                      alt=""
                    />
                    <span>Size Guide</span>
                  </div>
                  <div className="shipping__info">
                    <img
                      className="icon"
                      src={require("./../../assets/icons/delivery-2.png")}
                      alt=""
                    />
                    <span>Shipping Info</span>
                  </div>
                  <div className="terms__of__returns">
                    <img
                      className="icon"
                      src={require("./../../assets/icons/box-4.png")}
                      alt=""
                    />
                    <span>Return Policy</span>
                  </div>
                </div>
              </div>
                  <div className="product-line"></div>
              <div className="image__galery__left">
                <div className="galery" onClick={handleGalleryClick}>
                  <ImageGallery
                    ref={imageGalleryRef}
                    items={setImages(state.product, state.choice.color.class.trim())}
                    startIndex={imageIndex}
                    infinite={state.infinite}
                    showBullets={state.showBullets}
                    showFullscreenButton={false} // Disable fullscreen button
                    showPlayButton={false}
                    showThumbnails={state.showThumbnails}
                    showIndex={state.showIndex}
                    showNav={state.showNav}
                    isRTL={state.isRTL}
                    thumbnailPosition="right"
                    slideDuration={parseInt(state.slideDuration)}
                    slideInterval={parseInt(state.slideInterval)}
                    slideOnThumbnailOver={state.slideOnThumbnailOver}
                  />
                </div>
                {/* <div className="share">
                  <span> Let's Share this Product</span>
                  <img
                    className="icon1"
                    src={require("./../../assets/icons/telegram.png")}
                    alt=""
                  />
                  <img
                    className="icon1"
                    src={require("./../../assets/icons/whatsapp.png")}
                    alt=""
                  />
                  <img
                    className="icon1"
                    src={require("./../../assets/icons/gmail.png")}
                    alt=""
                  />
                  <img
                    className="icon1"
                    src={require("./../../assets/icons/twitter.png")}
                    alt=""
                  />
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="middle__page">
        <RelatedProduct product={state.product} allProducts={allProducts} allAttributeItemS={allAttributeItemS}/>
      </div>

      {state.product!==undefined && (
        <div className="buttom__page__tabs">
          <div className="container">
            <div ref={commentsRef}>
              <div className="tabs">
                <div className="custom">
                  <div className={getClassNameOfTabs("Review")} onClick={()=>setTabs("Review")}>
                    <img
                      className="title__icon"
                      src={require("./../../assets/icons/fun-glasses.png")}
                      alt=""
                    />
                    <span>Review</span>
                  </div>
                  <div className={getClassNameOfTabs("Specifications")} onClick={()=>setTabs("Specifications")}>
                    <img
                      className="title__icon"
                      src={require("./../../assets/icons/writing.png")}
                      alt=""
                    />
                    <span>Specifications</span>
                  </div>
                  <div className={getClassNameOfTabs("Comment")} onClick={()=>setTabs("Comment")}>
                    <img
                      className="title__icon"
                      src={require("./../../assets/icons/interaction.png")}
                      alt=""
                    />
                    <span>Comments</span>
                  </div>
                </div>
              </div>
            </div>

            {state.tabs.Specifications && (
              <Specifications product={state.product} allAttribute={allAttributeItemS}  />
            )}
            {state.tabs.Review && (
              <Review product={state.product} allAttribute={allAttributeItemS}  />
            )}
            {state.tabs.Comment && (
              <Comment product={state.product} comments={state.comments} loginState={loginState} />
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Product;
