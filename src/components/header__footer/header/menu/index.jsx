import React, { Fragment, useContext, useEffect, useState } from "react"; 
import "./../../../../css/menu.css";
import { Link } from "react-router-dom";
import SignIn__login__box from "./../register/signin__login__box";
import menuSearchContext from "../../../contexts/menuSearchContext";
import all from "../../../../json/categories.json";
import APIProduct from "../../../../services/api-product";
import blurContext from "../../../contexts/blur";


function Menu() {
  const { menuSearchState, menuSearchDispatch } = useContext(menuSearchContext);
  const [allCategories, setAllCategories] = useState([]);
  const {blurState,blurDispatch}=useContext(blurContext)
  const [isVisible, setIsVisible] = useState(false);
const[showCategory,setShowCtegory]=useState(false)

  
  useEffect(() => {
    console.log("menuSearchState",menuSearchState.MobileMenu)
    if (menuSearchState.MobileMenu) {
      setIsVisible(true)
    }
    else  setIsVisible(false)
  }, [menuSearchState.MobileMenu]);


  useEffect(() => {
    const allCategoriesAPI = new APIProduct('/categories');
    allCategoriesAPI.getAll()
      .then(data => {
        setAllCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const background = (i1) => {
    if (i1.id === 1) return "background1";
    return "";
  };

  const menuContent=(cat)=>{


   if(cat.id==4){
    return(

    <ul className="subcategories-grid">
      <div className="sub-category-column">
          <span className="main__title">Shop by product</span>
        <ul>
          {allCategories
            .filter((c3) => c3.parentId === cat.id)
            .map((i3) => (
              <Link to={`/lastCategory/${i3.id}`} key={i3.id}>
                <li className="sub__title">{i3.description}</li>
              </Link>
            ))}
        </ul>
      </div>

      {/* Example of Additional Content (images, links, etc.) */}
      <div className="sub-category-column">
      <span className="main__title">Shop by Occasion</span>
      <ul class="occasion-list">

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-1-ocassion-wear.avif")}></img>
<span>Occasionwear
</span>
</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu1-party-wear.avif")}></img>
<span>Partywear
</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-1-basics.avif")}></img>
<span>Basics
</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-1-modest-fashion.avif")}></img>
<span>Modest fashion
</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-1-halloween.avif")}></img>
<span>Halloween</span>

</div>
</li>

</ul>

      </div>
      <div className="sub-category-column">
      <span className="main__title">Shop by Trending</span>
      <ul class="trending-list">

<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/menu1-coats.avif")}></img>
<span>Coats</span>
</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/menu-1-jeans.avif")}></img>
<span>Jeans</span>

</div>
</li>


<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/menu-1-skirt.avif")}></img>
<span>Skirts</span>

</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/sports.avif")}></img>
<span>Sports</span>

</div>
</li>



</ul>
      </div>
      <div className="sub-category-column">
      <img className="first__image"
src={require("./../../../../assets/banners/menu1-big-banner.avif")}
alt=""
/>
        <img
src={require("./../../../../assets/banners/menu-1-big-banner-2.avif")}
alt=""
/>



      </div>
    </ul>
    )
   }

   else if(cat.id==5){
    return(

    <ul className="subcategories-grid">
      <div className="sub-category-column">
          <span className="main__title">Shop by product</span>
        <ul>
          {allCategories
            .filter((c3) => c3.parentId === cat.id)
            .map((i3) => (
              <Link to={`/lastCategory/${i3.id}`} key={i3.id}>
                <li className="sub__title">{i3.title}</li>
              </Link>
            ))}
        </ul>
      </div>

      {/* Example of Additional Content (images, links, etc.) */}
      <div className="sub-category-column">
      <span className="main__title">Trending now</span>
      <ul class="occasion-list">

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-flural.avif")}></img>
<span>Floral dresses
</span>
</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-formal.avif")}></img>
<span>Formal Dresses
</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-wrap-dress.avif")}></img>
<span>Wrap Dresses
</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-blazer-dress.avif")}></img>
<span>Blazer Dresses
</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-jumper.avif")}></img>
<span>Jumper Dresses</span>

</div>
</li>

</ul>

      </div>
      <div className="sub-category-column">
      <span className="main__title">Shop by Color</span>
      <ul class="trending-list">

<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/black-tamara-dress-1_750x.jpg")}></img>
<span>Black </span>
</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-orange-dress.avif")}></img>
<span>Orange </span>

</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-blue-dress.avif")}></img>
<span>Blue </span>

</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-pink.avif")}></img>
<span>Pink </span>

</div>
</li>



</ul>
      </div>
      <div className="sub-category-column">
      <img className="only__image"
src={require("./../../../../assets/banners/dress-big-banner.avif")}
alt=""
/>
 



      </div>
    </ul>
    )
   }

  }

  return (
    <Fragment>
      <div className="lineMeu"></div>
      <div className={`mobile-menu ${isVisible ? "visible-mobile" : ""} ` }>
        <div className={showCategory?"category-container shift-left-category":"category-container"} >
      {allCategories
            .filter((c3) => c3.parentId === 1)
            .map((i3,index) => (
              <div className="one-mobile-category" onClick={()=>setShowCtegory(i3.id)}>
              <img class="rectangle-image" src={i3.categoryPicture}></img>
    <span>{i3.title}</span>
    <div className={showCategory==i3.id? "category-line active-line" : "category-line" } > </div>
              </div>
              
            ))}

          <div className="one-mobile-category" onClick={()=>setShowCtegory("Brands")}>
          <img class="rectangle-image" src={require("./../../../../assets/banners/mobile-menu-brands.avif")}></img>
<span>Brands</span>
<div className={showCategory=="Brands"? "category-line active-line" : "category-line" } > </div>
          </div>

        </div>
        <div 
          className={showCategory?"details-one-category shift-left-details":"details-one-category"}>
          <div className="header-category-title">
          <img  src={require("./../../../../assets/icons/arrow.png")} onClick={()=>setShowCtegory(false)}></img>

            <span>{allCategories.filter((c3) => c3.id == showCategory)[0]?.title}</span>
            </div>

          <div className="header-category">
            <span>Shop By Product</span>
            </div>
          <div className="mobile-menu-categories">

          {allCategories
            .filter((c3) => c3.parentId == showCategory)
            .map((i3,index,array) => (
              <Link style={{textDecoration:"none"}} to={`/lastCategory/${i3.id}`} key={i3.id}>
                <div className="sub__title">
                  <img src={i3.categoryPicture} alt="" className="category-pic" />
                  <span className="category-title">{i3.title}</span>
                  <div className={ index==array.length - 1 ? "":"border-bottom"}></div>
                  </div>
              </Link>
              
            ))}

          </div>
          <div className="header-category">
            <span>Shop By Trending</span>
            </div>
            <div className="mobile-menu-ocasions">

            {showCategory==4 && 
              <Fragment>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu1-coats.avif")}></img>
<span>Coats
</span>
</div>



<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/sports.avif")}></img>
<span>Sports
</span>

</div> 
</Fragment>
            }

{showCategory==5 && 
              <Fragment>
<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-pink.avif")}></img>
<span>Pink
</span>
</div>



<div class="image-container">
<img class="circle-image" src={require("./../../../../assets/banners/menu-2-orange-dress.avif")}></img>
<span>Orange
</span>

</div> 
</Fragment>
            }



            </div>
        </div>
      </div>


    <div className={blurState.blur ? 'main__menu blurred' : 'main__menu'}>
      <div className="container-special">


        <div className="menu1">
          <ul>
 
            {/* Show only subcategories of category with id 1 */}
            {allCategories
  .filter((c2) => c2.parentId === 1)
  .sort((a, b) => a.id - b.id) // Sort numerically by id
  .map((i2) => (
    <li key={i2.id} style={{ fontWeight: "500" }}>
      <Link to={`/lastCategory/${i2.id}`}>{i2.title}</Link>
      {menuContent(i2)}
    </li>
  ))}


                         {/* Add Brands and Sale options */}
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/sale">Sale</Link></li>

          </ul>
        </div>

        {/* {<Brand></Brand>} */}
      </div>
    </div>
    </Fragment>
  );
}

export default Menu;
