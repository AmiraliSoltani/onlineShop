import React, { useState, useRef, Fragment, useEffect, useContext } from 'react';
import "../../../css/mobile-box.css";
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import blurContext from '../../contexts/blur';
import { Link } from 'react-router-dom';

const MobileBox = (props) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtFirstSlide, setIsAtFirstSlide] = useState(true);
  const sliderRef = useRef(null); // Create a ref for the slider
  const totalSlides = 6; // Total number of slides
  const scrollLimit = 1; // Set your desired scroll limit
  const [isMobileFilter, setIsMobileFilter] = useState(false);
  const [isMobileSort, setIsMobileSort] = useState(false);
  const [isMobileBrand, setIsMobileBrand] = useState(false);
  const [isMobileColor, setIsMobileColor] = useState(false);
  const [isMobilePrice, setIsMobilePrice] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [isMobileCategries, setIsMobileCategories] = useState(false);
  const[showColorReset,setShowColorReset]=useState(false)
  const[showPriceReset,setShowPriceReset]=useState(false)
  const[showBrandReset,setShowBrandReset]=useState(false)
  const[showSizeReset,setShowSizeReset]=useState(false)
  const {blurState,blurDispatch}=useContext(blurContext)
  const [priceHeader,setPriceHeader]=useState(false)
  const [sizeHeader,setSizeHeader]=useState(false)
  const [colorHeader,setColorHeader]=useState(false)
  const [brandHeader,setBrandHeader]=useState(false)
  const [discountHeader,setDiscountHeader]=useState(false)
const [categoriesHeader,setCategoriesHeader]=useState(false)


  const { allBrands=[], selectedBrands=[], handelBrandClick } = props;
  
  let allCategoryIDS=props.allCategoryIDS
  let selectedCategoryIDS=props.selectedCategoryIDS
  console.log("selectedCategoryIDS",selectedCategoryIDS,"allCategoryIDS",allCategoryIDS)
  console.log("allCategoryIDS",allCategoryIDS)
  console.log("listofCategory",props.listofCategory)
  console.log("allcolors", props.allColors)

