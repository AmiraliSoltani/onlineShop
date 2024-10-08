import React, { useEffect, useState } from "react";
import "./../../css/category.css";
import PopularModule from "../main__page/popular__module";
import Instagram from "../main__page/instagram";
import { Link,useParams } from "react-router-dom";
import allC from "../../json/categories.json"
import APIProduct from "../../services/api-product";

const Category = () => {
  const { categoryId } = useParams();
  // const  allCategories  = allC.data;
  // const category = allCategories.filter((c) => c.id == categoryId)[0];
  // const sub = allCategories.filter((c) => c.parentId == categoryId);
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [sub, setSub] = useState([]);

  useEffect(() => {
    const allCategoriesAPI = new APIProduct('/categories');

    allCategoriesAPI.getAll()
      .then(data => {
        setAllCategories(data);
        setCategory(data.find(c => c.id == categoryId))
        setSub(data.filter(c => c.parentId === categoryId))
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <>
      {category &&
        <div className="container">
          <div className="slide__and__menu">
            <div className="right__menu">
              <div className="title">
                <span className="partOne"> تمام دسته بندی های</span>
                &nbsp;
                <span>{` ${category.title}`}</span>
              </div>
              <div className="content__menu">
                {sub.map((c) => (
                  <Link key={c.id} to={`/last__category/${c.id}`} style={{ width: "100%" }}>
                    <div className="one">
                      <img src={c.iconPic} alt="" />
                      <div className="title__content">{c.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="left__slide">
              <img
                className="pic1"
                src={require("./../../assets/banners/6.jpg")}
                alt=""
              />
              {sub.length >= 8 && (
                <img
                  className={`pic2`}
                  src={require("./../../assets/banners/h5.jpg")}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      }
  
      <PopularModule categoryId={categoryId} typeProp={"visit"}></PopularModule>
  
      <div className="container">
        <div className="three__images2">
          <img
            className="one"
            src={require("./../../assets/banners/h1.jpg")}
            alt=""
          />
          <img
            className="two"
            src={require("./../../assets/banners/h2.jpg")}
            alt=""
          />
          <img
            className="three"
            src={require("./../../assets/banners/h3.jpg")}
            alt=""
          />
        </div>
      </div>
  
      <PopularModule categoryId={categoryId} typeProp={"sold"}></PopularModule>
      <Instagram></Instagram>
    </>
  );
    }
  export default Category;