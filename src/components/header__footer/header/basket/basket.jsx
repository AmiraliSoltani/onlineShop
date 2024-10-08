import "./../../../../css/basket.css";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useContext } from 'react'
import cardContext from "../../../contexts/cardContext";


function Basket() {
  const {cardState, cardDispatch}= useContext(cardContext)
  console.log("basket" , cardState.cartProducts)
  const navigate = useNavigate();

let totalPrice=0;
 
let number =0;
cardState.cartProducts?.map(cart=>number+=cart?.count)

  const numberWithCommas=(x)=> {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

    const handleCard = () => {
      //if (cardState.cartProducts.length > 0) {
        navigate("/shoppingProcess");
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
          <span className="shop__item">{cardState.cartProducts.length}</span>
          <div className="dropdown__basket">
            {cardState.cartProducts.length === 0 && (
              <div className="without__product">your basket is empty</div>
            )}
            {cardState.cartProducts.length > 0 && (
              <div className="dropdown__basket__main">
                <div className="dropdown__basket__header  ">
                  <span className="title2">My Bag,</span>
                  <div className="number__of__commodity">
                    <span>{number}</span>
                  {cardState.cartProducts.length==1? <spam> &nbsp;Item  </spam> : <spam>&nbsp;Items   &nbsp; </spam>}
                  </div>
                </div>

                <div className="dropdown__basket__body__container">
                {cardState.cartProducts.map((product) => {
                    const itemPrice = product.product.off
                    ? ((parseInt(product.product.price) * (100 - parseInt(product.product.off))) / 100) * product.count
                    : product.product.price * product.count;
                  
                  // Add the current item's price to the total
                  totalPrice += itemPrice;
  // Log the product to see its structure
  console.log("Product222222222222222:", product);

  return (
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
            {product.product.title_En.slice(0, 35)}
          </span>
          {product.product.title.length > 35 && <span>...</span>}
          <span className="color">
            {`Color : ${product.color[0]}`}{" "}
          </span>
          <span className="size">{`Size : ${product.size}`}</span>

          <div className="dropdown__basket__body__left__info">
              <span className="number">{`number : ${product.count}`}</span>
            <div className="trash__button">
              <img
                src={require("./../../../../assets/icons/trash-2.png")}
                alt="logo"
                onClick={() => {
                  cardDispatch({ type: "deleteSpecificProduct", payload: product });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dropdown__basket__footer ">
        <div className="dropdown__basket__footer__top">
          <span className="price__item">
            {numberWithCommas(itemPrice)}
            .00 $
          </span>
        </div>
      </div>
    </Fragment>
  );
})}
</div>



                <div className="dropdown__basket__footer__bottom">
                  <div className="success__button striped-background-basket">
                    {/* <img
                      src={require("./../../../../assets/icons/play4.png")}
                      alt="logo"
                    /> */}
                    <span> Sub-total:  {numberWithCommas(totalPrice )}
                    .00 $</span>
                  </div>
                  <div className="two-buttons">
                  <Link style={{textDecoration:"none"}} to="/shoppingProcess">
                  <div className="view-bag"> view-bag</div>
                  </Link>
                  <Link style={{textDecoration:"none"}} to="/shoppingProcess">
                  <div className="check-out">check-out</div>
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

