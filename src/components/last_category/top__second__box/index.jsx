import React, { Component, Fragment } from "react";
import "./../../../css/top__second__box.css";

class SecondBox extends Component {
  state = {};

  getClassName = (order, index) => {
    let { Sort } = this.props;
    let className = `number${index}`;
    if (Sort.path === order.path && Sort.order === order.sort)
      className += " bg-orange c-white";
    return className;
  };

  render() {
    const orders = [
      { name: "Most Expensive", path: "price", sort: "desc" },
      { name: "Cheapest", path: "price", sort: "asc" },
      { name: "Newest", path: "_id", sort: "desc" },
      { name: "Most Popular", path: "popularity", sort: "desc" },
      { name: "Best Selling", path: "sold", sort: "desc" },
      { name: "Most Viewed", path: "visited", sort: "desc" },
    ];
    
    let { handleSort, handelClickOrder , finalBeforePagination } = this.props;
    
    return (
      <div className="second__box ">

        <div className="sort__icon">
          <img src={require("./../../../assets/icons/filter.png")} alt="sort" />
          <span>Sort by</span>
        </div>
        <div className="sort__name">
          {orders.map((order, index) => (
            <span
              className={this.getClassName(order, index)}
              onClick={() => handelClickOrder(order)}
              key={index}
            >
              {order.name}
            </span>

          ))}
{/* <span className="number">{finalBeforePagination.length}</span> */}
        </div>
        {/* <span className="product">{finalBeforePagination.length} Products</span> */}

      </div>
    );
  }
}

export default SecondBox;
