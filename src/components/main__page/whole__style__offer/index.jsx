import React, { Fragment, useEffect, useState } from "react";
import "./../../../css/whole__style__offer.css";
import { getcolors, getPriceClasses } from "../../common/functionsOfProducts";
import { Link } from "react-router-dom";
import allA from "../../../json/attributeItem.json"
import allP from "./../../../json/products.json"

function WholeStyleOffer({allProducts}) {
  //const [allAttributeItemS, setAllAttributeItemS] = useState([]);
  const allAttributeItemS = allA.data;
  const [mostVisitedProduct, setMostVisitedProduct] = useState([]);
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [imageStates, setImageStates] = useState({});
  const [loading, setLoading] = useState(true);

  const fallbackImage = require('./../../../assets/icons/placeholder.png'); // Path to your placeholder image
  let product1 = allProducts.filter(
    (p) => p.id == "1")[0];
    console.log("ppppppp",product1,allProducts)

 
  let [product2,product3,product4,product5,product6,product7,product8,product9] =[allProducts[1],allProducts[2],allProducts[3],allProducts[4],allProducts[5],allProducts[6],allProducts[7],allProducts[8]]

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

  const position = (x, y) => {
    let position = { top: `${y}px`, left: `${x}px` };
    return position;
  };

  const makingProduct = (product) => {
    const defaultImage = product?.productPic[Object.keys(product?.productPic)[0]];
    const currentImage = imageStates[product.id]?.imageUrl || defaultImage;
    return (
    <div className="add__to__cart__float">
      <div className="one__product__basket" key={product.id}>
      {/* {product.off != 0 && (
        <div className="tag__discount">{product.off}%</div>
      )} */}
      <Link to={`/product/${product.id}`}>
        <div className="product__images">
          <div className="overlay__name">
            <span>
              {product.title_En.slice(0, 22)}
              {product.title_En.length > 22 && <span>...</span>}
            </span>
          </div>
          <img
          className="tiny"
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

        {/* <div className="product__price__and__icon">
   
          <span className={getPriceClasses(product)}>
            {parseFloat(product.price).toFixed(2)} CAD
          </span>
          {product.off != 0 && (
            <span className="discount__price__main">
              {(parseInt(product.price) * (100 - parseInt(product.off)) / 100).toFixed(2)} CAD
            </span>
          )}

       
        </div> */}
  
      </div>
    </div>
    </div>
  
  )};
   
    return (
      <div className="whole__style__offer">
        <div className="container">
          <div className="main__offer">
            <div className="top__offer">
              <div className="title">
                <div className={`top__offer__category`}>
                  <img
                    className="icon"
                    src={require("./../../../assets/icons/all.png")}
                    alt="logo"
                  />
<span>Buy the entire style at once</span>
</div>
              </div>
            </div>
            {allProducts.length>0 && <div className="buttom__offer__slider">
              <div className="one__product product1">
                <div className="product__images">
                  <img
                    src={require("./../../../assets/products/model-1.jpg")}
                    alt="logo"
                    id="white__image"
                  />
                </div>
                <div className="circle__and__add__to__cart">
                  <div className="circle" style={position(176, 111)}>
                    {makingProduct(product1)}
                  </div>
                  <div className="circle" style={position(228, 222)}>
                    {makingProduct(product2)}
                  </div>
                  <div className="circle" style={position(129, 299)}>
                    {makingProduct(product3)}
                  </div>
                </div>
              </div>
              <div className="one__product product2">
                <div className="product__images">
                  <img
                    src={require("./../../../assets/products/model-3.jpg")}
                    alt="logo"
                    id="white__image"
                  />
                </div>
                <div className="circle__and__add__to__cart">
                  <div className="circle" style={position(150, 132)}>
                    {makingProduct(product4)}
                  </div>
                  <div className="circle" style={position(129, 267)}>
                    {makingProduct(product5)}
                  </div>
                  <div className="circle" style={position(243, 374)}>
                    {makingProduct(product6)}
                  </div>
                </div>
              </div>
              <div className="one__product product3">
                <div className="product__images">
                  <img
                    src={require("./../../../assets/products/model-4.jpg")}
                    alt="logo"
                    id="white__image"
                  />
                </div>
                <div className="circle__and__add__to__cart">
                  <div className="circle " style={position(164, 139)}>
                    {makingProduct(product7)}
                  </div>
                  <div className="circle " style={position(218, 234)}>
                    {makingProduct(product8)}
                  </div>
                  <div className="circle" style={position(149, 367)}>
                    {makingProduct(product9)}
                  </div>
                </div>
              </div>
            </div>}

          </div>
        </div>
      </div>
    );
  }

  export default WholeStyleOffer

