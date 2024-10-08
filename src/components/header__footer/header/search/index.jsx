import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import "./../../../../css/serach.css";
import { Link, useNavigate } from "react-router-dom";
import menuSearchContext from '../../../contexts/menuSearchContext';
import APIProduct from '../../../../services/api-product';
import blurContext from '../../../contexts/blur';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import cardContext from '../../../contexts/cardContext';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Search() {
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track the selected suggestion
  const { cardState, cardDispatch } = useContext(cardContext);

  const {blurState,blurDispatch}=useContext(blurContext)
  const { menuSearchState, menuSearchDispatch } = useContext(menuSearchContext);
  const [searchInput, setSearchInput] = useState("");
  const [className, setClassName] = useState('dropdown__search');
  const [inputClassName, setInputClassName] = useState('form-control mt-3 mb-3');

  const [filtered, setFiltered] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
const [searchOptions,setSearchOptions]=useState([])
const [allbrands,setAllBrands]=useState([])
const [categoriesSuggestions,setCategoriesSuggestions]=useState([])
const [brandSuggestions,setBrandSuggestions]=useState([])
const [productsSuggestions,setProductsSuggestions]=useState([])
const[trendingSearches,setTrendingSearches]=useState([])
const[lastSearches,setlastSearches]=useState([])
const dropdownRef = useRef(null); // Reference to dropdown for click outside detection

console.log("searchhhhhhhhhhh",cardState.lastSearches)
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeSearch();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [dropdownRef]);


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const settings2 = {
  ltr: true,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  //slidesToShow: 4,
  variableWidth: true, // Allow slides to adjust to their content width
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};



  const navigate = useNavigate();

  useEffect(() => {
    getTopSearches()
  }, []);
  
  console.log("SSSSSSSSSSSSSSSSSSSSS",cardState.lastSearches)
   async function postSearchTerm(fullSearchObject) {
    console.log("fullSearchObject",fullSearchObject)
    try {
      const response = await axios.post("https://backend-online-shop-flame.vercel.app/search", fullSearchObject);
  
      if (response.status === 200) {
        console.log("Search object tracked successfully:", response.data);
      }
    } catch (error) {
      console.error("Error posting search object:", error);
    }
  }
  
  

  // Function to get the top searches from the backend
   async function getTopSearches() {
    try {
      const response = await axios.get("https://backend-online-shop-flame.vercel.app/search");
  
      if (response.status === 200) {
        console.log("Top search objects:", response.data);
        console.log("geeeeeeeeeeeeeeeeeeeeeeeeeeee",response.data)
        setTrendingSearches(response.data)
        return response.data; // Return the full search objects
      }
    } catch (error) {
      console.error("Error fetching top search objects:", error);
      return [];
    }
  }
  

const deleteAllLastSearches=()=>{
  setlastSearches([])
  cardDispatch({ type: "deleteAllLastSearches" });

}

