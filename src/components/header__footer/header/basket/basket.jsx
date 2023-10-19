import "./../../../../css/basket.css";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useContext } from 'react'
import cardContext from "../../../contexts/cardContext";


function Basket() {
  const {state, cardDispatch}= useContext(cardContext)
  const navigate = useNavigate();


 

  const numberWithCommas=(x)=> {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

    const handleCard = () => {
      //if (state.cartProducts.length > 0) {
        navigate("/user");
      //}
    };

      return (
        <div className="basket" >
          <div className="basket__image" onClick={handleCard} >
            <img
              src={require("./../../../../assets/icons/cart2.png")}
              alt=""
              className="image__1"
            />
            <img
              src={require("./../../../../assets/icons/cart2.png")}
              alt="image__2"
              className="image__2"
            />
          </div>
          <span className="shop__item">{state.cartProducts.length}</span>
          <div className="dropdown__basket">
            {state.cartProducts.length === 0 && (
              <div className="without__product">سبد خرید شما خالی است</div>
            )}
            {state.cartProducts.length > 0 && (
              <div className="dropdown__basket__main">
                <div className="dropdown__basket__header">
                  <div className="number__of__commodity">
                    <span>{state.state.cartProducts.length}</span>
                    &nbsp; کالا
                  </div>
                </div>
                {state.cartProducts.slice(0, 3).map((product) => (
                  <Fragment key={product.product._id}>
                    <div className="dropdown__basket__body">
                      <div className="dropdown__basket__body__right">
                        <Link to={`/product/${product.product._id}`}> 
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
                          {product.product.title.slice(0, 35)}
                        </span>
                        {product.product.title.length > 35 && <span>...</span>}
                        <span className="color">
                          {`رنگ : ${product.color[0]}`}{" "}
                        </span>
                        <span className="size">{`سایز : ${product.size}`}</span>
  
                        <div className="dropdown__basket__body__left__info">
                          <span className="number">{`تعداد : ${product.number}`}</span>
                          <div className="trash__button">
                            <img
                              src={require("./../../../../assets/icons/trash-2.png")}
                              alt="logo"
                              onClick={() => {cardDispatch({type:"deleteSpecificProduct",payload:product})}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="dropdown__basket__footer">
                      <div className="dropdown__basket__footer__top">
                        <span className="price__item">
                        {numberWithCommas(
                          product.product.off
                            ? ((parseInt(product.product.price) *
                                (100 - parseInt(product.product.off))) /
                                100) *
                              product.number
                            : product.product.price * product.number
                            )}
                            ,000 تومان
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <div className="dropdown__basket__footer__bottom">
                  {state.cartProducts.length > 3 && (
                    <div className="seeMore__button">
                                        <Link to="/shoppingProcess">
                      <span> همه ی کالاهای سبد خریدتو ببین </span>
                      </Link>
  
                    </div>
                  )}
                  <div className="success__button">
                    <img
                      src={require("./../../../../assets/icons/play4.png")}
                      alt="logo"
                    />
                    <Link to="/shoppingProcess">
                    <span> بزن بریم که وقته خریده!</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  )
}

export default Basket

