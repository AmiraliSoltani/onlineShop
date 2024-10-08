import React, { useContext, useEffect, useState } from "react"; 
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
<img class="circle-image" src="https://images.asos-media.com/navigation/ww_uk_summer_white_dress_2805_sb_3m?$n_240w$" alt="Image description" />
<span>Label</span>
</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

</ul>

      </div>
      <div className="sub-category-column">
      <span className="main__title">Shop by Trending</span>
      <ul class="trending-list">

<li>
<div class="image-container2">
<img class="circle-image" src="https://images.asos-media.com/navigation/ww_uk_summer_white_dress_2805_sb_3m?$n_240w$" alt="Image description" />
<span>Label</span>
</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>



</ul>
      </div>
      <div className="sub-category-column">
      <img className="first__image"
src={require("./../../../../assets/banners/h85.jpg")}
alt=""
/>
        <img
src={require("./../../../../assets/banners/h85.jpg")}
alt=""
/>



      </div>
    </ul>
    )
   }

   else if(cat.id==30){
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
      <span className="main__title">Shop by Occasion</span>
<ul class="occasion-list">

<li>
<div class="image-container">
<img class="circle-image" src="https://images.asos-media.com/navigation/ww_uk_summer_white_dress_2805_sb_3m?$n_240w$" alt="Image description" />
<span>Label</span>
</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

</ul>

      </div>
      <div className="sub-category-column">
      <span className="main__title">Shop by Trending</span>
      <ul class="trending-list">

<li>
<div class="image-container2">
<img class="circle-image" src="https://images.asos-media.com/navigation/ww_uk_summer_white_dress_2805_sb_3m?$n_240w$" alt="Image description" />
<span>Label</span>
</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>

<li>
<div class="image-container2">
<img class="circle-image" src="path/to/image.jpg" alt="Image description"></img>
<span>Label</span>

</div>
</li>



</ul>
      </div>
      <div className="sub-category-column">
      <img className="first__image"
src={require("./../../../../assets/banners/h85.jpg")}
alt=""
/>
        <img
src={require("./../../../../assets/banners/h85.jpg")}
alt=""
/>



      </div>
    </ul>
    )
   }
  }

  return (
    <div className={blurState.blur ? 'main__menu blurred' : 'main__menu'}>
      <div className="container">
        <div className="mobile__menu">
          <img
            src={require("./../../../../assets/icons/menu-2.png")}
            onClick={() => { menuSearchDispatch({ type: "toggleMenu" }) }}
            alt=""
          />
          <SignIn__login__box />
        </div>
        <div className="menu1">
          <ul>
 
            {/* Show only subcategories of category with id 1 */}
            {allCategories
              .filter((c2) => c2.parentId === 1)
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
  );
}

export default Menu;
