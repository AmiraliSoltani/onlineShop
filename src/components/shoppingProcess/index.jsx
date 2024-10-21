import React, { useState, useEffect, useContext, Fragment } from "react";
import "./../../css/shoppingProcess.css";
import { getAttributes } from "../common/functionsOfProducts";
import { Link } from "react-router-dom";
import cardContext from "../contexts/cardContext";
import allA from "../../json/attributeItem.json"
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import APIProduct from "../../services/api-product";
import AlsoBoughtProduct from "./alsoBoughtProducts";

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
    It will calculate in the next step
    </Tooltip>
  );
}


const ShoppingProcess = () => {
  const [count, setCount] = useState([]);
  const { cardState, cardDispatch } = useContext(cardContext);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  console.log("cardState.cartProducts[0]",cardState.cartProducts[0])
  const [product, setProduct] = useState({});



  let allAttributeItemS = allA.data;


  useEffect(() => {
    setProduct( cardState.cartProducts[0]?.product)
  }, [cardState]);

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
      } catch (error) {
        console.error('Error fetching products or categories:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const countArray = cardState.cartProducts.map((product) => product.count);
    setCount(countArray);
  }, [cardState]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  const increase = (product) => {
    console.log("Increment");
    cardDispatch({ type: "increment", payload: product });
  };

  let totalPrice=0;


  const disableButton = (index, status, max) => {
    let counting = count[index];
    let disable;
    if (status === "min") {
      if (counting === 1) disable = true;
      else disable = false;
    }
    if (status === "max") {
      if (counting === max) disable = true;
      else disable = false;
    }

    return disable;
  };

  const deleteProduct = (product) => {
    cardDispatch({ type: "deleteSpecificProduct", payload: product });
  };

  const numberOfProducts = () => {
    let sum = 0;
    cardState.cartProducts.forEach((p) => (sum += p.count));
    return sum;
  };

  const priceOfAllProducts = () => {
    let sum = 0;
    cardState.cartProducts.forEach((p) => {
      if (p.product.off === null) {
        sum += p.product.price * p.count;
      } else {
        sum +=
          ((parseInt(p.product.price) * (100 - parseInt(p.product.off))) / 100) *
          p.count;
      }
    });
    return sum;
  };

  const discountOfAllProducts = () => {
    let sum = 0;
    cardState.cartProducts.forEach((p) => {
      if (p.product.off !== null) {
        sum +=
          ((parseInt(p.product.price) * parseInt(p.product.off)) / 100) *
          p.count;
      }
    });
    return sum;
  };

  const getPriceClasses2 = (product) => {
    let priceClasses = 'product__price';
    priceClasses += product.off != 0 ? ' before__discount__price' : '';
    return priceClasses;
  };

  const regularPriceOfAllProducts = () => {
    let sum = 0;
    cardState.cartProducts.forEach((p) => (sum += p.product.price * p.count));
    return sum;
  };

  return (
    <Fragment>
      <div className="bg-grey">
      <div className="container-special">
        <div className="whole-part">
<div className="left-part">
  <div className="header Stormcloud-striped">
<span>My Bag</span>
  </div>

<div className="main-part">

<div className="dropdown__basket__body__container">
                {cardState.cartProducts.map((product,index) => {
                    const itemPrice = product.product.off
                    ? ((parseInt(product.product.price) * (100 - parseInt(product.product.off))) / 100) * product.count
                    : product.product.price * product.count;
                    const beforeDiscount = product.product.price * product.count;
                  // Add the current item's price to the total
                  totalPrice += itemPrice;
  // Log the product to see its structure
  console.log("Product222222222222222:", product);

  return (
    <Fragment key={product.product.id}>
      <div className="dropdown__basket__body">
             <div className="trash__button">
              <img
                src={require("./../../assets/icons/close.png")}
                alt="logo"
                onClick={() => {
                  cardDispatch({ type: "deleteSpecificProduct", payload: product });
                }}
              />
            </div>
        <div className="dropdown__basket__body__right">
          <Link to={`/product/${product.product.id}`}>
            <img
              src={
                product.product.productPic[
                  Object.keys(product.product.productPic)[0]
                ]
              }
              alt="logo"
            />
          </Link>
        </div>
        <div className="dropdown__basket__body__left">
          <span className="name">
            {product.product.title_En.slice(0, 40)}
          </span>
          {product.product.title.length > 40 && <span>...</span>}
          <div className="color-size">
          <span className="color">
            {` ${product.color[0]}`}{" "}
          </span>
          <span className="size">{`${product.size}`}</span>
</div>
          <div className="dropdown__basket__body__left__info">
              {/* <span className="number">{`Number : ${product.count}`}</span> */}
              <div className="number__product">
                        <button
                          disabled={disableButton(index, "max", product.maxCount)}
                          onClick={() =>
                            cardDispatch({ type: "increment", payload: product })
                          }
                        >
                          +
                        </button>
                        <span className="quantity">{count[index]}</span>
                        <button
                          disabled={disableButton(index, "min", product.maxCount)}
                          onClick={() =>
                            cardDispatch({ type: "decrement", payload: product })
                          }
                        >
                          -
                        </button>
                        </div>
          
          </div>
          {/* <span className="price__item">
            {numberWithCommas(itemPrice)}
            .00 $
          </span> */}
             <div className="price">
                  {/* {product.product.off != 0 && (
                    <span className="percentage__discount">
                      {product.product.off}%
                    </span>
                  )} */}
                  <span className={getPriceClasses2(product.product)}>
                    {`$${Number(beforeDiscount).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }).slice(1)}`}
                  </span>
                  {product.product.off!=0 && (
                    <Fragment>
                      <span className="discount__price">
                        {`$${Number(
                          Math.ceil(
                            (parseInt(beforeDiscount) * (100 - parseInt(product.product.off))) /
                              100
                          )
                        ).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>
{/* 
                      <div className="discount__icon">
                        <img
                          src={require("./../../assets/icons/sale.png")}
                          alt="logo"
                        />
                      </div> */}
                    </Fragment>
                  )} 
                </div>
        </div>
      </div>


    </Fragment>
  );
})}
</div>

</div>


</div>
<div className="right-part">
<div className="header-shopping">
Total
</div>
<div className="shopLine"></div>
<div className="sub-total">
  <div className="title">Sub-total</div>
  <div className="sub-total-price">
  <span>{numberWithCommas(totalPrice )}
  .00 $</span>
  </div>
</div>

<div className="delivery">
  <div className="title">Delivery</div>
  <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
       <img className="delivery-img" src={require("./../../assets/icons/info-3.png")}alt="logo"/>

      </OverlayTrigger>
  {/* <img className="delivery-img" src={require("./../../assets/icons/info-3.png")}alt="logo"/> */}
</div>
<div className="shopLine"></div>

<div className="checkout-button">
  CHECKOUT
</div>
<div className="footer">
  <span className="header">We Accept:</span>
  <div className="payment">
  <img src={require("./../../assets/icons/card-1.png")}alt="logo"/>
  <img src={require("./../../assets/icons/card-2.png")}alt="logo"/>
  <img src={require("./../../assets/icons/card-3.png")}alt="logo"/>
  <img src={require("./../../assets/icons/card-4.png")}alt="logo"/>
  <img src={require("./../../assets/icons/card-5.png")}alt="logo"/>
  <img src={require("./../../assets/icons/card-6.png")}alt="logo"/>

  </div>
  <span className="discount-explain">
  Got a discount code? Add it in the next step.
  </span>
</div>


</div>
</div>

      </div>
      <div className="also">
        {product && allProducts.length>0 &&
      <AlsoBoughtProduct product={product} allProducts={allProducts} allAttributeItemS={allAttributeItemS}/>
        }
      </div>
      </div>
    </Fragment>
  )
};

export default ShoppingProcess;