let finalPaginateProducts=props.finalPaginateProducts
  let listOfColors=props.listOfColors
  let allColors = props.getRangeOfColor();
  let listOfSizes=props.listOfSizes
  let allSizes=props.getRangeOfSize()
  let handelSizeClick=props.handelSizeClick
  let loading=props.loading;
  let getSelectedCategoryIdFromFilters=props.getSelectedCategoryIdFromFilters
  
  console.log("ALLL222222222222222",allColors,listOfColors)
  console.log("ALLL",allSizes,listOfSizes)
  
  console.log(allSizes,"allSizes")
  console.log(listOfSizes,"allSizes")

  const [accordionStates, setAccordionStates] = useState({});

  
  const [isOpen, setIsOpen] = useState(true);
  const toggleAccordionSize = () => setIsOpen(!isOpen);
  
  const getClassnameOfSize = (name) => {
    console.log("allssssssssssss", name,listOfSizes)
    let className = "check__box__image";
    if (listOfSizes[name] !== undefined) {
      if (listOfSizes[name] === true) {
        className += " visible";
      }
    }
    return className;
  };

  const getClassnameOfBrand = (brandName) => {
    console.log("selectedBrands",selectedBrands)
    let className = "check__box__image";
    if (selectedBrands.includes(brandName)) {
      className += " visible";
    }
    return className;
  };

 console.log("aaaaaaaaaa1111111",selectedCategoryIDS)
 console.log("aaaaaaaaaa2222222",allCategoryIDS)



  useEffect(() => {
    setShowColorReset(false)
    if(Object.keys(listOfColors).length === 0) setShowColorReset(false)
    else{
      Object.values(listOfColors).forEach((value) => {
        if(value)  setShowColorReset(true)
      });
  }
  }, [listOfColors]);

  const getClassnameOfColor = (name) => {
    console.log("listOfColors22",listOfColors)
    let className = "check__box__image";
    if (listOfColors[name] !== undefined) {
      if (listOfColors[name] === true) {
        className += " visible";
      }
    }
    return className;
  };


  const getClassnameOfCategoryBox =(categoryId)=>{
    console.log("category_visible1 ,",categoryId)

    let className = "check__box__image";
    if (selectedCategoryIDS.includes(categoryId)) {
      console.log("category_visible")
      className += " visible";
    }
    return className;
  }
  


  const toggleAccordion = (specKey) => {
    setAccordionStates((prevState) => ({
      ...prevState,
      [specKey]: !prevState[specKey],
    }));
  };
  
  


  useEffect(() => {
    console.log("props.listOfSizes",props.listOfSizes)
    setShowSizeReset(false)
    if(Object.keys(props.listOfSizes).length === 0) setShowSizeReset(false)
    else{
      Object.values(props.listOfSizes).forEach((value) => {
        if(value) {
            setShowSizeReset(true)
        }
      });
  }
  }, [props.listOfSizes]);

  useEffect(() => {
    setShowBrandReset(false)
    if(props.selectedBrands.length>0) {
      setShowBrandReset(true)
      }
  }, [props.selectedBrands]);

  useEffect(() => {
    setShowPriceReset(false)
    props.RangePriceClassName.map(range=>{
      if(range.status) setShowPriceReset(true)
    })

  }, [props.RangePriceClassName]);

  useEffect(() => {
    // Perform componentDidUpdate logic here
    getCategory();
    getChildren();
  }, [props.optionalFilters]);

  const getCategoryFirst = (categoryId) => {
    let { allCategories } = props;
    let result = allCategories.filter((c) => c.id == categoryId);
    let category = result[0];
    console.log("category",category)
    return category.title;
  };

  const getChildren = () => {
    let { allCategories, categoryId } = props;
    let children = allCategories.filter((c) => c.parentId == categoryId);
    return children;
  };

  const getRangeOfPrice = (number, first, second, index) => {
    console.log("ddddddd",number, first, second, index)
    let { filterdBySearchWord, searchWords, finalBeforePagination, RangePriceClassName,products } = props;
console.log("RangePriceClassName",RangePriceClassName)

    let final = [];
    if (searchWords.length === 0) {
      final = products;
    } else if (searchWords.length > 0) {
       
      final = products.filter(
        (m) =>
          m.title.toLowerCase().includes(searchWords.toLowerCase()) ||
          m.title_En.toLowerCase().includes(searchWords.toLowerCase())
      );
        // const searchSpliteWords = searchWords.toLowerCase().split(" ").filter(Boolean); // Split the search input into words
      
        // final = products.filter(product => {
        //   // Filter based on title or title_En
        //   const lowerTitleEn = product.title_En.toLowerCase();
        //   const descriptionWords = lowerTitleEn.split(" ").filter(Boolean); // Split product title_En into words
      
        //   // Check if every word in the search matches words in the product title
        //   const matches = searchSpliteWords.every(qWord => {
        //     return descriptionWords.some(descWord => descWord.startsWith(qWord));
        //   });
      
        //   return matches; // If all words match, include the product in the filtered results
        // });
      
      
    }
    let prices = [];
    final.map((p) => {
        p.off? prices.push((parseInt(p.price) * (100 - parseInt(p.off)) / 100)): prices.push(p.price);
      });
      
    let range = prices.filter((p) => p <= second && p >= first);
    if (range.length > 0) {
      return true;
    } else if (RangePriceClassName[index].status) {
      return true;
    } else {
      return false;
    }
  };

  const getClassnameOfBox = (status) => {
    let className = "check__box__image";
    if (status) {
      className += " visible";
    }
    return className;
  };

  const getClassnameOfStockandDiscount = (status) => {
    console.log("status",status)
    let className = "move__box";
    if (status) {
      className += " bg-orange left2px";
    }
    return className;
  };

  const getClassnameOfAccordian = (name) => {
    let className = "title__icon";
    let { accordian, initialAccordion } = props;
    if (initialAccordion[name] === true) {
      initialAccordion[name] = false;
      className = "title__icon";
    } else if (accordian[name]) {
      if (accordian[name] === true) {
        className += " close__accordian";
      }
    }
    return className;
  };

  
  const getClassnameOfallAttribiutes = (name) => {
    let { allAttributesSelected } = props;
    let className = "check__box__image";
    if (allAttributesSelected[name] === true) {
      className += " visible";
    }
    return className;
  };

  const getCategory = () => {
    let { allCategories, products, originalSearch } = props;
    let child = [];
    let parent = [];
    products = products.filter(
      (m) =>
        m.title.toLowerCase().includes(originalSearch.toLowerCase()) ||
        m.title_En.toLowerCase().includes(originalSearch.toLowerCase())
    );
    allCategories.filter((c) => {
      for (let index = 0; index < products.length; index++) {
        if (c.id === products[index].categoryId) {
          child.push(c);
          parent.push(getParent(c));
        }
      }
    });
    child = [...new Set(child)];
    parent = [...new Set(parent)];
    return { parent, child };
  };

  const getParent = (category) => {
    let parentId = category.parentId;
    let { allCategories } = props;
    let parent = allCategories.filter((c) => c.id === parentId);
    return parent[0];
  };

  const getchildrene = (parent) => {
    let { allCategories } = props;
    let allchildrene = allCategories.filter((c) => c.parentId === parent.id);
    let child = getCategory().child;
    let childrene = allchildrene.filter((value) => child.includes(value));
    return childrene;
  };


  var settings3 = {
    ltr: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const settings2 = {
    ltr: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    onSwipe: () => handleSlideScroll(), // Detect user swipe
    afterChange: (index) => handleSlideChange(index), // Detect slide index
    beforeChange: (current, next) => {
      // Prevent scrolling if the next index exceeds the allowed limit
      if (next >= scrollLimit) {
        // Move back to the last allowed slide if out of bounds
        sliderRef.current.slickGoTo(scrollLimit - 1);
        return false; // Prevent changing to the next slide
      }
    },
  };

  const handleSlideScroll = () => {
    setIsScrolling(true); // Set scrolling state to true when user swipes
  };

  const handleSlideChange = (index) => {
    if (index === 0) {
      setIsAtFirstSlide(true); // User is at the first slide
      setIsScrolling(false); // Stop the shrinking when at first slide
    } else {
      setIsAtFirstSlide(false); // User is no longer at the first slide
    }
  };

  const closemMobileFilter=()=>{
    props.setIsBlurProducts(false)
    setIsMobileFilter(false);
setIsMobileSize(false)
setIsMobileSort(false)
setIsMobileBrand(false)
setIsMobileColor(false)
setIsMobilePrice(false)
setIsMobileCategories(false)

  }
  const openSort=()=>{
    props.setIsBlurProducts(true)
    setIsMobileFilter(true);
    setIsMobileSort(true)
    setIsMobileSize(false)
setIsMobileBrand(false)
setIsMobileColor(false)
setIsMobilePrice(false)
setIsMobileCategories(false)

  }

  const openSize=()=>{
    props.setIsBlurProducts(true)
    setIsMobileFilter(true);
    setIsMobileSize(true)
setIsMobileSort(false)
setIsMobileBrand(false)
setIsMobileColor(false)
setIsMobilePrice(false)
setIsMobileCategories(false)

  }

  const openBrand=()=>{
    props.setIsBlurProducts(true)
    setIsMobileFilter(true);
    setIsMobileBrand(true)
    setIsMobileSize(false)
setIsMobileSort(false)
setIsMobileColor(false)
setIsMobilePrice(false)
setIsMobileCategories(false)
  }

  const openColor=()=>{
    props.setIsBlurProducts(true)

    setIsMobileFilter(true);
    setIsMobileColor(true)
    setIsMobileSize(false)
setIsMobileSort(false)
setIsMobileBrand(false)
setIsMobilePrice(false)
setIsMobileCategories(false)
  }

  const openPrice=()=>{
    props.setIsBlurProducts(true)
    setIsMobileFilter(true);
    setIsMobilePrice(true)
    setIsMobileSize(false)
setIsMobileSort(false)
setIsMobileBrand(false)
setIsMobileColor(false)
setIsMobileCategories(false)
  }

  const openCategories=()=>{
    props.setIsBlurProducts(true)
    setIsMobileFilter(true);
    setIsMobileCategories(true)
    setIsMobileSize(false)
setIsMobileSort(false)
setIsMobileBrand(false)
setIsMobileColor(false)
setIsMobilePrice(false)
  }

  const orders = [
    { name: "Most Expensive", path: "price", sort: "desc" },
    { name: "Cheapest", path: "price", sort: "asc" },
    { name: "Newest", path: "_id", sort: "desc" },
    { name: "Most Popular", path: "popularity", sort: "desc" },
    { name: "Best Selling", path: "sold", sort: "desc" },
    { name: "Most Viewed", path: "visited", sort: "desc" },
  ];

  const getClassName = (order, index) => {
    let { Sort } = props;
    // let className = `number${index}`;
    // if (Sort.path === order.path && Sort.order === order.sort)
    //   className += " bg-orange c-white";
    // return className;

    let className = "check__box__image";
    if (Sort.path === order.path && Sort.order === order.sort) className += " visible";
    return className;
  };


  const {
    searchWords,
    handleValue,
    RangePriceClassName,
    handleFilterOfPrice,
    handleStock,
    stock,
    discount,
    handleDiscount,
    handleColor,
    handleAccordian,
    handleAllAttributes,
    getRangeOfColor,
    getAllAttributes,
    handleAllClick,
    handelAllAttributesClick,
    handelPriceClick,
    resetPrice,
    handelClickInStock,
    handelClickDiscount,
    handelColorClick,
    PresentURL,
    allCategories,
    categoryId,
    originalSearch,
    filters,
    handelClickOrder
  } = props;

  return (
    <Fragment>
                     <div className={`account-menu ${isMobileFilter ? "visible-account" : ""} ` }>
       {isMobileSort && <Fragment>

        <div className="header-filter-new">
        <span>Sort</span> {/* Title */}
             <img src={require("../../../assets/icons/close.png")} alt="" className="close"
              onClick={closemMobileFilter} />
       
             </div>

             <div className="main-part">
{/* 
             {orders.map((order, index) => (
            <span
              className={getClassName(order, index)}
              onClick={() => handelClickOrder(order)}
              key={index}
            >
              {order.name}
            </span>

          ))} */}

{orders.map((order, index) => (
    <Fragment key={index}>
      <li onClick={() => handelClickOrder(order)}>
        <div className="check__box">
          <div className="main__check__box">
            <img
              className={getClassName(order,index)}
              src={require("./../../../assets/icons/tick-gray.png")}
              alt="Selected"
            />
          </div>
        </div>
        {/* Render the size description */}
        <span> {order.name}</span>
      </li>
    </Fragment>
  ))}
</div>

             <div className="footer-button">      
                   <Button className="button-submit" variant="primary" onClick={closemMobileFilter}  >See the products </Button>
                   <Button className="button-reset" variant="primary" onClick={() => handelClickOrder(orders[5])} >
                     Reset
                   </Button>
                   </div> 
        
 </Fragment>}


 {isMobileSize && <Fragment>


    <div className="header-filter-new ">
        <span>Size</span> {/* Title */}
             <img src={require("../../../assets/icons/close.png")} alt="" className="close"
              onClick={closemMobileFilter} />
       
             </div>

<div className="main-part">
{allSizes.map((size, index) => (
    <Fragment key={index}>
      <li onClick={() => handelSizeClick(size)}>
        <div className="check__box">
          <div className="main__check__box">
            <img
              className={getClassnameOfSize(size.description)}
              src={require("./../../../assets/icons/tick-gray.png")}
              alt="Selected"
            />
          </div>
        </div>
        {/* Render the size description */}
        <span>{size.description}</span>
      </li>
    </Fragment>
  ))}

</div>


  <div className="footer-button">      
        <Button className="button-submit" variant="primary" onClick={closemMobileFilter}  >See the products </Button>
        <Button className="button-reset" variant="primary" onClick={()=>handelSizeClick(-1)}>
          Reset
        </Button>
        </div> 

</Fragment>}


{isMobilePrice && <Fragment>

    <div className="header-filter-new " >
        <span>Price Range</span> {/* Title */}
             <img src={require("../../../assets/icons/close.png")} alt="" className="close"
              onClick={closemMobileFilter} />
             </div>

<div className="main-part">
{RangePriceClassName.map((range, index) => (
            <Fragment key={index}>
              {getRangeOfPrice(
                range.name,
                range.firtRange,
                range.secondRange,
                index
              ) && (
                <li onClick={() => handelPriceClick(index)}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={getClassnameOfBox(
                          RangePriceClassName[index].status
                        )}
                        src={require("./../../../assets/icons/tick_g.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  {index === 0 && (
                    <span>{`Below ${range.secondRange}$ `}</span>
                  )}
                  {index === RangePriceClassName.length - 1 && (
                    <span>{`Above ${range.firtRange}$ `}</span>
                  )}
                  {index >= 1 && index <= 4 && (
                    <span>
                      {`Between ${range.firtRange}$ and ${range.secondRange + 1}$`}
                    </span>
                  )}
                </li>
              )}
            </Fragment>
          ))}

</div>


  <div className="footer-button">      
        <Button className="button-submit" variant="primary" onClick={closemMobileFilter}  >See the products </Button>
        <Button className="button-reset" variant="primary" onClick={()=>handelPriceClick(-1)}>
          Reset
        </Button>
        </div> 
 
</Fragment>}


{isMobileColor && <Fragment>

    <div className="header-filter-new">
        <span>Color</span> {/* Title */}
             <img src={require("../../../assets/icons/close.png")} alt="" className="close"
              onClick={closemMobileFilter} />
       
             </div>

<div className="main-part">
    <div className="filter-color">
{allColors.map((c, index) => (
              <li key={index} onClick={() => handelColorClick(c)}>
                <div className="check__box__color">
                  <div className={`main__check__box_filter bg-${c.class}`}>
                      <span>{c.class}</span>
                    <img
                      className={getClassnameOfColor(c.class)}
                      src={require("./../../../assets/icons/tick-gray.png")}
                      alt="Selected"
                      />
                  </div>
                </div>
              </li>
            ))}
            </div>
</div>


  <div className="footer-button">      
        <Button className="button-submit" variant="primary" onClick={closemMobileFilter}  >See the products </Button>
        <Button className="button-reset" variant="primary" onClick={()=>handelColorClick(-1)}>
          Reset
        </Button>
        </div> 

</Fragment>}





{isMobileBrand && <Fragment>

    <div className="header-filter-new ">
        <span>Brand</span> {/* Title */}
             <img src={require("../../../assets/icons/close.png")} alt="" className="close"
              onClick={closemMobileFilter} />
       
             </div>

<div className="main-part">
{allBrands.map((brand, index) => (
                <Fragment key={index}>
                  <li onClick={() => handelBrandClick(brand)}>
                    <div className="check__box">
                      <div className="main__check__box">
                        <img
                          className={getClassnameOfBrand(brand)}
                          src={require("./../../../assets/icons/tick-gray.png")}
                          alt="Selected"
                        />
                      </div>
                    </div>
                    {/* Render the brand name */}
                    <span>{brand}</span>
                  </li>
                </Fragment>
              ))}
</div>


  <div className="footer-button">      
        <Button className="button-submit" variant="primary" onClick={closemMobileFilter}  >See the products </Button>
        <Button className="button-reset" variant="primary" onClick={()=>handelBrandClick(-1)} >
          Reset
        </Button>
        </div> 

</Fragment>}





           </div>
      

           <div className="slider-container-category5">
        <Slider  {...settings3}>
      
        {allCategories
            .filter((c3) => c3.parentId == categoryId)
            .map((i3,index,array) => (
              <Link style={{textDecoration:"none"}} to={`/lastCategory/${i3.id}`} key={i3.id}>
                <div className="sub__title">
                  <img src={i3.categoryPicture} alt="" className="category-pic" />
                  <span className="category-title">{i3.title}</span>
                  <div className={ index==array.length - 1 ? "":"border-bottom"}></div>
                  </div>
              </Link>
              
            ))}
        </Slider>
      </div>


    <div className={`mobile_box ${isScrolling && !isAtFirstSlide ? 'is-scrolling' : ''}`}> 
      <div className="sort " onClick={openSort}>
        <img src={require("./../../../assets/icons/sort.png")} alt="sort" />
        <span>Sort</span>
      </div>

      {/* <div className="filter bg-blue" onClick={openSort}>
        <img src={require("./../../../assets/icons/filter-mobile-2.png")} alt="filter" />
        <span>Filter</span>
      </div> */}

      <div className="slider-container">
        <Slider ref={sliderRef} {...settings2}>
          {/* <div className='one-filter'>
            <span className={categoriesHeader? "br-orange bg-orange" : "br-grey" } onClick={openCategories}><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Categories</span>
          </div> */}
          <div className='one-filter'>
            <span  className={discount? "br-orange bg-orange" : "br-grey" }  onClick={handelClickDiscount} >   Only Discounted</span>
          </div>
          <div className='one-filter'>
            <span className={showPriceReset? "br-orange bg-orange" : "br-grey" } onClick={openPrice}><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Price Range</span>
          </div>
          <div className='one-filter'>
            <span  className={showColorReset? "br-orange bg-orange" : "br-grey" } onClick={openColor}><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Color</span>
          </div>
          <div className='one-filter'>
            <span  className={showSizeReset? "br-orange bg-orange " : "br-grey" } onClick={openSize}><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Size</span>
          </div>
          <div className='one-filter'>
            <span className={showBrandReset? "br-orange bg-orange " : "br-grey" } onClick={openBrand}><img src={require("./../../../assets/icons/down.png")} alt="sort" /> Brand</span>
          </div>
        </Slider>
      </div>
      
    </div>
  
    </Fragment>
  );
};

export default MobileBox;

