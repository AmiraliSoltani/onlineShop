import "./../../css/main__page.css";
import React, { useEffect, useState } from "react";
import MultiTabsModule from "./multi__tabs__module";
import TopSlideshow from "./top__slideshow";
import ThreeImages from "./three__images";
import PopularModule from "./popular__module";
import ParallexPic from "./parallex__pic";
import BackToTop from "./back__to__top";
 import Instagram from "./instagram";
 import WholeStyleOffer from "./whole__style__offer";
import APIProduct from "../../services/api-product";

function Main__page() {

  const [allProducts, setAllProducts] = useState([]);

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const allProductsAPI = new APIProduct('/products');
    const allCategoriesAPI = new APIProduct('/categories');

    allCategoriesAPI.getAll()
    .then(data => {
      console.log("vvvvvvvvvvvv")
      console.log(data)
      setAllCategories(data);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });

    allProductsAPI.getAll()
      .then(data => {
        console.log("gggggggg")
        console.log(data)
        setAllProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });


  }, []); 

  return (
    <>
      <TopSlideshow />
      <MultiTabsModule allCategories={allCategories} allProducts={allProducts}/>
      <ThreeImages />
      <PopularModule categoryId="1" typeProp={"visit"} allCategories={allCategories} allProducts={allProducts}/>
      <ParallexPic />
      <BackToTop />
      <WholeStyleOffer allProducts={allProducts} />
      <Instagram />
    </>
  );
}

export default Main__page;
