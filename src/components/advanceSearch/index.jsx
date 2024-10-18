













import React, { useState, useEffect, useReducer, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getcolors, getAttributes, checkForStock,getSize } from "../common/functionsOfProducts";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import orderBy from "lodash/orderBy";
import allA from "../../json/attributeItem.json"
import FirstBox from "./top__first__box";
import SecondBox from "./top__second__box";
import Pagination from "./pagination__box";
import WholeProduct from "./WholeProduct";
import FilterMenu from "./FilterMenu";
import "../../css/last_category.css"
import APIProduct from "../../services/api-product";
import blurContext from "../contexts/blur";
import MobileBox from "./mobile-box";

function LastCategory(props) {
  const[finishHandlingURL,setFinishHandlingURL]=useState(false)
  const [filteredByBrand, setFilteredByBrand] = useState([]);
const [selectedBrands, setSelectedBrands] = useState([]);
const location = useLocation();

  const[finalPaginateProducts,setFinalPaginateProducts]=useState([])
  const[finalBeforePagination,setFinalBeforePagination]=useState([])
  const[products,setProducts]=useState([])
  const [allProducts,setAllProducts]=useState([])
  const [allCategories,setAllCategories]=useState([])
  const [allAttributeItems,setAllAttributeItemS]=useState([])
  const [searchWordMenu, setSearchWordMenu] = useState("");
  const [originalSearch,setOriginalSearch]=useState("")
  const [RangePriceClassName, setRangePriceClassName] = useState([
    { name: "first", status: false, firtRange: 1, secondRange: 99 },
    { name: "second", status: false, firtRange: 100, secondRange: 149 },
    { name: "third", status: false, firtRange: 150, secondRange: 199 },
    { name: "forth", status: false, firtRange: 200, secondRange: 249 },
    { name: "fifth", status: false, firtRange: 250, secondRange: 299 },
    { name: "sixth", status: false, firtRange: 300, secondRange: 2000 },
  ]);
  const [filterdByPrice, setFilterdByPrice] = useState([]);
  const [filterdBySearchWord, setFilterdBySearchWord] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);  // Track if filters have been applied
  const[loading,setLoading]=useState(true)

  const [stock, setStock] = useState(false);
  //const [filtered,setFiltered]=useState("")
  const [filteredByStock, setFilteredByStock] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [filteredByDiscount, setFilteredByDiscount] = useState([]);
  const [colors, setColors] = useState([]);
  const [initialColors, setInitialColors] = useState([]);
  const [listOfColors, setListOfColors] = useState({});
  const [filteredByColor, setFilteredByColor] = useState([]);
  const [allAttributesSelected, setAllAttributesSelected] = useState({});
  const [specificSelectedItems, setSpecificSelectedItems] = useState([]);
  const [filteredByDiffferentsAttributes, setFilteredByDiffferentsAttributes] = useState([]);
  const [indexHolder, setIndexHolder] = useState([]);
  const [initialAccordion,setInitialAccordion]=useState({})
  const [sort, setSort] = useState({ path: "visited", order: "desc" });
  const [PresentURL, setPresentURL] = useState({ id: "", stringFilter: "" });
  const [allParentsId, setAllParentsId] = useState([]);
  const [searchByWorld, setSearchByWorld] = useState(false);
  const [sizes, setSizes] = useState([]);
