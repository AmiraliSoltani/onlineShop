import React, { useState, useEffect, Fragment } from "react";
import "./../../../css/right__filters__search.css";
import { getcolors, getAttributes } from "../../common/functionsOfProducts";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import CustomAccordion from "../accordian";
import ContentLoader from "react-content-loader";

const ProductLoaderPrice = () => {
  console.log("price");
  return (
    <div className="filter__content">
      {[...Array(4)].map((_, rowIndex) => (
        <div key={rowIndex} className="loader-row">
          <ContentLoader
            key={rowIndex}
            width={200}
            height={45}
            backgroundColor="#f0f0f0"
            foregroundColor="#ecebeb"
            className="loader-box"
          >
                {/* Square checkbox */}
                <rect x="0" y="0" rx="5" ry="5" width="22" height="22" />
            {/* Rectangle next to checkbox */}
            <rect x="40" y="5" rx="5" ry="5" width="150" height="20" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};





function FilterMenu(props) {
  const [initialAccordion, setInitialAccordion] = useState({});
  const navigate = useNavigate();
  const [isOpenBrand, setIsOpenBrand] = useState(true);
  const toggleAccordionBrand = () => setIsOpenBrand(!isOpenBrand);
  const[showPriceReset,setShowPriceReset]=useState(false)
  const[showBrandReset,setShowBrandReset]=useState(false)
  const[showSizeReset,setShowSizeReset]=useState(false)



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
  
  console.log("ALLL",allColors,listOfColors)
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
        if(value)  setShowSizeReset(true)
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

  const getClassnameOfColor = (name) => {
    //let { listOfColors } = props;
    let className = "check__box__image";
    if (listOfColors[name] !== undefined) {
      if (listOfColors[name] === true) {
        className += " visible";
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
    categoryId,
    originalSearch,
    filters
  } = props;
  let stringfilter
  if(!filters) stringfilter=""
  else stringfilter=filters;

    console.log("ffffff",RangePriceClassName)
  let others = [];
  others = getAllAttributes();

return (
  <div className="right__search__filters">


    {/* next filter */}
    <div className="filter__2__categories">
      <div className="filter__title">
        <span>Your search results for:  
</span>
      </div>

<div className="search__word striped-background">
<img
          className="icon__search"
          src={require("./../../../assets/icons/search-3.png")}
          alt=""
        />
<span> {searchWords}
</span>

</div>

      {/* <div className="filter__content">
        <input
          value={searchWords}
          onChange={handleValue}
          type="text"
          placeholder=""
          className="search__input form-control"
        />
        <img
          className="icon__search"
          src={require("./../../../assets/icons/search-3.png")}
          alt=""
        />
      </div> */}
    </div>


    {/* next filter */}
    { allCategoryIDS.length>0 &&
    <div className="filter__10__categories">
      <div className="filter__title">
        <span>Categories</span>
        <span className="reset" onClick={()=>props.toggleCategoryInUrl(-1)}>Reset</span>

      </div>

      {loading ? (
        <ProductLoaderPrice /> // Show skeleton loader if loading
      ) : (

      <div className="filter__content">
        <ul>
          {allCategoryIDS.map((categoryId, index) => (
            <Fragment key={index}>
             
                <li onClick={() => props.toggleCategoryInUrl(categoryId)}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={getClassnameOfCategoryBox(categoryId)}
                        src={require("./../../../assets/icons/tick.png")}
                        alt=""
                      />
                    </div>
                  </div>
                 <span>{getCategoryFirst(categoryId)} </span>
                
                </li>
              
            </Fragment>
          ))}
        </ul>
      </div>
)}

    </div>
}












    
    {/* {categoryId === 0 && (
      <div className="filter__1__categories">
        <div className="filter__title">
          <span>Found Categories</span>
        </div>
        <div className="filter__content">
          {getCategory() && (
            <Fragment>
              {getCategory().parent.map((parent) => (
                <ul>
                  <Link
                    to={`/lastCategory/${parent.id}/${filters}`}
                  >
                    <li>
                      <div className="check__box">
                        <div className="main__check__box">
                          <img
                            className="check__box__image visible"
                            src={require("./../../../assets/icons/tick.png")}
                            alt=""
                          />
                        </div>
                      </div>
                      <img
                        className="arrow"
                        src={require("./../../../assets/icons/play.png")}
                        alt=""
                      />
                      <span>{parent.title}</span>
                    </li>
                  </Link>

                  {getChildren(parent).map((child) => (
                    <Link
                      to={`/last__category/${child.id}/${PresentURL.stringFilter}`}
                    >
                      <li className="last__category">
                        <div className="check__box">
                          <div className="main__check__box">
                            <img
                              className="check__box__image"
                              src={require("./../../../assets/icons/tick.png")}
                              alt=""
                            />
                          </div>
                        </div>
                        <img
                          className="arrow last__category__icon"
                          src={require("./../../../assets/icons/play.png")}
                          alt=""
                        />
                        <span>{child.title}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              ))}
            </Fragment>
          )}
        </div>
      </div>
    )} */}




    



 {/* next filter */}
 <div className="filter__4__categories">
      <div className="filter__title">
        <span>Limit Search</span>
      </div>
      <div className="filter__content">
        <div onClick={handelClickInStock} className="whole__filter__1">
            <span>Only available items</span>
          <div className="main__box">
            <div
              className={getClassnameOfStockandDiscount(stock)}
            ></div>
          </div>
        </div>
        <div onClick={handelClickDiscount} className="whole__filter__1">
            <span>Only discounted items</span>
          <div className="main__box">
            <div
              className={getClassnameOfStockandDiscount(discount)}
            ></div>
          </div>
        </div>
      </div>
    </div>


    {/* next filter */}
   
    <div className="filter__3__categories">
      <div className="filter__title">
        <span>Price Range</span>
         {showPriceReset && <span className="reset" onClick={()=>handelPriceClick(-1)}>Reset</span>}
      </div>

      <div className="filter__content">
        <ul>
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
        </ul>
      </div>


    </div>

   

    {/* next filter
    <div className="filter__5__categories">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="filter__title">
              <img
                className={getClassnameOfAccordian("color")}
                src={require("./../../../assets/icons/play2.png")}
                alt=""
              />
              <span>Color</span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="filter__content">
              <ul>
                {getRangeOfColor().map((c, index) => (
                  <li onClick={() => handelColorClick(c)} key={index}>
                    <div className="check__box__color">
                      <div className={`main__check__box ${c.class}`}>
                        <img
                          className={getClassnameOfColor(c.class)}
                          src={require("./../../../assets/icons/tick-gray.png")}
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div> */}

{allColors.length>0 &&
      <CustomAccordion colors={allColors} handelColorClick={handelColorClick} listOfColors={listOfColors}/>
}

      {allSizes.length>0 &&
      <div className="accordion__container__size">
      <div className="filter__title" >
        <img
          className={`title__icon ${isOpen ? "open__accordion" : "close__accordian"}`}
          src={require("./../../../assets/icons/play2.png")}
          alt="Toggle"
          onClick={toggleAccordionSize }
        />
        <span onClick={toggleAccordionSize }>Size</span>
        {showSizeReset && <span className="reset2" onClick={()=>handelSizeClick(-1)}>Reset</span>}

      </div>
      {isOpen && (
        <div className="filter__content">
 <ul>
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
</ul>

        </div>
      )}
    </div>

}

{allBrands.length>0&&

    <div className="accordion__container__brand">
        <div className="filter__title" >
          <img
            className={`title__icon ${isOpenBrand ? "open__accordion" : "close__accordian"}`}
            src={require("./../../../assets/icons/play2.png")}
            alt="Toggle"
            onClick={toggleAccordionBrand}
          />
          <span onClick={toggleAccordionBrand}>Brand</span>
          {showBrandReset && <span className="reset2" onClick={()=>handelBrandClick(-1)}>Reset</span>}

        </div>
        {isOpenBrand && (
          <div className="filter__content">
            <ul>
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
            </ul>
          </div>
        )}
      </div>
}






        {/* next__filter */}
        {/* {categoryId !== 0 &&
          others.map((Attribut, index) => (
            <Fragment>
              {Attribut[0].length > 0 && (
                <div className="filter__6__categories ">
                  <Accordion>
                    <Accordion.Toggle eventKey="0">
                      <div
                        className="filter__title"
                        onClick={() => {
                          handleAccordian(Attribut[1].name);
                        }}
                      >
                        <img
                          className={getClassnameOfAccordian(
                            Attribut[1].name
                          )}
                          src={require("./../../../assets/icons/play2.png")}
                          alt=""
                        />
                        <span>{Attribut[1].name}</span>
                      </div>
                    </Accordion.Toggle>

                    <Accordion.Collapse
                      eventKey="0"
                      // className={this.checkFilter(Attribut[1].name)}
                    >
                      <div className="filter__content">
                        <ul>
                          {Attribut[0].map((item) => (
                            <li
                              onClick={() =>
                                handelAllAttributesClick(
                                  Attribut[1].name,
                                  index,
                                  Attribut[1].id,
                                  item.title,
                                  item
                                )
                              }
                            >
                              <div className="check__box">
                                <div className="main__check__box">
                                  <img
                                    className={getClassnameOfallAttribiutes(
                                      item.title
                                    )}
                                    src={require("./../../../assets/icons/tick_g.png")}
                                    alt=""
                                  />
                                </div>
                              </div>

                              <span>{item.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              )}
            </Fragment>
          ))} */}


          
      </div>
    );
  }

export default FilterMenu;