const handleTrendOrLastClick=(fullSearchObject)=>{
  console.log("fullSearchObject",fullSearchObject.path)
  closeSearch()
  setSelectedIndex(-1)
  postSearchTerm(fullSearchObject)
  cardDispatch({ type: "addLastSearches", payload: fullSearchObject });

  navigate(fullSearchObject.path, {
    state: { refresh: true }, // Pass state along with the navigation
  });
}
const handleClickProduct = (suggest) => {
    closeSearch()
    setSelectedIndex(-1)
    suggest.path=`/search/category=${suggest.categoryID}&search=${suggest.mainWord}`
    suggest.term=suggest.mainWord
    cardDispatch({ type: "addLastSearches", payload: suggest });


    postSearchTerm(suggest)
    navigate(`/search/category=${suggest.categoryID}&search=${suggest.mainWord}`, {
      state: { refresh: true }, // Pass state along with the navigation
    });
  };

  const handleClickBrand = (suggest) => {
    console.log("suggestbrand",suggest)
    closeSearch()
    suggest.path=`/lastCategory/${suggest.categoryID}/brand=${suggest.brandName}`
    suggest.term=suggest.mainWord
    cardDispatch({ type: "addLastSearches", payload: suggest });
    postSearchTerm(suggest)
    setSelectedIndex(-1)
    navigate(`/lastCategory/${suggest.categoryID}/brand=${suggest.brandName}`, {
      state: { refresh: true }, // Pass state along with the navigation
    });
  };


  const handleClickCategpries = (suggest) => {
    closeSearch()
    setSelectedIndex(-1)
    suggest.path=`/lastCategory/${suggest.categoryID}`
    suggest.term=suggest.mainWord
    console.log("suggestbrand22",suggest)
    cardDispatch({ type: "addLastSearches", payload: suggest });

    postSearchTerm(suggest)
    navigate(`/lastCategory/${suggest.categoryID}`, {
      state: { refresh: true }, // Pass state along with the navigation
    });
  };

  const handleClick = () => {
    if (searchInput.length > 0) {
      let categories = [];
      allProducts.map((product) => {
        if (product.title_En.toLowerCase().includes(searchInput.toLowerCase())) categories.push(product.categoryId);
      });
      categories = [...new Set(categories)];
      const allCategoriesString = categories.join('_');
      let suggest = { path: `/search/category=${allCategoriesString}&search=${searchInput}`, term: searchInput, mainWord: searchInput };
      cardDispatch({ type: "addLastSearches", payload: suggest });
      postSearchTerm(suggest);
      closeSearch();
      setSelectedIndex(-1);
      setSearchInput(""); // Clear the input after the search
      navigate(`/search/category=${allCategoriesString}&search=${searchInput}`, {
        state: { refresh: true }, // Pass state along with the navigation
      });
  
      document.activeElement.blur(); // Unfocus the input after the search
    }
  };
  






  const createSearchOptions=()=>{
    let results=[]
allCategories.map(category=>{
  //console.log("result category" , category)
  let one = {}
  if(category.search[0]) one.mainWord=category.search[0][0]

  one.categoryID=category.id
  one.description=category.description
if(one.mainWord)results.push(one)
 
})

console.log("result", results)

let brands=[]
allProducts.forEach(product => {
if(product.Brand){
  const existingBrand = brands.find(brand => brand.name === product.Brand);
  if (existingBrand) {
    // Only push categoryID if it doesn't already exist
    if (!existingBrand.categoryIDs.includes(product.categoryID)) {
      existingBrand.categoryIDs.push(product.categoryId);
    }
  } else {
    
    // Create a new brand object
    brands.push({
      name: product.Brand,
      categoryIDs: [product.categoryId],
      combinations:[]
    });
  }
}
console.log("result3", brands)

results.forEach(result => {
  brands.forEach(brand => {
    brand.categoryIDs.forEach(id => {
      if (id === result.categoryID) {
        const newCombo = { combo: brand.name + " " + result.description, categoryID: id, description: result.description , brandName: brand.name , mainWord:brand.name + " " + result.mainWord};

        // Check if the combination already exists
        const exists = brand.combinations.some(combo => 
          combo.combo === newCombo.combo && combo.categoryID === newCombo.categoryID
        );

        // If it doesn't exist, add the new combination
        if (!exists) {
          brand.combinations.push(newCombo);
        }
      }
    });
  });
});


});
console.log("result2", brands)
setAllBrands(brands)
setSearchOptions(results)
  }

  useEffect(()=>{
    createSearchOptions();
  },[allProducts])


  useEffect(() => {
    const allProductsAPI = new APIProduct('/products');
    allProductsAPI.getAll()
      .then(data => {
        setAllProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

      const allCategoriesAPI = new APIProduct('/categories');
      allCategoriesAPI.getAll()
        .then(data => {
          setAllCategories(data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
  }, []);





 

const checkProducts = (input, words) => {
  let finalResult = [];
  console.log("result55 hi", allProducts, allCategories);

  allProducts.forEach(product => {
    // Filter the combinations for each brand
    const lowerDescription = product.title_En.toLowerCase();
    
    // Split the description into words
    const descriptionWords = lowerDescription.split(" "); // Split description into words

    // To hold the index range of matching words
    let matchIndices = [];

    // Filter the description based on the query words
    const matches = words.every(qWord => {
      const index = descriptionWords.findIndex(descWord => descWord.startsWith(qWord));
      if (index !== -1) {
        matchIndices.push(index);
        return true;
      }
      return false;
    });

    if (matches && matchIndices.length > 0) {
      // Find the range of words to extract
      const startIndex = Math.min(...matchIndices);
      const endIndex = Math.max(...matchIndices);
      
      // Collect words between the first and last match (including in-between words)
      const matchedWords = descriptionWords.slice(startIndex, endIndex + 1).join(" ");
      
      // Get the category
      let category = allCategories.find(category => category.id == product.categoryId);
      console.log("result55 category ", category);
      
      // Construct the result with the matched words
      let temp = {
        categoryID: product.categoryId,
        description: category.description,
        mainWord: matchedWords // The words that matched from the description
      };
      
      const isDuplicate = finalResult.some(result =>
        result.categoryID === temp.categoryID && // Category ID must be the same
        result.description === temp.description && // Description must be the same
        result.mainWord === temp.mainWord // Main word must be the same
      );
      
      // Add to finalResult only if it is not a duplicate
      if (!isDuplicate) {
        finalResult.push(temp);
        console.log("result56", finalResult);
      }
    }
  });
  setProductsSuggestions(finalResult);
};


function getSuggestions(input) {
  setCategoriesSuggestions([]);
    setBrandSuggestions([])
    setProductsSuggestions([])
  let finalResult = []
  const lowerInput = input.toLowerCase();
  const words = lowerInput.split(" ").filter(word => word.length > 0); // Split input into words and remove empty entries
  let lists = [];
console.log("result5",words)
  if (lowerInput.length < 2) {
    setCategoriesSuggestions([]);
    setBrandSuggestions([])
    setProductsSuggestions([])
     // Clear suggestions if input is less than 2 characters
  } else {
    allbrands.forEach(brand => {
      const brandName = brand.name.toLowerCase();

      // Check if every word in the input exists somewhere in the brand name
      if (words.some(word => word.length > 2 && brandName.includes(word))) {
        lists.push(brand); // Add brand to the list if any word with length > 3 matches
      }
      
    });
    console.log("result5",lists)


    if (lists.length > 0) {
    
      lists.forEach(brand => {
        // Filter the combinations for each brand
        const filteredCombinations = brand.combinations.filter(item => {
          const lowerItem = item.combo.toLowerCase(); // Assuming 'item' is a string or a property of combination
          const itemWords = lowerItem.split(" "); // Split item into words
    
          // Check if each query word matches any word in the item words
          return words.every(qWord => {
            return itemWords.some(itemWord => itemWord.startsWith(qWord));
          });
        });
    
        // Accumulate the filtered combinations into finalResult
        finalResult = finalResult.concat(filteredCombinations);
      });
    
      console.log("result577 finalResult", finalResult);
    
      // Set suggestions to the filtered finalResult, not lists
      if(finalResult.length==0) checkProducts(lowerInput,words)
      else setBrandSuggestions(finalResult);
    }
    


    else if (lists.length==0) {
      lists = searchOptions;
      console.log("result52", lists);

      lists.forEach(list => {
        // Convert description to lowercase
        const lowerDescription = list.description.toLowerCase();
        
        // Split the description into words
        const descriptionWords = lowerDescription.split(" "); // Split description into words
        
        // Filter the description based on the query words
        const matches = words.every(qWord => {
          return descriptionWords.some(descWord => descWord.startsWith(qWord));
        });
      
        if (matches) {
          // If the description matches the query, add it to finalResult
          finalResult.push(list);
        }
      });
      
      
      // Set the suggestions to the filtered finalResult
      
      console.log("result57 finalResult", finalResult);

      if(finalResult.length==0) checkProducts(lowerInput,words)
      else setCategoriesSuggestions(finalResult);
    }


    // ; // Declare a variable to hold the result

    // finalResult = lists.filter(item => {
    //   const lowerItem = item.toLowerCase();
    //   const itemWords = lowerItem.split(" "); // Split item into words
  
    //   // Check if each query word matches any word in the item words
    //   return words.every(qWord => {
    //     return itemWords.some(itemWord => itemWord.startsWith(qWord)); // Ch
    //     });
    //   });

    
  }
}

  
  
  
  const handleValue = (e) => {
    setSearchInput(e.currentTarget.value);
    getSuggestions(e.currentTarget.value)
  };


  const handleKey = (e) => {
    const allSuggestions = [...categoriesSuggestions, ...brandSuggestions, ...productsSuggestions]; // Combine all suggestions
  
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < allSuggestions.length - 1 ? prevIndex + 1 : 0 // Loop back to the first suggestion
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : allSuggestions.length - 1 // Loop back to the last suggestion
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selectedSuggestion = allSuggestions[selectedIndex];
      if (selectedSuggestion && productsSuggestions.length > 0) {
        handleClickProduct(selectedSuggestion);
      } else if (selectedSuggestion && brandSuggestions.length > 0) {
        handleClickBrand(selectedSuggestion);
      } else if (selectedSuggestion && categoriesSuggestions.length > 0) {
        handleClickCategpries(selectedSuggestion);
      }
      closeSearch();
      setSearchInput(""); // Clear the input after selecting an option
      document.activeElement.blur(); // Unfocus the input after selection
    } else if (e.key === "Enter") {
      handleClick();
      closeSearch();
      //setSearchInput(""); // Clear the input after pressing Enter
      document.activeElement.blur(); // Unfocus the input after pressing Enter
    }
  };
  
  // const handleKey = (e) => {
  //   const allSuggestions = [...categoriesSuggestions, ...brandSuggestions, ...productsSuggestions]; // Combine all suggestions
  // console.log("allSuggestions",allSuggestions)
  //   if (e.key === "ArrowDown") {
  //     // Move down the list
  //     setSelectedIndex((prevIndex) =>
  //       prevIndex < allSuggestions.length - 1 ? prevIndex + 1 : 0 // Loop back to the first suggestion
  //     );
  //   } else if (e.key === "ArrowUp") {
  //     // Move up the list
  //     setSelectedIndex((prevIndex) =>
  //       prevIndex > 0 ? prevIndex - 1 : allSuggestions.length - 1 // Loop back to the last suggestion
  //     );
  //   } else if (e.key === "Enter" && selectedIndex >= 0) {
  //     console.log("suggest",selectedIndex,"alls",allSuggestions)
  //     // If Enter is pressed and an item is selected, trigger navigation
  //     const selectedSuggestion = allSuggestions[selectedIndex];
  //     if (selectedSuggestion && productsSuggestions.length>0) {
  //       handleClickProduct(selectedSuggestion);
  //     }
  //     else if (selectedSuggestion && brandSuggestions.length>0) {
  //       handleClickBrand(selectedSuggestion);
  //     }

  //     else if (selectedSuggestion && categoriesSuggestions.length>0) {
  //       handleClickCategpries(selectedSuggestion);
  //     }
  //   }
  //   else if(e.key === "Enter"){
  //     handleClick()
  //   }
  // };
  
  // const handleKey = (e) => {
  //   if (e.keyCode === 13) {
  //     menuSearchDispatch({ type: "toggleSearch" });
  //     navigate(`/last__category/0/search=${searchInput}`);
  //   }
  // };

  const openSearch = () => {
    // Ensure the dropdown is visible
    setInputClassName("form-control mt-3 mb-3 focus")
    setClassName("dropdown__search visible");
    blurDispatch({ type: "activeBlur" });
  };
  
  const closeSearch = () => {
    // Close the dropdown
    setInputClassName("form-control mt-3 mb-3")
    blurDispatch({ type: "disactiveBlur" });
    setClassName('dropdown__search');
    setSelectedIndex(-1); // Reset selected index
  };
  

  return (
    <div className="search__box"  ref={dropdownRef}>
      <input
        type="text"
        name="searchBox"
        placeholder="Search for anything..."
        value={searchInput}
        onChange={handleValue} // Handle value changes
        onFocus={openSearch} // Open dropdown on focus
        //onBlur={closeSearch} // Close dropdown after slight delay
        onKeyDown={handleKey} // Handle enter key
        className={inputClassName}
      />
  
        <button onClick={()=>handleClick()} className="btn lets__go">
          Let's go
        </button>
      
      <div className={className}>
    
          <div className="dropdown__search__main">
            <div className="dropdown__search__header">
              <div className="line">
              </div>
            </div>
            {(searchInput.length>2 && brandSuggestions.length==0 && categoriesSuggestions.length==0 && productsSuggestions.length==0 ) &&
            <Fragment>
                <div className="no-result ">
                  <img src={require("./../../../../assets/icons/decline.png")} alt="" className="icons" />
                  <span className='main-word'>No matching products found</span>
                </div>
                <div className="line">
                </div>
                </Fragment>
           }


{((searchInput.length === 0 && cardState.lastSearches.length > 0) || 
  (searchInput.length > 2 && brandSuggestions.length === 0 && categoriesSuggestions.length === 0 && productsSuggestions.length === 0 && cardState.lastSearches.length > 0)) && 
  <Fragment>

            <div className="dropdown__search__history">
              <div className="history">
                <div className="history-icons">
              <div className="left2">
            <img
                        src={require("./../../../../assets/icons/return.png")}
                        alt=""
                      />
                      <span>Your Last Searches</span>
                      </div>

                      <img
                      onClick={()=>deleteAllLastSearches()}
                        src={require("./../../../../assets/icons/trash-2.png")}
                        alt=""
                      />
                      </div>
                      <div className="history-trend-search">
                      <Slider {...settings2}>
                      {cardState.lastSearches.map(fullSearchObject=>{
                        return(
                          <span onClick={()=> handleTrendOrLastClick(fullSearchObject)} className='text striped-background-search2'>{fullSearchObject.mainWord}</span>

                        )
                      })}  
                                  </Slider>
      
</div>
                      </div>
            </div>

            <div className="line"> 
            </div>
            </Fragment>
                      }

{(searchInput.length === 0 || 
  (searchInput.length > 2 && brandSuggestions.length === 0 && categoriesSuggestions.length === 0 && productsSuggestions.length === 0)) && 
  <Fragment>



            <div className="dropdown__search__history">
              <div className="history">
                <div className="history-icons">
              <div className="left2">
            <img
                        src={require("./../../../../assets/icons/trending.png")}
                        alt=""
                      />
                      <span>Trending Searches</span>
                      </div>
                      </div>
                      <div className="history-trend-search">
                      <Slider {...settings2}>
                      {trendingSearches?.map(trend=>{
                        return(
                          <span onClick={()=>handleTrendOrLastClick(trend.fullSearchObject)} className='text striped-background-search2'>{trend.fullSearchObject.term}</span>

                        )
                      })}
                      </Slider>
                      </div>


                      </div>
            </div>
            </Fragment>
}
<div className="suggestions-container">

            {categoriesSuggestions.length>0 && categoriesSuggestions.map((suggest,index) => (
              <Fragment>
                <div onClick={()=>handleClickCategpries(suggest)}
                    className={`dropdown__search__body striped-background-search ${selectedIndex === (index) ? 'selected' : ''}`} // Apply the selected class based on selectedIndex
                    style={{ cursor: "pointer" }}
                    key={index}
                >
                  <div className="left-search">
                  <img src={require("./../../../../assets/icons/search-5.png")} alt="" className="icons" />
                  <span className='main-word'>{suggest.mainWord}</span>
                  </div>
                  <span className='categories'>In {suggest.description}</span>

                </div>
                {categoriesSuggestions[categoriesSuggestions.length - 1] !== suggest && <hr />}
                </Fragment>
            ))}


{productsSuggestions.length > 0 && productsSuggestions.map((suggest, index) => (
  <Fragment>
  <div 
    key={index}
    onClick={() => handleClickProduct(suggest)}
    className={`dropdown__search__body striped-background-search ${selectedIndex === (index) ? 'selected' : ''}`} // Apply the selected class based on selectedIndex
    style={{ cursor: "pointer" }}
  >
    <div className="left-search">
      <img src={require("./../../../../assets/icons/search-5.png")} alt="" className="icons" />
      <span className="main-word">{suggest.mainWord}</span>
    </div>
    <span className="categories">In {suggest.description}</span>
    {/* Add hr only if it's not the last suggestion */}
  </div>
  {productsSuggestions[productsSuggestions.length - 1] !== suggest && <hr />}
  </Fragment>

))}


{brandSuggestions.length>0 && brandSuggestions.map((suggest,index) => (
  <Fragment>
                <div onClick={()=> handleClickBrand(suggest)} 
                  className={`dropdown__search__body striped-background-search ${selectedIndex === (index) ? 'selected' : ''}`} // Apply the selected class based on selectedIndex
                  style={{ cursor: "pointer" }}
                  key={index}

                  >
                  <div className="left-search">
                  <img src={require("./../../../../assets/icons/search-5.png")} alt="" className="icons" />
                  <span className='main-word'>{suggest.mainWord}</span>
                  </div>
                  <span className='categories'>In {suggest.description}</span>

                </div>
                {brandSuggestions[brandSuggestions.length - 1] !== suggest && <hr />}
            </Fragment>
            ))}

            </div>


          </div>
        
      </div>
    </div>
  );
}

export default Search;