const [listOfSizes, setListOfSizes] = useState({});
const [filteredBySize, setFilteredBySize] = useState([]);
const [allCategoryIDS,setAllCategoryIDS]=useState([])
const [selectedCategoryIDS,setSelectedCategoryIDS]=useState([])
const[allTestColors,setAllTestColors]=useState([])
const[initalFilters,setInitialFilters]=useState("")
  const [notFound, setNotFound] = useState({
    filteredByStock: { status: false },
    filteredByDiscount: { status: false },
  });
  const [accordian, setAccordian] = useState({});
  const [categoryData, setCategoryData] = useState({
    categoryId: 0,
    allCategories: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const {categoryId,filters} = useParams();
  //setInitialFilters(filters)
  console.log("alllllllllll filter",filters)
  const navigate = useNavigate();
  const {blurState,blurDispatch}=useContext(blurContext)

  const getSelectedCategoryIdFromFilters = (filters) => {

    if (!filters) return null;
    const params = filters.split('&');
  
    // Look for 'category' in the filters string
    const categoryParam = params.find(param => param.startsWith('category='));
  console.log("categoryParam",categoryParam)
    // Extract categoryId if present
    setSelectedCategoryIDS(categoryParam ? categoryParam.split('=')[1].split('_').map(Number) : [])
    getProductsOneCategory(categoryParam ? categoryParam.split('=')[1].split('_').map(Number) : []);

    console.log("allcategories???????",(categoryParam ? categoryParam.split('=')[1].split('_').map(Number) : []))
    return categoryParam ? categoryParam.split('=')[1].split('_').map(Number) : null;
  };

  // useEffect(() => {
  //   console.log("kalakkkkkkkkkkkkkk")
  //   setFinishHandlingURL(false); // Reset finishHandlingURL when categoryId changes
  //   resetAndRecalculateFilters()

  // }, [categoryId]);

  useEffect(() => {
    handelSearch(searchWordMenu)
  }, [products]);




  useEffect(() => {
  //setInitialFilters(filters)
    console.log("alllllllllllllllllll","first")
    getSelectedCategoryIdFromFilters()

    const allProductsAPI = new APIProduct('/products');
    const allCategoriesAPI = new APIProduct('/categories');

    allCategoriesAPI.getAll()
      .then(data => {
        setAllCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    allProductsAPI.getAll()
      .then(data => {
        setAllProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 117); // Scroll to the top when the component mounts
  }, [location.pathname]);

//   useEffect(() => {
//     console.log("all", "second");

//     // Check if filters from URL have been applied, if not, proceed with fetching products by category
//     if (allProducts.length > 0 && allCategories.length > 0 && !finishHandlingURL) {
//         getProductsOneCategory(parseInt(categoryId));
//     }
// }, [categoryId, allProducts, allCategories, finishHandlingURL]); 

console.log("      finishHandlingURL",finishHandlingURL)

useEffect(() => {

  console.log("location",location)
  const { refresh } = location.state || {} // Ensure `state` exists
  if(refresh){
    console.log("location allllllllllllllllhiiiiiiiiiiiii2222222222222222")

    resetAndRecalculateFilters()
   setIsFilterApplied(false)
 
   
      // Reset filters, products, and pagination
      setFilteredBySize([]);          // Reset size filter
      setFilteredByColor([]);         // Reset color filter
      setFilteredByDiscount([]);      // Reset discount filter
      setFilteredByStock([]);         // Reset stock filter
      setFilterdByPrice([]);          // Reset price filter
      setSort({ path: "visited", order: "desc" }); // Reset sorting to default
      setProducts(allProducts);       // Reset products to original unfiltered list
      setFinalPaginateProducts([]);   // Reset paginated product list
      setSearchWordMenu("");          // Clear the search word filter
      setIsFilterApplied(false);      // Reset the filter applied flag
      setPagination({ currentPage: 1, pageSize: 12 }); // Reset pagination
  }

}, [filters]);

useEffect(() => {
  console.log("allllllllll", "second");

  // Check if filters from URL have been applied, if not, proceed with fetching products by category
  if (allProducts.length > 0 && allCategories.length > 0 && !finishHandlingURL) {
    console.log("allllllllllwowwwwwwwwwww", "second");

    console.log("selectedCategoryIDS5",selectedCategoryIDS)
      getProductsOneCategory(selectedCategoryIDS);
      setFinishHandlingURL(true); 
      setLoading(false);


  }
}, [categoryId, allProducts, allCategories, finishHandlingURL,selectedCategoryIDS,filters]);

  useEffect(() => {
    console.log("allllllll","third")

    if (products.length > 0 && !isFilterApplied) {
      // Only apply filters if they haven't been applied yet
      console.log("allllllllllwowwwwwww", "third");

      ImportInitialURL();
      setIsFilterApplied(true);  // Mark filters as applied
    }
  }, [products, isFilterApplied]);  // Now dependent on `isFilterApplied`


  // setTimeout(() => {
  //   setIsFilterApplied(false);  // Mark filters as applied

  // }, 3000);


  useEffect(() => {
    console.log("allllllllll","forth")

    paginate();
  }, [
    filteredByDiscount, 
    filteredByStock, 
    filterdByPrice, 
    filteredByColor, 
    filterdBySearchWord, 
    categoryId, 
    sort, 
    products, 
    pagination
  ]);

  const handleNavigateToCategory = (categoryId) => {
    resetAndRecalculateFilters()
    setFinishHandlingURL(false); // Reset finishHandlingURL to false
    navigate(`/lastCategory/${categoryId}`); // Navigate to the new category
  };



const resetAll=()=>{
    setFilterdBySearchWord([]);      // Reset search word filters
    setFilteredByStock([]);          // Reset stock filters
    setFilteredByDiscount([]);       // Reset discount filters
    setFilterdByPrice([]);           // Reset price filters
    setFilteredByColor([]);          // Reset color filters
    setFilteredBySize([]);           // Reset size filters
    setFilteredByBrand([]);          // Reset brand filters
    setAllAttributesSelected({});    // Clear attribute filters
    setSpecificSelectedItems([]);    // Clear selected attribute items
    setListOfColors({});             // Clear selected colors
    setListOfSizes({});              // Clear selected sizes
    setSelectedBrands([]);           // Clear selected brands
    setStock(false);                 // Reset stock filter
    setDiscount(false);              // Reset discount filter
    setRangePriceClassName([         // Reset price ranges to initial state
      { name: "first", status: false, firtRange: 1, secondRange: 99 },
      { name: "second", status: false, firtRange: 100, secondRange: 149 },
      { name: "third", status: false, firtRange: 150, secondRange: 199 },
      { name: "forth", status: false, firtRange: 200, secondRange: 249 },
      { name: "fifth", status: false, firtRange: 250, secondRange: 299 },
      { name: "sixth", status: false, firtRange: 300, secondRange: 2000 },
    ]);
  
    resetPaginate();                 // Reset pagination to the first page


}



  const resetAllFilters = () => {
    setSearchWordMenu("");           // Clear search input
    setFilterdBySearchWord([]);      // Reset search word filters
    setFilteredByStock([]);          // Reset stock filters
    setFilteredByDiscount([]);       // Reset discount filters
    setFilterdByPrice([]);           // Reset price filters
    setFilteredByColor([]);          // Reset color filters
    setFilteredBySize([]);           // Reset size filters
    setFilteredByBrand([]);          // Reset brand filters
    setAllAttributesSelected({});    // Clear attribute filters
    setSpecificSelectedItems([]);    // Clear selected attribute items
    setListOfColors({});             // Clear selected colors
    setListOfSizes({});              // Clear selected sizes
    setSelectedBrands([]);           // Clear selected brands
    setStock(false);                 // Reset stock filter
    setDiscount(false);              // Reset discount filter
    setRangePriceClassName([         // Reset price ranges to initial state
      { name: "first", status: false, firtRange: 1, secondRange: 99 },
      { name: "second", status: false, firtRange: 100, secondRange: 149 },
      { name: "third", status: false, firtRange: 150, secondRange: 199 },
      { name: "forth", status: false, firtRange: 200, secondRange: 249 },
      { name: "fifth", status: false, firtRange: 250, secondRange: 299 },
      { name: "sixth", status: false, firtRange: 300, secondRange: 2000 },
    ]);
  
    resetPaginate();                 // Reset pagination to the first page
  };

  
  const resetAndRecalculateFilters = (serchW) => {
    // Reset all filters
    resetAllFilters();
  
    // Recalculate options after resetting filters
    const uniqueBrands = getUniqueBrands();     // Recalculate brands
    setFilteredByBrand(uniqueBrands);           // Update filtered brands
  
    const availableColors = getRangeOfColor();  // Recalculate colors
    //setListOfColors(availableColors);           // Update color list
  
    const availableSizes = getRangeOfSize();    // Recalculate sizes
    //setListOfSizes(availableSizes);             // Update size list
  
    const availableAttributes = getAllAttributes(); // Recalculate attributes
    setAllAttributesSelected(availableAttributes);  // Update attribute filters
  
    resetPaginate();  // Reset pagination
    //navigate(`/search/search=${serchW}`);

  };

  const toggleCategoryInUrl = (categoryId) => {
    console.log("ssssssssss22",searchWordMenu)
    resetAll()    // Get the current filters string or use an empty string if it doesn't exist
    let stringFilter = filters || "";
  
    // Extract category IDs from the current state
    let currentCategories = selectedCategoryIDS.slice(); // Use slice to avoid mutating the original array
  
    // Check if the categoryId is already in the list
    const isCategoryPresent = currentCategories.includes(categoryId);
  
    if ((isCategoryPresent && currentCategories.length==1) || categoryId==-1 ) {
      // If the category is already present, remove it
      // currentCategories = currentCategories.filter(id => id !== categoryId);
      currentCategories=[]
      setSelectedCategoryIDS(currentCategories);
  
      // Remove products from the products list that belong to the removed category
      //const updatedProducts = products.filter(product => product.categoryId !== categoryId);
      
      // Update state
      console.log("currentCategories",currentCategories)
      setProducts(allProducts);

    } 
    
    else if(isCategoryPresent){
         // If the category is already present, remove it
         currentCategories = currentCategories.filter(id => id !== categoryId);
  
         // Remove products from the products list that belong to the removed category
         const updatedProducts = products.filter(product => product.categoryId !== categoryId);
         
         // Update state
         setProducts(updatedProducts);
         setSelectedCategoryIDS(currentCategories);
    }
    
    else {

      if(currentCategories.length==0){
        currentCategories.push(categoryId);
        setSelectedCategoryIDS(currentCategories);
        const newCategoryProducts = allProducts.filter(product => product.categoryId === categoryId);
        setProducts(newCategoryProducts);

      }
      else{

        // If the category is not present, add it
        currentCategories.push(categoryId);
        setSelectedCategoryIDS(currentCategories);
    
        // Add products from the new category, avoiding duplicates
        console.log("productfilter," ,"products",products)
        const newCategoryProducts = allProducts.filter(product => product.categoryId === categoryId);
        console.log("productfilter," ,"newCategoryProducts",newCategoryProducts)
        const updatedProducts = [
          ...products,
          ...newCategoryProducts
        ];
        
        
        console.log("productfilter," ,"updatedProducts",updatedProducts)

        // Update state
        setProducts(updatedProducts);
      }
    }
  console.log("ssssssssss22",currentCategories)
    // // Build the new category filter part of the URL
    // let newCategoryFilter = currentCategories.length > 0 
    //   ? `category=${currentCategories.join("_")}`
    //   : ""; // If no categories are selected, remove the category filter
  
    // // Update other filters from the current string, keeping them intact
    // let otherFilters = stringFilter.split("&").filter(param => !param.startsWith("category="));
  
    // // Rebuild the final filter string, combining the updated category filter with other filters
    // let finalFilterString = [
    //   newCategoryFilter,
    //   ...otherFilters
    // ].filter(f => f).join("&"); // Remove empty strings and join with "&"
  
    //setIsFilterApplied(false);
    if(currentCategories.length>0){
    const arrayToString = (arr) => {
      return arr.length > 1 ? arr.join('_') : arr[0].toString();
    };
    let stringCategories = arrayToString(currentCategories)
    // Navigate to the updated URL with new filters
    navigate(`/search/category=${stringCategories}&search=${searchWordMenu}`);
  }
  else navigate(`/search/search=${searchWordMenu}`);
  };
  
  const resetPrice =()=>{
    setRangePriceClassName([         // Reset price ranges to initial state
      { name: "first", status: false, firtRange: 1, secondRange: 99 },
      { name: "second", status: false, firtRange: 100, secondRange: 149 },
      { name: "third", status: false, firtRange: 150, secondRange: 199 },
      { name: "forth", status: false, firtRange: 200, secondRange: 249 },
      { name: "fifth", status: false, firtRange: 250, secondRange: 299 },
      { name: "sixth", status: false, firtRange: 300, secondRange: 2000 },
    ])
  }
  const getUniqueBrands = () => {
    let filteredProducts = products;
  
    if (searchWordMenu.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchWordMenu.toLowerCase()) ||
        product.title_En.toLowerCase().includes(searchWordMenu.toLowerCase())
      );
    }
  
    const uniqueBrands = [...new Set(filteredProducts
      .map((product) => product.Brand)
      .filter((brand) => brand !== undefined && brand !== null && brand !== '')
    )];
  
    return uniqueBrands;
  };
  
  
  function findingChildren(id, categories) {
    let childIDs = [];
    let allChildIDs = [];
    let mainCat = categories.filter((c) => c.id === id);
    let IDs = [];
    IDs.push(...mainCat);
    allChildIDs.push(...mainCat);
    while (IDs.length > 0) {
      categories.map((c) => {
        for (let index = 0; index < IDs.length; index++) {
          if (c.parentId === IDs[index].id) childIDs.push(c);
        }
      });
      allChildIDs.push(...childIDs);
      IDs = childIDs;
      childIDs = [];
    }
  
    let allIDs = [];
    allChildIDs.map((c) => allIDs.push(c.id));
    return allIDs;
  }

  // const getProductsOneCategory=( id) =>{
  //   setAllAttributeItemS(allA.data);
  //   const IDs = findingChildren(id, allCategories);
  //   const categoryProducts = [];
  //   IDs.map((oneId) => {
  //     const filteredProducts = allProducts.filter(
  //       (P) => P.categoryId === oneId
  //     );
  //     categoryProducts.push(...filteredProducts);
  //   });
  //   console.log("newwwwwwwww",categoryProducts)
  //   setProducts([...new Set(categoryProducts)])
  //   return [...new Set(categoryProducts)]
  // }

 
const getProductsOneCategory = (categoryIds) => {
  console.log("categoryIds3",categoryIds)
  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {

    console.log("hoooo")
    // If no category ID is present, show all products
    setProducts(allProducts);
    return;
  }

  setAllAttributeItemS(allA.data);
  let allCategoryProducts = [];

  // Loop over each category ID to find child categories and products
  categoryIds.forEach(id => {
    const IDs = findingChildren(id, allCategories);
    const categoryProducts = [];

    IDs.forEach(oneId => {
      const filteredProducts = allProducts.filter((P) => P.categoryId === oneId);
      categoryProducts.push(...filteredProducts);
    });

    allCategoryProducts.push(...categoryProducts);
  });

  if (allCategoryProducts.length === 0) {
    console.log("No products found for these categories");
    setProducts([]); // If no products are found, show an empty array
  } else {
    const uniqueProducts = [...new Set(allCategoryProducts)];
    console.log("Filtered products for categories:", uniqueProducts);
    console.log("uniqueProducts",uniqueProducts)
    setProducts(uniqueProducts);
  }
};

//   const getProductsOneCategory = (id) => {
//     setAllAttributeItemS(allA.data);
//     const IDs = findingChildren(id, allCategories);
//     const categoryProducts = [];
//     IDs.forEach((oneId) => {
//       const filteredProducts = allProducts.filter(
//         (P) => P.categoryId === oneId
//       );
//       categoryProducts.push(...filteredProducts);
//     });

//     // If no products are found, display a message instead of all products
//     if (categoryProducts.length === 0) {
//       console.log("No products found for this category");
//       setProducts([]);
//       setFinalPaginateProducts([])
//       //setLoading(false)
//       return [];
//     } else {
//       console.log("newwwwwwwww", categoryProducts);
//       setProducts([...new Set(categoryProducts)]);
//       return [...new Set(categoryProducts)];
//     }
// };


  
const ImportInitialURL = () => {
  getSelectedCategoryIdFromFilters(filters)
  console.log("wowwww", products,filters);
  if (filters) {
    let filtersArray = filters.split("&");
    filtersArray.map((filter) => {


      if (filter.slice(0, 5) === "order") {
        const order = filter.slice(6, filter.length).split("_");
        setSort({ path: order[0], order: order[1] });
      }
      if (filter.slice(0, 5) === "range") {
        const price = filter.slice(6, filter.length).split("_");
        price.map((p) => {
          if (p !== "") {
            setTimeout(() => {
              handleFilterOfPrice(p);
            }, 10);
          }
        });
      }
      if (filter.slice(0, 7) === "inStock") {
        console.log("positive2")

        const boolean = filter.slice(8, filter.length);
        console.log("positive33",boolean)
        if (boolean =="positive" || boolean =="positive_" ) {
          console.log("status22")
          setTimeout(() => {
            handleStock(true);
          }, 10);
        }
      }
      if (filter.slice(0, 8) === "discount") {
        const boolean = filter.slice(9, filter.length);
        if (boolean === "true" || boolean==="true_") {
          handleDiscount(true);
        }
      }
      if (filter.slice(0, 5) === "color") {
        const colorsFilter = filter.slice(6, filter.length).split("_");
        const newInitialColors = {};
        colorsFilter.map((filter, index) => {
          newInitialColors[index + 1] = filter;
        });
        setTimeout(() => {
          console.log("newcolorwow",newInitialColors)
          importURlColors(newInitialColors);
        }, 10);
      }
      if (filter.slice(0, 4) === "size") {
        const sizeFilters = filter.slice(5, filter.length).split("_");
        const initialSizes = {};
        sizeFilters.map((filter, index) => {
          initialSizes[index + 1] = filter;
        });
        setTimeout(() => {
          console.log("iiiiiiiiiiii", initialSizes);
          importURlSizes(initialSizes);
        }, 10);
      }
      // New logic to handle brand filter
      if (filter.slice(0, 5) === "brand") {
        const brandsFilter = filter.slice(6, filter.length).split("_");
        setSelectedBrands(brandsFilter); // Set the selected brands
        setTimeout(() => {
          const filteredByBrand = products.filter(product => brandsFilter.includes(product.Brand));
          setFilteredByBrand(filteredByBrand); // Filter products based on selected brands
          resetPaginate(); // Reset pagination after brand filter is applied
        }, 10);
      }

      if (filter.slice(0, 14) === "optionalFilter") {
        const filters = filter.slice(15, filter.length).split("_");
        const optionalFilters = {};
        filters.map((filter, index) => {
          optionalFilters[index + 1] = filter;
        });
        setTimeout(() => {
          importURlFilters(optionalFilters);
        }, 10);
      }
      if (filter.slice(0, 6) === "search") {
        const search = filter.slice(7, filter.length);
        setOriginalSearch(search);
        handleSearchWithCategories(search)
        //logic to handle categories
        setTimeout(() => {
          handleExternalSearch(search);
        }, 10);
      }
    });
  }
  setTimeout(() => {
    setFinishHandlingURL(true);
  }, 100);

};



  const getParents = () => {
    const parentCategories = [];
    let currentCategoryId = categoryId;
  
    while (currentCategoryId !== undefined) {
      const currentCategory = allCategories.find((category) => category.id == currentCategoryId);
  
      if (currentCategory && currentCategory.parentId !== undefined) {
        parentCategories.push(currentCategory);
      }
  
      currentCategoryId = currentCategory?.parentId;
    }
  
    parentCategories.reverse();
    return parentCategories;
  };

  const handleExternalSearch = (searchWord) => {
    setSearchWordMenu(searchWord)
    setTimeout(() => {
      handelSearch(searchWord);
    }, 100);
  };

 

 
  


  const findCategoriesWithSearchWord = (searchWord) => {
    // Find all categories that have products matching the search word
    const matchingProducts = allProducts.filter(product => 
      product.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      product.title_En.toLowerCase().includes(searchWord.toLowerCase())
    );
    console.log("filteredProduct",matchingProducts)
    const categoryIds = matchingProducts.map(product => product.categoryId).filter(id => id !== undefined);
    return [...new Set(categoryIds)];  // Remove duplicate category IDs
  };


  const handleSearchWithCategories = (searchWord) => {
    console.log("category","first",searchWord)
    // If there is a search word
    if (searchWord.length > 0) {
      // Find categories that contain products matching the search word
      const foundCategoryIds = findCategoriesWithSearchWord(searchWord);
      console.log("second","first",foundCategoryIds)

      // Update allCategoryIDS with the found categories
      setAllCategoryIDS(foundCategoryIds);
    } else {
      // If there's no search word, reset allCategoryIDS to empty or to default if needed
      setAllCategoryIDS([]);
    }
  };
  const getRangeOfSize = () => {
    let filteredProducts = products;
  console.log("searchWordMenu",searchWordMenu)
    // First, filter products based on search words
    if (searchWordMenu.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchWordMenu.toLowerCase()) ||
        product.title_En.toLowerCase().includes(searchWordMenu.toLowerCase())
      );
    }
    console.log("searchWordMenu2",filteredProducts)

    let allSizes = [];
    filteredProducts.map((p) => allSizes.push(...getSize(p, allAttributeItems)));
    console.log("searchWordMenu3",allSizes)

    let finalAdd = [];
    let add = [];
    for (let key in listOfSizes) if (listOfSizes[key] === true) add.push(key);
  
    // Filter sizes based on selected sizes
    if (add.length > 0) {
      filteredProducts.map((p) => {
        if (getSize(p, allAttributeItems).some((s) => add.includes(s))) {
          finalAdd.push(p);
        }
      });
    }
  
    allSizes.push(...finalAdd);
    allSizes = [...new Set(allSizes)]; // Remove duplicates
    return allSizes;
  };
  
  // const getRangeOfSize = () => {
  //   let filteredProducts = products;
  
  //   if (searchWordMenu.length > 0) {
  //     filteredProducts = filteredProducts.filter(product =>
  //       product.title.toLowerCase().includes(searchWordMenu.toLowerCase()) ||
  //       product.title_En.toLowerCase().includes(searchWordMenu.toLowerCase())
  //     );
  //   }
  
  //   let allSizes = [];
  //   filteredProducts.map((p) => allSizes.push(...getSize(p, allAttributeItems)));
  
  //   let finalAdd = [];
  //   let add = [];
  //   for (let key in listOfSizes) if (listOfSizes[key] === true) add.push(key);
  
  //   if (add.length > 0) {
  //     filteredProducts.map((p) => {
  //       if (getSize(p, allAttributeItems).some((s) => add.includes(s))) {
  //         finalAdd.push(p);
  //       }
  //     });
  //   }
  
  //   allSizes.push(...finalAdd);
  //   allSizes = [...new Set(allSizes)]; // To remove duplicates
  //   return allSizes;
  // };
  
  
  const handleSize = (sizeName, size) => {
    let updatedListOfSizes = { ...listOfSizes };
    let updatedSizes = [...sizes];
    const newProducts = [];

  console.log("sizeeeeeeeeeeeeeeee2222",updatedListOfSizes)
  console.log("sizeeeeeeeeeeeeeeee2222",updatedSizes)

  if(size==-1){
    updatedListOfSizes={}
    updatedSizes=[]
  }
  else{

  
    // Toggle size selection based on description (or title if preferred)
    const sizeKey = size.description.trim();  // Or use size.title.trim()
  
    if (
      updatedListOfSizes[sizeKey] === undefined ||
      updatedListOfSizes[sizeKey] === false
    ) {
      updatedListOfSizes[sizeKey] = true;
      updatedSizes.push(size);
    } else {
      updatedListOfSizes[sizeKey] = false;
      updatedSizes = updatedSizes.filter((item) => ![size].includes(item));
    }
  
    // Filter products based on selected sizes
    products.map((p) => {
      if (
        getSize(p, allAttributeItems).filter((value) =>
          updatedSizes.includes(value)
        ).length > 0
      ) {
        newProducts.push(p);
      }
    });
  }
    console.log("sizeeeeeeeeeeeeeeee33333",updatedListOfSizes)
    console.log("sizeeeeeeeeeeeeeeee33333",updatedSizes)
    console.log("sizeeeeeeeeeeeeeeee33333",newProducts)

    setFilteredBySize(newProducts);
    setListOfSizes(updatedListOfSizes);
    setSizes(updatedSizes);
    resetPaginate(); // To refresh the paginated view with filtered products
  };
  

  // const handleSize = (sizeName, size) => {
  //   const updatedListOfSizes = { ...listOfSizes };
  //   let updatedSizes = [...sizes];
  
  //   // Toggle size selection
  //   if (
  //     updatedListOfSizes[sizeName] === undefined ||
  //     updatedListOfSizes[sizeName] === false
  //   ) {
  //     updatedListOfSizes[sizeName] = true;
  //     updatedSizes.push(size);
  //   } else {
  //     updatedListOfSizes[sizeName] = false;
  //     updatedSizes = updatedSizes.filter((item) => ![size].includes(item));
  //   }
  
  //   // Filter products based on selected sizes
  //   const newProducts = [];
  //   products.map((p) => {
  //     if (
  //       getSize(p, allAttributeItems).filter((value) =>
  //         updatedSizes.includes(value)
  //       ).length > 0
  //     ) {
  //       newProducts.push(p);
  //     }
  //   });
  
  //   setFilteredBySize(newProducts);
  //   setListOfSizes(updatedListOfSizes);
  //   setSizes(updatedSizes);
  //   resetPaginate(); // To refresh the paginated view with filtered products
  // };
  

  const handelSearch = (searchWord) => {
    setSearchByWorld(true);
  console.log("productsSearch",products)
    // Always start filtering from the full product list
    if (searchWord.trim() === "") {
      // Reset the search word filter if the searchWord is empty
      setFilterdBySearchWord([]);
      setSearchWordMenu(""); // Clear search input
    } else {
      const filtered = products.filter(
        (m) =>
          m.title.toLowerCase().includes(searchWord.toLowerCase()) ||
          m.title_En.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilterdBySearchWord(filtered);
    }
  
    resetPaginate(); // Reset pagination whenever a search is made
  };
  

  const getAllAttributes = () => {

    let searchWords = searchWordMenu
    let numberOfIdOfAttributes = [
      { name: "سایز", id: 2 },
      { name: "جنس ", id: 3 },
      { name: "برند", id: 4 },
      { name: "گروه سنی", id: 5 },
      { name: "مناسب برای فصل", id: 6 },
      { name: "تن خور ", id: 7 },
      { name: "نوع آستین", id: 8 },
    ];
    let final = [];
    if (searchWords.length === 0) {
      final = products;
    } else if (searchWords.length > 0) {
      final = filterdBySearchWord;
    }
    let allAttributes = [];
    numberOfIdOfAttributes.map((att) => {
      let allAttributesInfilter = [];
      let primitive = [];
      if (allAttributeItems.length > 0) {
        final.map((p) =>
          primitive.push(...getAttributes(p, allAttributeItems, att.id))
        );
      }

      let add = [];
      for (let key in allAttributesSelected)
        if (allAttributesSelected[key] === true) add.push(key);
      let allOfAttributes = [];
      products.map((p) =>
        allOfAttributes.push(...getAttributes(p, allAttributeItems, att.id))
      );
      let finalAdd = [];
      if (add.length > 0) {
        allOfAttributes.map((c) => {
          for (let index = 0; index < add.length; index++) {
            if (c.title === add[index]) finalAdd.push(c);
          }
        });
      }

      primitive.push(...finalAdd);
      primitive = [...new Set(primitive)];
      allAttributesInfilter.push(primitive);
      allAttributesInfilter.push(att);

      if (allAttributesInfilter.length > 0)
        allAttributes.push(allAttributesInfilter);
    });

    allAttributes = [...new Set(allAttributes)];
    return allAttributes;
  };

  const handleStock = (status=undefined) => {
    let newStock
    if (!status) newStock = !stock;
    else newStock = status;
    setStock(newStock);

    let final = [];
    final = products;
    // let newProduct = final.filter((p) => p.price !== 0);
    let newProduct = final.filter((p) => checkForStock(p));
    console.log("newProduct", newProduct)

    let newNotFound= notFound;
    if (newStock === true && newProduct.length > 0) {
      setFilteredByStock(newProduct)
      console.log("hereeeeeeeeeeeeee")
      newNotFound.filteredByStock.status = false;
    } else if (newStock === true && newProduct.length === 0) {
      newNotFound.filteredByStock.status = true;
    } else {
      newNotFound.filteredByStock.status = false;
      setFilteredByStock([])
    }
    resetPaginate();

    setNotFound(newNotFound)
  };

//   const handelColorClick = (completeColor) => {
//     console.log("completeColor",completeColor)
//     let color = completeColor.class;

//     // Ensure filters has a default value
//     let stringFilter = filters ? filters : "";

//     // Get current colors from the URL
//     let currentColors = getColorsFromURL();
//     if(completeColor==-1){
//       currentColors=[]
//     }
//     else{
//     // Check if color is already in the array, and toggle it
//     if (currentColors.includes(color)) {
//         currentColors = currentColors.filter(c => c !== color); // Remove if already selected
//     } else {
//         currentColors.push(color); // Add if not selected
//     }
//   }
//     // Build the new color filter part of the URL
//     let newColorFilter = currentColors.length > 0 
//         ? `color=${currentColors.join("_")}_`
//         : ""; // Remove color filter if no colors are selected

//     // If there's no color filter or filters string, we handle the replacement accordingly
//     if (stringFilter && stringFilter.includes("color")) {
//         // Update the filter string with the new color filter
//         stringFilter = stringFilter.replace(/color=[^&]*/, newColorFilter);
//         // Remove trailing "&" if no filters remain
//         stringFilter = stringFilter.replace(/&$/, '');
//     } else if (newColorFilter) {
//         // Append color filter if it's new and doesn't exist in the string
//         stringFilter = stringFilter ? `${stringFilter}&${newColorFilter}` : `&${newColorFilter}`;
//     }
//     console.log("stringFilter",stringFilter)
// console.log("stringFilter",stringFilter)
//     // Navigate to the updated URL with the new filters
//     navigate(`/search/${stringFilter}`);
    
//     if(completeColor==-1) handleColor(-1,-1);
//     else     handleColor(completeColor.class, completeColor);

// };

const handelColorClick = (completeColor) => {
  let color = completeColor.class;

  // Ensure filters has a default value
  let stringFilter = filters ? filters : "";
  console.log("color222",color,stringFilter)

  // Get current colors from the URL
  let currentColors = getColorsFromURL();
  console.log("color222",currentColors)

  if(completeColor==-1){
    currentColors=[]
  }
  else{
  // Check if color is already in the array, and toggle it
  if (currentColors.includes(color)) {
      currentColors = currentColors.filter(c => c !== color); // Remove if already selected
  } else {
      currentColors.push(color); // Add if not selected
  }
}
console.log("color2222222",currentColors)

  // Build the new color filter part of the URL
  let newColorFilter = currentColors.length > 0 
      ? `color=${currentColors.join("_")}_`
      : ""; // Remove color filter if no colors are selected
      console.log("color22222222222222222222",newColorFilter)
      console.log("color22222222222222222222","stringfilter",stringFilter)

  // If there's no color filter or filters string, we handle the replacement accordingly
  if (stringFilter && stringFilter.includes("color")) {
    console.log("color22222222222222222222","yesssss")
      // Update the filter string with the new color filter
      stringFilter = stringFilter.replace(/color=[^&]*/, newColorFilter);
      // Remove trailing "&" if no filters remain
      stringFilter = stringFilter.replace(/&$/, '');
  } else if (newColorFilter) {
    console.log("color22222222222222222222","nooooo")

      // Append color filter if it's new and doesn't exist in the string
      stringFilter = stringFilter ? `${stringFilter}&${newColorFilter}` : `&${newColorFilter}`;
  }
  console.log("stringFilter",stringFilter)

  // Navigate to the updated URL with the new filters
  navigate(`/search/${stringFilter}`);
  
  if(completeColor==-1) handleColor(-1,-1);
  else     handleColor(completeColor.class, completeColor);
  // Call the color handler function to update the state
};




const handleAllClick = (
  filterTitle,
  indexOfFilterTitle,
  lengthOfFilterTitle,
  filter,
  indexOffilter,
  lengthOfFilter,
  common
) => {
  let stringFilter = filters ? filters : "";
  let newStringFilter = "";

  // Check if the filter already exists and modify it if necessary
  if (indexOfFilterTitle !== -1) {
    if (common === false) {
      // Append new filter if not found
      newStringFilter = `${stringFilter.slice(0, indexOfFilterTitle + lengthOfFilterTitle)}${filter}_${stringFilter.slice(indexOfFilterTitle + lengthOfFilterTitle)}`;
    }
    if (common === true) {
      // Remove the filter if already selected
      let length = stringFilter.charAt(indexOffilter + lengthOfFilter) === "_" ? indexOffilter + lengthOfFilter + 1 : indexOffilter + lengthOfFilter;
      newStringFilter = `${stringFilter.slice(0, indexOffilter)}${stringFilter.slice(length)}`;
    }
  } else {
    // If no filter is found, add it
    newStringFilter = `${stringFilter}&${filterTitle}=${filter}`;
  }

  // Navigate to the new URL with updated filters while preserving others
  navigate(`/search/${newStringFilter}`);
};


const handleFilterOfPrice = (number) => {
  const updatedRangePriceClassName = [...RangePriceClassName]; // Copy the state
let selectedRanges=[]
console.log("RangePriceClassName",RangePriceClassName)
  if(number==-1){
    updatedRangePriceClassName.map(range=>range.status=false)
  
    selectedRanges=[]
  }
  else {
  // Toggle the selected price range
  if (number !== undefined) {
    updatedRangePriceClassName[number].status = !updatedRangePriceClassName[number].status;
  }

  // Check if any range is selected
   selectedRanges = updatedRangePriceClassName
    .filter((range) => range.status) // Only include active ranges
    .map((range) => ({
      firtRange: range.firtRange,
      secondRange: range.secondRange,
    }));
  }
  if (selectedRanges.length === 0) {
    // If no price range is selected, reset the filter and show all products
    setFilterdByPrice([]);
    setRangePriceClassName(updatedRangePriceClassName);
    resetPaginate();
    return;
  }

  // Filter products based on the selected price ranges
  const filteredProducts = products.filter((p) => {
    const price = p.off ? (p.price * (100 - p.off)) / 100 : p.price;
    return selectedRanges.some(
      (range) => price >= range.firtRange && price <= range.secondRange
    );
  });

  // Update the state with filtered products
  setFilterdByPrice(filteredProducts);
  setRangePriceClassName(updatedRangePriceClassName);
  resetPaginate(); // Reset pagination to the first page
};



const handleDiscount = (status=undefined) => {
  console.log("status",status)
  let updatedDiscount
  if(!status) updatedDiscount = !discount;
else updatedDiscount=status
console.log("updatedDiscount",updatedDiscount)
  setDiscount(updatedDiscount);

  //const { products } = state;
  const newProduct = products.filter((p) => (p.off!=0));
  console.log("newProduct45454",updatedDiscount,newProduct)
  if (updatedDiscount === true && newProduct.length > 0) {
    setFilteredByDiscount(newProduct);
    setNotFound({ ...notFound, filteredByDiscount: { status: false } });
  } else if (updatedDiscount === true && newProduct.length === 0) {
    setNotFound({ ...notFound, filteredByDiscount: { status: true } });
  } else {
    setFilteredByDiscount([]);
    setNotFound({ ...notFound, filteredByDiscount: { status: false } });
  }
  resetPaginate();
};

const handleAccordian = (name) => {
  const updatedAccordian = { ...accordian };
  if (updatedAccordian[name] === undefined) {
    updatedAccordian[name] = true;
  } else if (updatedAccordian[name] === false) {
    updatedAccordian[name] = true;
  } else updatedAccordian[name] = false;
  setAccordian(updatedAccordian);
};

const getColorsFromURL = () => {
  if (filters) {
      const colorMatch = filters.match(/color=([^&]*)/); // Match the color section from the URL
      if (colorMatch && colorMatch[1]) {
          return colorMatch[1].split("_").filter(Boolean); // Return an array of colors
      }
  }
  return [];
};


const handleColor = (colorName, colorObject) => {
  let  updatedListOfColors = { ...listOfColors };
  let updatedColors = [...colors];
  let newProducts=[]
  console.log("updatedListOfColors2222",updatedListOfColors,"updatedColors",updatedColors)
  if(colorName==-1){
    updatedListOfColors={}
    updatedColors=[]
  }
  else{

  // Toggle color selection
  if (updatedListOfColors[colorName]) {
      updatedListOfColors[colorName] = false;
      updatedColors = updatedColors.filter(c => c !== colorObject);
  } else {
      updatedListOfColors[colorName] = true;
      updatedColors.push(colorObject);
  }

  // Filter products that match any of the selected colors
   newProducts = products.filter(product => {
      const productColors = getcolors(product, allAttributeItems);
      return updatedColors.some(selectedColor => productColors.includes(selectedColor));
  });
  }
  setFilteredByColor(newProducts);
  setListOfColors(updatedListOfColors);
  setColors(updatedColors);
  resetPaginate(); // Reset pagination
};


const handleAllAttributes = (attribute, index, id, name, item) => {
  attribute.trim();
  name.trim();
  const updatedAllAttributesSelected = { ...allAttributesSelected };
  const updatedSpecificSelectedItems = [...specificSelectedItems];

  if (
    updatedAllAttributesSelected[name] === undefined ||
    updatedAllAttributesSelected[name] === false
  ) {
    updatedAllAttributesSelected[name] = true;
    if (updatedSpecificSelectedItems[attribute] === undefined) {
      updatedSpecificSelectedItems[attribute] = [item];
    } else {
      updatedSpecificSelectedItems[attribute].push(item);
    }
  } else {
    updatedAllAttributesSelected[name] = false;
    updatedSpecificSelectedItems[attribute] = updatedSpecificSelectedItems[
      attribute
    ].filter((i) => ![item].includes(i));
  }

  const newProducts = [];
  products.map((p) => {
    if (
      getAttributes(p, allAttributeItems, id).filter((value) =>
        updatedSpecificSelectedItems[attribute].includes(value)
      ).length > 0
    ) {
      newProducts.push(p);
    }
  });
  filteredByDiffferentsAttributes[index] = newProducts;
  filteredByDiffferentsAttributes[index] = [
    ...new Set(filteredByDiffferentsAttributes[index]),
  ];
  const updatedIndexHolder = [...indexHolder];
  updatedIndexHolder.push({ attribute, index });
  setIndexHolder(updatedIndexHolder);
  setAllAttributesSelected(updatedAllAttributesSelected);
  setSpecificSelectedItems(updatedSpecificSelectedItems);
  setFilteredByDiffferentsAttributes(filteredByDiffferentsAttributes);
  resetPaginate();
};

// const getProducts = () => {
// let tempProducts = products
// let tempFilterdBySearchWord=filterdBySearchWord
// let tempFilterdByPrice=filterdByPrice
// let tempFilteredByDiscount=filteredByDiscount
// let tempFilteredByStock=filteredByStock
// let tempFilteredByColor=filteredByColor
// let tempFilteredByDiffferentsAttributes=filteredByDiffferentsAttributes
// const searchWords = searchWordMenu

// console.log("vvvvvvvvvvvvvvvvv",tempProducts)
// console.log("filteredByDiscount",filteredByDiscount)
// console.log("filteredByDiscount222",filteredByStock)


//   if (
//     filteredByDiffferentsAttributes.filter((c) => c.length > 0).length === 0 ||
//     filteredByDiffferentsAttributes.length === 0
//   ) {
//     setFilteredByDiffferentsAttributes([tempProducts]);
//     tempFilteredByDiffferentsAttributes=tempProducts
//   }
//   if (filterdByPrice.length === 0) {
//     //setFilterdByPrice(tempProducts);
//     tempFilterdByPrice=tempProducts;
//   }
//   if (filteredByColor.length === 0 && colors.length === 0) {
//     setFilteredByColor(tempProducts);
//     tempFilteredByColor=tempProducts;
//   }
//   if (filteredByDiscount.length === 0 && notFound.filteredByDiscount.status === false) {
//     setFilteredByDiscount(tempProducts);
//     tempFilteredByDiscount=tempProducts;
//   }
//   if (filteredByStock.length === 0 && notFound.filteredByStock.status === false) {
//     setFilteredByStock(tempProducts);
//     tempFilteredByStock=tempProducts;
//   }
//   if (filterdBySearchWord.length === 0 && searchWords.length === 0) {
//     setFilterdBySearchWord(tempProducts);
//     tempFilterdBySearchWord=tempProducts;
//   }

//   // let result = tempProducts.filter(
//   //   (value) =>
//   //   tempFilteredByStock.includes(value) &&
//   //     tempFilteredByStock.includes(value) &&
//   //     tempFilterdByPrice.includes(value) &&
//   //     tempFilterdBySearchWord.includes(value) &&
//   //     tempFilteredByColor.includes(value) &&
//   //     tempFilteredByDiscount.includes(value)
//   // );
//   let result = tempProducts;
// if (tempFilteredByStock.length > 0) {
//   result = result.filter(value => tempFilteredByStock.includes(value));
// }
// if (tempFilterdByPrice.length > 0) {
//   result = result.filter(value => tempFilterdByPrice.includes(value));
// }
// if (tempFilterdBySearchWord.length > 0) {
//   result = result.filter(value => tempFilterdBySearchWord.includes(value));
// }
// if (tempFilteredByColor.length > 0) {
//   result = result.filter(value => tempFilteredByColor.includes(value));
// }
// if (tempFilteredByDiscount.length > 0) {
//   result = result.filter(value => tempFilteredByDiscount.includes(value));
// }


//   tempFilteredByDiffferentsAttributes.map((category) => {
//     if (category.length > 0) {
//       console.log("trueeeeeeeeeeeeeeee", category);
//       result = category.filter((value) => result.includes(value));
//     }
//   });
//   result = [...new Set(result)];
//   console.log(
//     "0",
//     tempProducts,
//     "1",
//     filteredByDiscount,
//     "2",
//     filteredByStock,
//     "3",
//     filterdByPrice,
//     "4",
//     filterdBySearchWord,
//     "5",
//     filteredByColor,
//     "6",
//     result
//   );
//   return result;
// };


const getProducts = () => {
  let result = [...products]; // Always start with the full product list

  // Apply search word filter first
  if (searchWordMenu.trim().length > 0) {
    result = result.filter(product => 
      product.title.toLowerCase().includes(searchWordMenu.toLowerCase()) || 
      product.title_En.toLowerCase().includes(searchWordMenu.toLowerCase())
    );
  }

  // Apply brand filter
  if (selectedBrands.length > 0) {
    result = result.filter(product => selectedBrands.includes(product.Brand));
  }

  // Apply size filter
  if (filteredBySize.length > 0) {
    result = result.filter(value => filteredBySize.includes(value));
  }

  // Apply stock filter
  if (filteredByStock.length > 0) {
    result = result.filter(value => filteredByStock.includes(value));
  }

  // Apply price filter
  if (filterdByPrice.length > 0) {
    result = result.filter(value => filterdByPrice.includes(value));
  }

  // Apply color filter
  if (filteredByColor.length > 0) {
    result = result.filter(value => filteredByColor.includes(value));
  }

  // Apply discount filter
  if (filteredByDiscount.length > 0) {
    result = result.filter(value => filteredByDiscount.includes(value));
  }

  // Apply attributes filter (optional)
  filteredByDiffferentsAttributes.forEach((category) => {
    if (category.length > 0) {
      result = result.filter(value => category.includes(value));
    }
  });

  // Remove duplicates by using `new Set` to ensure uniqueness
  console.log("new set" , new Set(result))
  return [...new Set(result)];
};





// const deletFilterOfSearch = () => {
//   const updatedData = { ...data };
//   updatedData.internalSearchBox = "";
//   setData(updatedData);
//   handelClickSearch("");
// };

const handelClickSearch = (searchWord) => {
  let stringFilter
  if(!filters) stringFilter=""
  else stringFilter=filters
  let id = PresentURL.id;
  let newStringFilter = "";
  let length = "search".length + 1;
  let index = stringFilter.indexOf("search");
  if (index !== -1) {
    let sliceStringFilter = stringFilter.slice(index);
    let endOfIndexOldSearchWord = sliceStringFilter.indexOf("&");
    if (endOfIndexOldSearchWord !== -1) {
      newStringFilter =
        stringFilter.slice(0, index + length) +
        `${searchWord}` +
        stringFilter.slice(endOfIndexOldSearchWord + index);
    } else {
      newStringFilter =
        stringFilter.slice(0, index + length) + `${searchWord}`;
    }
  } else {
    newStringFilter = stringFilter + `&search=${searchWord}`;
  }
  handelSearch(searchWord);
  navigate(`/search/${newStringFilter}`);

  //props.history.push(`/last__category/${categoryId}/${newStringFilter}`);
};

const deletFilterOfDiscountStock = (name, status) => {
  //setState({ [name]: "", [status]: false });
  resetPaginate();
};

const getRangeOfColor = () => {
  console.log("newcolors22","product",products)

  let searchWords = searchWordMenu
  let final = [];
  if (searchWords.length == 0) {
    console.log("wowsearchWords,",searchWords,searchWords.length)
    console.log("wowempty")
    final = products;
  } else if (searchWords.length > 0) {
    console.log("wowenotmpty")

      final = products.filter(
        (m) =>
          m.title.toLowerCase().includes(searchWords.toLowerCase()) ||
          m.title_En.toLowerCase().includes(searchWords.toLowerCase())
      );

  }
  console.log("wowsearchWordMenu,",searchWords)
  console.log("wowallcolors","final",final)

  let allColors = [];
  final.map((p) => allColors.push(...getcolors(p, allAttributeItems)));
  console.log("wowallcolors3","allcolors",allColors)

  let allofColors = [];
  products.map((p) => allofColors.push(...getcolors(p, allAttributeItems)));
  let finalAdd = [];
  let add = [];
  for (let key in listOfColors) if (listOfColors[key] === true) add.push(key);

  if (add.length > 0) {
    allofColors.map((c) => {
      for (let index = 0; index < add.length; index++) {
        if (c.class === add[index]) finalAdd.push(c);
      }
    });
  }
  allColors.push(...finalAdd);
  allColors = [...new Set(allColors)];
  //setAllTestColors(allColors)
  return allColors;
};


const importURlColors = (initialColors) => {
  console.log("wowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",initialColors,listOfColors)
  
  let allColors = getRangeOfColor()
  if(allColors.length==0) setIsFilterApplied(false)
  console.log("wowgetrangeofcolor",allColors)

  let colorsToApply = []; // Accumulate colors to apply

  // Iterate over colors from the URL filters
  for (let key in initialColors) {
    allColors.forEach((color) => {
      if (color.class === initialColors[key]) {
        colorsToApply.push(color);
      }
    });
  }

  // Now apply all the colors at once
  let updatedListOfColors = { ...listOfColors };
  let updatedColors = [...colors];

  colorsToApply.forEach((color) => {
    updatedListOfColors[color.class] = true; // Mark color as selected
    updatedColors.push(color);
  });

  // Apply the changes to the state once
  setFilteredByColor(products.filter(product => {
    const productColors = getcolors(product, allAttributeItems);
    return updatedColors.some(selectedColor => productColors.includes(selectedColor));
  }));
  setListOfColors(updatedListOfColors);
  setColors(updatedColors);
  console.log("wowcolor",updatedColors,"wow",updatedListOfColors)
  resetPaginate(); // Reset pagination
};



const importURlSizes = (initialSizes) => {
  let allSizes = getRangeOfSize(); // Get all available sizes
  if(allSizes.length==0) setIsFilterApplied(false)

  console.log("allSizes2",allSizes)
  let sizesToApply = []; // Accumulate sizes to apply

  // Iterate over sizes from URL and find the matching size from `allSizes`
  for (let key in initialSizes) {
    allSizes.forEach((size) => {
      if (size.description.trim() === initialSizes[key].trim()) {
        sizesToApply.push(size);
      }
    });
  }

  // Now apply all the sizes at once
  let updatedListOfSizes = { ...listOfSizes };
  let updatedSizes = [...sizes];

  sizesToApply.forEach((size) => {
    updatedListOfSizes[size.description] = true; // Mark size as selected
    updatedSizes.push(size);
  });

  // Filter products that match any of the selected sizes
  const newProducts = products.filter(product => {
    const productSizes = getSize(product, allAttributeItems);
    return updatedSizes.some(selectedSize => productSizes.includes(selectedSize));
  });

  // Apply the changes to the state once
  setFilteredBySize(newProducts);
  setListOfSizes(updatedListOfSizes);
  setSizes(updatedSizes);
  resetPaginate(); // Reset pagination
};



// const handelSizeClick = (size) => {
//   console.log("sssssssssss",size)
//   let stringFilter = filters ? filters : "";
//   let length = "size".length + 1;
//   let index = stringFilter.indexOf("size");
//   let index2 = stringFilter.indexOf(size);
//   let common = stringFilter.toLowerCase().includes(size.description.toLowerCase());
//   let length2 = size.length;

//   handleSize(size, size);  // Call the size handler function
//   handleAllClick("size", index, length, size, index2, length2, common);
// };

const handelSizeClick = (size) => {

  if (size === -1) {
    resetSize();
    return;
  }

  let stringFilter = filters ? filters : "";
  let length = "size".length + 1;
  let index = stringFilter.indexOf("size");
  let index2 = stringFilter.indexOf(size.description);  // Use description or title here
  let common = stringFilter.toLowerCase().includes(size.description.toLowerCase());  // Match the description

  handleSize(size.description, size);  // Pass size.description instead of size object
  console.log("sizeeeeeeeeeeeeeeeee",index, length, size.description, index2, size.description.length, common)
  handleAllClick("size", index, length, size.description, index2, size.description.length, common);  // Pass size.description instead of size object
};

const resetSize=()=>{
  handleSize(-1,-1)


 // Split the filter string into an array based on the '&' delimiter
 let stringFilter = filters ? filters : "";
 let filtersArray = stringFilter.split("&");

 // Filter out the 'size' parameter and any associated values
 const updatedFiltersArray = filtersArray.filter((filter) => {
   // Exclude the size filter
   return !filter.startsWith("size=");
 });

 // Join the remaining filters back into a string
 let newStringFilter= updatedFiltersArray.join("&");
 navigate(`/search/${newStringFilter}`);

}

const importURlFilters = (optionalFilters) => {
  let others = getAllAttributes();
  let filters = [];
  for (let key in optionalFilters) {
    others.map((arrays, index) =>
      arrays[0].map((array) => {
        if (array.title.trim() === optionalFilters[key].trim()) {
          filters.push([
            arrays[1].name,
            index,
            arrays[1].id,
            array.title,
            array,
          ]);
        }
      })
    );
  }
  let NewinitialAccordion = { ...initialAccordion };
  filters.map((filter) => {
    handleAllAttributes(
      filter[0],
      filter[1],
      filter[2],
      filter[3],
      filter[4]
    );
    handleAccordian(filter[0]);
    NewinitialAccordion[filter[0]] = true;
  });

  setInitialAccordion(NewinitialAccordion)
};

const handleSort = (order) => {
  const updatedSort = { ...sort };
  updatedSort.path = order.path;
  updatedSort.order = order.sort;
  setSort(updatedSort);
  resetPaginate();
};

const sortproducts = () => {
 let tempResult=getProducts()
 console.log("ggggggg",tempResult,sort)
  let sorted = [];

  if (sort.path === "price") {
    let prices = [];
    tempResult.map((p) =>
      p.off
        ? prices.push((parseInt(p.price) * (100 - parseInt(p.off))) / 100)
        : prices.push(p.price)
    );
    let deletedZeroes = prices.filter((c) => c !== 0);
    let zeroes = tempResult.filter((product) => product.price === 0);
    if (sort.order === "asc") {
      deletedZeroes = deletedZeroes.sort((a, b) => a - b);
    } else {
      deletedZeroes = deletedZeroes.sort((a, b) => b - a);
    }
    console.log("ggggggg2222222",deletedZeroes)

    deletedZeroes = [...new Set(deletedZeroes)];
    let primitiveSort = [];
    deletedZeroes.map((number) => {
      for (let index = 0; index < tempResult.length; index++) {
        if (
          number === tempResult[index].price ||
          number ===
            (tempResult[index].price * (100 - parseInt(tempResult[index].off))) /
              100
        ) {
          primitiveSort.push(tempResult[index]);
        }
      }
    });
    primitiveSort.push(...zeroes);
    sorted = primitiveSort;
  } else {
    console.log("sort",sort.path,sort.order)
    sorted = orderBy(tempResult, [sort.path], [sort.order]);
  }
console.log("sort2",sorted)
  return sorted;
};

const handlePgeChange = (page) => {
  const updatedPagination = { ...pagination };
  updatedPagination.currentPage = page;
  setPagination(updatedPagination);
  document.body.scrollTop = 185; // For Safari
  document.documentElement.scrollTop = 185; // For Chrome, Firefox, IE, and Opera
};

const handelAllAttributesClick = (
  nameOfAttribute,
  indexOfAttribut,
  id,
  titleItem,
  item
) => {

  handleAllAttributes(
    nameOfAttribute,
    indexOfAttribut,
    id,
    titleItem,
    item
  );
  titleItem = titleItem.trim();
  let stringFilter = filters;
  let length = "optionalFilter".length + 1;
  let index = stringFilter.indexOf("optionalFilter");
  let index2 = stringFilter.indexOf(titleItem);
  let common = stringFilter.toLowerCase().includes(titleItem);
  let length2 = titleItem.length;
  handleAllClick(
    "optionalFilter",
    index,
    length,
    titleItem,
    index2,
    length2,
    common
  );
};

const paginate = () => {
  const { currentPage, pageSize } = pagination;

  const paginateProducts = sortproducts();
  setFinalBeforePagination(paginateProducts)

  const paginated = paginateProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  setFinalPaginateProducts(paginated)
  //setLoading(false);
  console.log("paginated",paginated)
  
  return paginated;
};

const resetPaginate = () => {
  const updatedPagination = { ...pagination };
  updatedPagination.currentPage = 1;
  setPagination(updatedPagination);
};

const openCloseBurgerMenu = () => {
  const { statusOfMenu } = props;
  if (statusOfMenu === false) props.openSearch();
  else props.closeSearch();
  console.log(statusOfMenu);
};

const getCurrentFilters = (stringFilter) => {
  const filterMap = {};

  // Extract category filter
  const categoryMatch = stringFilter.match(/category=([^&]*)/);
  filterMap.category = categoryMatch ? categoryMatch[0] : "";  // Preserve category filter

  // Extract color filter
  const colorMatch = stringFilter.match(/color=([^&]*)/);
  filterMap.color = colorMatch ? colorMatch[0] : "";

  // Extract range filter and handle empty ranges
  const rangeMatch = stringFilter.match(/range=([^&]*)/);
  filterMap.range = rangeMatch && rangeMatch[1] ? rangeMatch[1].split("_") : [];

  // Extract inStock filter
  const stockMatch = stringFilter.match(/inStock=([^&]*)/);
  filterMap.stock = stockMatch ? stockMatch[0] : "";

  // Extract discount filter
  const discountMatch = stringFilter.match(/discount=([^&]*)/);
  filterMap.discount = discountMatch ? discountMatch[0] : "";

  // Extract size filter
  const sizeMatch = stringFilter.match(/size=([^&]*)/);
  filterMap.size = sizeMatch ? sizeMatch[0] : "";

  // Extract brand filter
  const brandMatch = stringFilter.match(/brand=([^&]*)/);
  filterMap.brand = brandMatch ? brandMatch[1].split("_") : [];

  // Extract search word filter
  const searchMatch = stringFilter.match(/search=([^&]*)/);
  filterMap.searchWord = searchMatch ? searchMatch[1] : "";

  return filterMap;
};



const handelPriceClick = (indexOfPrice) => {
  let stringFilter = filters ? filters : "";
  // Get current filters from the URL
  let currentFilters = getCurrentFilters(stringFilter);
  let currentRanges = currentFilters.range;
  console.log("currentRanges",currentRanges)

  if(indexOfPrice===-1) currentRanges=[]
  else{
  // Toggle the selected price range in the array
  if (currentRanges.includes(indexOfPrice.toString())) {
    // Remove if already selected
    currentRanges = currentRanges.filter((r) => r !== indexOfPrice.toString());
  } else {
    // Add if not selected
    currentRanges.push(indexOfPrice.toString());
  }
  }
  // Remove duplicates from the ranges array
  currentRanges = [...new Set(currentRanges)];
  console.log("currentRanges2",currentRanges)



  // If no range is selected, remove the range filter from the URL
  let newRangeFilter = currentRanges.length > 0 ? `range=${currentRanges.join("_")}` : "";

  // Build the final filter string including all filters
  let finalFilterString = [
    currentFilters.category,
    currentFilters.color,
    newRangeFilter, // Add or remove range filter based on selection
    currentFilters.stock,
    currentFilters.discount,
    currentFilters.size,
    currentFilters.brand.length > 0 ? `brand=${currentFilters.brand.join("_")}` : "",
    currentFilters.searchWord ? `search=${currentFilters.searchWord}` : "",
  ]
    .filter((f) => f)
    .join("&");

  // Navigate to the updated URL
  navigate(`/search/${finalFilterString}`);

  // Call the filter handler to update the state
  handleFilterOfPrice(indexOfPrice);
};








const handelBrandClick = (brand) => {
  let stringFilter = filters ? filters : "";

  // Get current filters
  let currentFilters = getCurrentFilters(stringFilter);
  let currentBrands = currentFilters.brand;

  if(brand==-1){
    currentBrands=[]
  }
  else{
  console.log("currentBrands",currentBrands)
  // Check if the brand is already in the array, and toggle it
  if (currentBrands.includes(brand)) {
    // Remove if already selected
    currentBrands = currentBrands.filter(b => b !== brand);
  } else {
    // Add if not selected
    currentBrands.push(brand);
  }
}
  console.log("currentBrands2",currentBrands)


  // Build the new brand filter part of the URL
  let newBrandFilter = currentBrands.length > 0
    ? `brand=${currentBrands.join("_")}`
    : ""; // Remove brand filter if no brands are selected

  // **Include Category Filter in the URL**
  let categoryFilter = selectedCategoryIDS.length > 0
    ? `category=${selectedCategoryIDS.join("_")}`
    : ""; // Only add category filter if selected

  // Rebuild the final filter string including all filters
  let finalFilterString = [
    categoryFilter, // Add category to the filter string
    currentFilters.color,
    currentFilters.range.length > 0 ? `range=${currentFilters.range.join("_")}` : "", // Only add range if it's not empty
    currentFilters.stock,
    currentFilters.discount,
    currentFilters.size,
    newBrandFilter,
    currentFilters.searchWord ? `search=${currentFilters.searchWord}` : "" // Preserve searchWord
  ].filter(f => f).join("&"); // Filter out any empty parts

  // Update the URL, now including the category filter
  navigate(`/search/${finalFilterString}`);

  // Update state for brand filtering
  setSelectedBrands(currentBrands);
  
  // Filter the products based on the selected brands
  const filteredByBrand = products.filter(product => currentBrands.includes(product.Brand));
  setFilteredByBrand(filteredByBrand);

  // Reset pagination after brand selection
  resetPaginate();
};




const handelClickDiscount = () => {
  let stringFilter
  if(filters)stringFilter=filters
  else stringFilter=""
  let length = "discount".length + 1;
  let index = stringFilter.indexOf("discount");
  let index2 = stringFilter.indexOf("true");
  let common = stringFilter.toLowerCase().includes("true".toLowerCase());
  let length2 = "true".length;
  handleDiscount();
  handleAllClick(
    "discount",
    index,
    length,
    "true",
    index2,
    length2,
    common
  );
};
const handelClickInStock = () => {
   let stringFilter
   if(!filters) stringFilter=""
   else stringFilter=filters
  console.log("stringFilter",stringFilter)
  let length = "inStock".length + 1;
  let index = stringFilter.indexOf("inStock");
  let index2 = stringFilter.indexOf("positive");
  let common = stringFilter.toLowerCase().includes("positive".toLowerCase());
  let length2 = "positive".length;
  console.log("common",common)
  handleStock();
  handleAllClick(
    "inStock",
    index,
    length,
    "positive",
    index2,
    length2,
    common
  );
};


const handelClickOrder = (order) => {
  let stringFilter
  if(!filters) stringFilter=""
  else stringFilter=filters
  let id = PresentURL.id;
  let newStringFilter = "";
  let length = "order".length + 1;
  let index = stringFilter.indexOf("order");
  if (index !== -1) {
    let sliceStringFilter = stringFilter.slice(index);
    let endOfIndexOldSearchWord = sliceStringFilter.indexOf("&");
    if (endOfIndexOldSearchWord !== -1) {
      newStringFilter =
        stringFilter.slice(0, index + length) +
        `${order.path}_${order.sort}` +
        stringFilter.slice(endOfIndexOldSearchWord + index);
    } else {
      newStringFilter =
        stringFilter.slice(0, index + length) + `${order.path}_${order.sort}`;
    }
  } else {
    newStringFilter = stringFilter + `&order=${order.path}_${order.sort}`;
  }
  console.log("filter",newStringFilter)
  navigate(`/search/${newStringFilter}`);
  //this.props.history.push(`/last__category/${categoryId}/${newStringFilter}`);
  handleSort(order);
};

const handleValue = (event) => {
  //resetAndRecalculateFilters(event.target.value)
  console.log("ata",event.target.value)
  setSearchWordMenu(event.target.value)
  handelClickSearch(event.target.value);
};


return (
  <div className={blurState.blur ? 'main blurred' : "main"}>
      <div className="container-special">
        <div className="breadcrumb11">
{/* <Breadcrumb>
<Breadcrumb.Item onClick={()=>navigate(`/`)}>
  Main page
</Breadcrumb.Item>
{getParents().map((c) => {
    if (c.id !== categoryId) {
      return (
        <Breadcrumb.Item key={c.id} onClick={() => handleNavigateToCategory(c.id)}>
          {c.title}
        </Breadcrumb.Item>
      );
    } else {
      return (
        <Breadcrumb.Item active key={c.id}>
          {c.title}
        </Breadcrumb.Item>
      );
    }
  })}
</Breadcrumb> */}

        </div>
      </div>

      <div className="whole__category">
        <div className="container-special">
          <div className="main__search">

            <FilterMenu
            resetPrice={resetPrice}
            toggleCategoryInUrl={toggleCategoryInUrl}
            selectedCategoryIDS={selectedCategoryIDS}
            allCategoryIDS={allCategoryIDS}
             finalPaginateProducts={finalPaginateProducts}
                            loading={loading}
             allBrands={getUniqueBrands()}
             selectedBrands={selectedBrands}
             handelBrandClick={handelBrandClick}
                            finalBeforePagination={finalBeforePagination}
                            handelSizeClick={handelSizeClick}
                            getRangeOfSize={getRangeOfSize}
                            listOfSizes={listOfSizes}
              originalSearch={originalSearch}
              handelPriceClick={handelPriceClick}
              handelClickInStock={handelClickInStock}
              handelClickDiscount={handelClickDiscount}
              handelColorClick={handelColorClick}
              handelAllAttributesClick={handelAllAttributesClick}
              getAllAttributes={getAllAttributes}
              getRangeOfColor={getRangeOfColor}
              //deletallFilters={deletallFilters}
              PresentURL={PresentURL}
              initialAccordion={initialAccordion}
              initialColors={initialColors}
              //optionalFilters={optionalFilters}
              categoryId={parseInt(categoryId)}
              allCategories={allCategories}
              handleValue={handleValue}
              handleSearch={handelSearch}
              products={products}
              filterdBySearchWord={filterdBySearchWord}
              searchWords={searchWordMenu}
              RangePriceClassName={RangePriceClassName}
              handleFilterOfPrice={handleFilterOfPrice}
              handleStock={handleStock}
              stock={stock}
              discount={discount}
              handleDiscount={handleDiscount}
              accordian={accordian}
              handleAccordian={handleAccordian}
              allAttributeItemS={allAttributeItems}
              listOfColors={listOfColors}
              handleColor={handleColor}
              handleAllAttributes={handleAllAttributes}
              allAttributesSelected={allAttributesSelected}
            />
            <div className="left__search__products">
              <div className="whole__left__search">
              <MobileBox
                     handelClickOrder={handelClickOrder}
                     Sort={sort}
                     handleSort={handleSort}
                     finalBeforePagination={finalBeforePagination}
                     resetPrice={resetPrice}
                     toggleCategoryInUrl={toggleCategoryInUrl}
                     selectedCategoryIDS={selectedCategoryIDS}
                     allCategoryIDS={allCategoryIDS}
                      finalPaginateProducts={finalPaginateProducts}
                                     loading={loading}
                      allBrands={getUniqueBrands()}
                      selectedBrands={selectedBrands}
                      handelBrandClick={handelBrandClick}
                                     handelSizeClick={handelSizeClick}
                                     getRangeOfSize={getRangeOfSize}
                                     listOfSizes={listOfSizes}
                       originalSearch={originalSearch}
                       handelPriceClick={handelPriceClick}
                       handelClickInStock={handelClickInStock}
                       handelClickDiscount={handelClickDiscount}
                       handelColorClick={handelColorClick}
                       handelAllAttributesClick={handelAllAttributesClick}
                       getAllAttributes={getAllAttributes}
                       getRangeOfColor={getRangeOfColor}
                       //deletallFilters={deletallFilters}
                       PresentURL={PresentURL}
                       initialAccordion={initialAccordion}
                       initialColors={initialColors}
                       //optionalFilters={optionalFilters}
                       categoryId={parseInt(categoryId)}
                       allCategories={allCategories}
                       handleValue={handleValue}
                       handleSearch={handelSearch}
                       products={products}
                       filterdBySearchWord={filterdBySearchWord}
                       searchWords={searchWordMenu}
                       RangePriceClassName={RangePriceClassName}
                       handleFilterOfPrice={handleFilterOfPrice}
                       handleStock={handleStock}
                       stock={stock}
                       discount={discount}
                       handleDiscount={handleDiscount}
                       accordian={accordian}
                       handleAccordian={handleAccordian}
                       allAttributeItemS={allAttributeItems}
                       listOfColors={listOfColors}
                       handleColor={handleColor}
                       handleAllAttributes={handleAllAttributes}
                       allAttributesSelected={allAttributesSelected}
                     
                     
            
                     >

</MobileBox>

              <SecondBox
                  handelClickOrder={handelClickOrder}
                  Sort={sort}
                  handleSort={handleSort}
                  finalBeforePagination={finalBeforePagination}
                ></SecondBox>
                {/* <FirstBox
                getRangeOfSize={getRangeOfSize}
                selectedBrands={selectedBrands}
                handelBrandClick={handelBrandClick}
                listOfSizes={listOfSizes}
                handelSizeClick={handelSizeClick}
                filters={filters}
                finalBeforePagination={finalBeforePagination}
                                openCloseBurgerMenu={openCloseBurgerMenu}
                                handleValue={handleValue}
                  handelPriceClick={handelPriceClick}
                  handelClickInStock={handelClickInStock}
                  handelClickDiscount={handelClickDiscount}
                  handelColorClick={handelColorClick}
                  handelAllAttributesClick={handelAllAttributesClick}
                  products={products}
                  searchWords={searchWordMenu}
                  filteredByStock={filteredByStock}
                  filteredByDiscount={filteredByDiscount}
                  discount={discount}
                  stock={stock}
                  deletFilterOfDiscountStock={
                    deletFilterOfDiscountStock
                  }
                  RangePriceClassName={RangePriceClassName}
                  handleFilterOfPrice={handleFilterOfPrice}
                  colors={colors}
                  handleColor={handleColor}
                  allAttributesSelected={allAttributesSelected}
                  specificSelectedItems={specificSelectedItems}
                  indexHolder={indexHolder}
                  handleAllAttributes={handleAllAttributes}
                ></FirstBox> */}

                <WholeProduct
                                loading={loading}
                finalPaginateProducts={finalPaginateProducts}
                  getProducts={getProducts}
                  allAttributeItemS={allAttributeItems}
                  sortproducts={sortproducts}
                  paginate={paginate}
                  
                ></WholeProduct>
                <Pagination
                loading={loading}
                  sortproducts={sortproducts}
                  pagination={pagination}
                  handlePgeChange={handlePgeChange}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}

export default LastCategory;















