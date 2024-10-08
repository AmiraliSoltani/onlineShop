import React, { Fragment } from 'react';
import "./../../../css/top__first__box.css"

const FirstBox = (props) => {
  const {
    selectedBrands,
    handelBrandClick,
    sizes,
    listOfSizes,
    filteredBySize,
    finalBeforePagination,
    searchWords,
    deletFilterOfSearch,
    filteredByStock,
    filteredByDiscount,
    discount,
    stock,
    deletFilterOfDiscountStock,
    RangePriceClassName,
    handleFilterOfPrice,
    colors,
    handleColor,
    handelAllAttributesClick,
    handelPriceClick,
    handelClickInStock,
    handelClickDiscount,
    handelColorClick,
    openCloseBurgerMenu,
    specificSelectedItems,
    indexHolder,
    statusOfMenu,
    handleValue,
    getRangeOfSize,
    handelSizeClick
  } = props;

  console.log("listOfSizes", listOfSizes);
  console.log("selectedBrands", selectedBrands);

  const creatingAttribute = () => {
    let result = [];
    for (let key in specificSelectedItems) {
      let index = indexHolder.filter(c => c.attribute === key);
      specificSelectedItems[key].map(filter => {
        result.push([key, filter, index[0].index]);
      });
    }
    return result;
  }

  const extendSize = (sizeKey) => {
    console.log("sizeKey", sizeKey);
    console.log("sizeKey", getRangeOfSize());
    let pickedSize = getRangeOfSize().filter(size => size.description == sizeKey)[0];
    console.log("sizeKey", pickedSize);
    handelSizeClick(pickedSize);
  }

  let showDiscount = discount === true;
  let showStock = stock === true;

  return (
    <div className="first__box">
      {/* <div className="number__of__product">
        {finalBeforePagination?.length > 0 &&
          <Fragment>
            <span className="number">{finalBeforePagination.length}</span>
            <span>Products have been found</span>
          </Fragment>
        }
      </div> */}

      <div className="advanced__search" onClick={openCloseBurgerMenu}>Advanced Search</div>

      {searchWords.length > 0 &&
        <div className="one__top__filter" onClick={() => handleValue({ target: { value: '' } })}>
          {/* <div className="separator"></div> */}
          <span className="name__of__filter">{searchWords}</span>
        </div>
      }

      {RangePriceClassName.map((price, index) => (
        <Fragment key={index}>
          {price.status === true &&
            <div className="one__top__filter" onClick={() => handelPriceClick(index)}>
              {/* <div className="separator"></div> */}
              <span className="name__of__filter">
                {index === 0 && <span>{`Under $${price.secondRange}`}</span>}
                {index === RangePriceClassName.length - 1 && <span>{`Above $${price.firtRange}`}</span>}
                {index > 0 && index < RangePriceClassName.length - 1 && (
                  <span>{`Between $${price.firtRange} and $${price.secondRange + 1}`}</span>
                )}
              </span>
            </div>
          }
        </Fragment>
      ))}

      {showStock &&
        <div className="one__top__filter" onClick={handelClickInStock}>
          {/* <div className="separator"></div> */}
          <span className="name__of__filter">Only In-Stock Items</span>
        </div>
      }

      {showDiscount &&
        <div className="one__top__filter" onClick={handelClickDiscount}>
          {/* <div className="separator"></div> */}
          <span className="name__of__filter">Only Discounted Items</span>
        </div>
      }

      {colors.length > 0 && colors.map((color, index) => (
        <div className="one__top__filter" onClick={() => handelColorClick(color)} key={index}>
          {/* <div className="separator"></div> */}
          <span className="name__of__filter">{`Color: ${color.title}`}</span>
        </div>
      ))}

      {/* Display Sizes */}
      {listOfSizes && Object.keys(listOfSizes).length > 0 && (
        <div className="sizes__filter">
          {Object.keys(listOfSizes).map((sizeKey, index) => (
            listOfSizes[sizeKey] === true && ( // Only show if size is selected
              <div className="one__top__filter" key={index} onClick={() => extendSize(sizeKey)}>
                {/* <div className="separator"></div> */}
                <span className="name__of__filter">
                  {`Size: ${sizeKey}`}  {/* Display the selected size key */}
                </span>
              </div>
            )
          ))}
        </div>
      )}

      {selectedBrands.length > 0 && selectedBrands.map((brand, index) => (
        <div className="one__top__filter" onClick={() => handelBrandClick(brand)} key={index}>
          {/* <div className="separator"></div> */}
          <span className="name__of__filter">{`Brand: ${brand}`}</span>
        </div>
      ))}

      {creatingAttribute() && creatingAttribute().map((main, index) => (
        <div className="one__top__filter" onClick={() => handelAllAttributesClick(main[0], main[2], main[1].parentId, main[1].title, main[1])} key={index}>
          {/* <div className="separator"></div> */}
          <span className="name__of__filter">{`${main[0]}: ${main[1].title}`}</span>
        </div>
      ))}
    </div>
  );
}

export default FirstBox;
