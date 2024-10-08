import React, { useState, useEffect, useContext } from "react";
import "./../../css/shoppingProcess.css";
import { getAttributes } from "../common/functionsOfProducts";
import { Link } from "react-router-dom";
import cardContext from "../contexts/cardContext";
import allA from "../../json/attributeItem.json"

const ShoppingProcess = () => {
  const [count, setCount] = useState([]);
  const {cardState, cardDispatch}= useContext(cardContext)
  let allAttributeItemS = allA.data


  useEffect(() => {
    const countArray = cardState.cartProducts.map((product) => product.count);
    setCount(countArray);
  }, [cardState]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  const increase=(product)=>{
    console.log("hhhhhhhhhhhhhhhhhhh")
    cardDispatch({type:"increment",payload:product})
  }

  const disableButton = (index, status, max) => {
    let counting  = count[index];
    let disable;
    if (status === 'min') {
      if (counting === 1) disable = true;
      else disable = false;
    }
    if (status === 'max') {
      if (counting === max) disable = true;
      else disable = false;
    }

    return disable;
  };



  const deleteProduct = (product) => {
    cardDispatch({type:"deleteSpecificProduct",payload:product})
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

  const regularPriceOfAllProducts = () => {
    let sum = 0;
    cardState.cartProducts.forEach((p) => (sum += p.product.price * p.count));
    return sum;
  };

  return (
    <div className="container">
      <div className="top__offer__category">
        <img
          className="icon"
          src={require("./../../assets/icons/groceries.png")}
          alt="logo"
        />
        <span> سبد خرید</span>
      </div>

      <div className="whole__shopping__process">
        <div className="whole__right__box">
          <div className="right__box">
          {cardState.cartProducts.length===0 && <div> empty </div>}

            {cardState.cartProducts.length > 0 &&
              cardState.cartProducts.map((oneProduct, index) => (
                <div className="one__product" key={index}>
                  <div className="pic__product__left">
                    <Link to={`/product/${oneProduct.product._id}`}>
                      <img
                        src={
                          oneProduct.product.productPic[
                            Object.keys(oneProduct.product.productPic)[0]
                          ]
                        }
                        alt="main_image"
                      />
                    </Link>
                  </div>
                  <div className="detail__product__right">
                    <div className="title__and__price">
                      <div className="title">
                        <Link to={`/product/${oneProduct.product._id}`}>
                          <span>{oneProduct.product.title}</span>
                        </Link>
                        <span className="english__name">
                          <Link to={`/product/${oneProduct.product._id}`}>
                            {oneProduct.product.title_En}
                          </Link>
                        </span>
                      </div>
                    </div>

                    <div className="product__detail">
                      <div className="one-line">
                        {oneProduct.product._id && (
                          <div className="id">
                            <span className="title">آیدی:</span>
                            <span className="description">
                              {/* {oneProduct.product._id.slice(
                                oneProduct.product._id.length - 9,
                                oneProduct.product._id.length
                              )}{" "} */}
                              {oneProduct.product._id}
                            </span>
                          </div>
                        )}
                        <div className="brand">
                          <span className="title">برند:</span>
                          <span className="description">
                            {
                              getAttributes(
                                oneProduct.product,
                                allAttributeItemS,
                                4
                              )[0].title
                            }
                          </span>
                        </div>
                      </div>
                      <div className="one-line">
                        <div className="waranty">
                          <span className="title">گارانتی:</span>
                          <span className="description">
                            {oneProduct.product.guarantee.hasGuarantee &&
                              oneProduct.product.guarantee.guranteeName}
                            {!oneProduct.product.guarantee.hasGuarantee &&
                              "24 ساعت گارانتی سایت"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="color__and__size">
                      <div className="product__box__color">
                        <div className="title__color">
                          <span className="title">رنگ:</span>
                          <span className="choose">{oneProduct.color[0]}</span>
                        </div>
                        <ul>
                          <li className={oneProduct.color[1]}></li>
                        </ul>
                      </div>
                      <div className="product__box__size">
                        <div className="title__size">
                          <span className="title">سایز:</span>
                          <span className="choose">{oneProduct.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="buttons">
                      <div className="number__product">
                        <button
                          disabled={disableButton(index, "max", oneProduct.maxCount)}
                          onClick={()=>cardDispatch({type:"increment",payload:oneProduct})}
                        >
                          +
                        </button>
                        <span className="quantity">{count[index]}</span>
                        <button
                          disabled={disableButton(index, "min", oneProduct.maxCount)}
                          onClick={()=>cardDispatch({type:"decrement",payload:oneProduct})}
                        >
                          -
                        </button>
                      </div>

                      <div className="delete">
                        <img
                          alt="delete"
                          src={require("./../../assets/icons/ui.png")}
                          onClick={() => deleteProduct(oneProduct)}
                        />
                      </div>
                      <div className="price">
                        <span>قیمت:</span>
                        {!oneProduct.product.off && (
                          <div className="regular__price">
                            {`${
                              oneProduct.product.price * oneProduct.count
                            } هزار تومان`}
                          </div>
                        )}
                        {oneProduct.product.off && (
                          <div className="all__price">
                            <div className="regular2__price">
                              {`${
                                oneProduct.product.price * oneProduct.count
                              } هزار تومان`}
                            </div>
                            <div className="discount__price">
                              {Math.ceil(
                                (parseInt(oneProduct.product.price) *
                                  (100 - parseInt(oneProduct.product.off))) /
                                  100
                              ) * oneProduct.count}
                              &nbsp; هزار تومان
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {cardState.cartProducts.length > 0 &&
        <div className="left__box">
          <div className="numbers">
            <span>{`قیمت کالاها (${numberOfProducts()})`}</span>
            <span>{` ${numberWithCommas(regularPriceOfAllProducts())},000 تومان`}</span>
          </div>
          <div className="discounts">
            <span>{`تخفیف کالاها `}</span>
            {discountOfAllProducts() !== 0 && (
              <span>{`${numberWithCommas(discountOfAllProducts())},000 تومان`}</span>
            )}
            {discountOfAllProducts() === 0 && <span>بدون تخفیف</span>}
          </div>
          <div className="line2"></div>
          <div className="result first">
            <span>{`جمع کل  `}</span>
            <span>{`${numberWithCommas(priceOfAllProducts())},000 تومان`}</span>
          </div>
          <div className="result second">
            <span>{` هزینه ارسال  `}</span>
            <span>{`رایگان`}</span>
          </div>

          <div className="line2"></div>

          <div className="result third">
            <span>{`مبلغ قابل پرداخت `}</span>
            <span>{`${numberWithCommas(priceOfAllProducts())},000 تومان`}</span>
          </div>

          <button type="button" className="btn btn-info custom__button">
            ادامه فرایند خرید
          </button>
        </div>}
      </div>
    </div>
  );
};

export default ShoppingProcess;
