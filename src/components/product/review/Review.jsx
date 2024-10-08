import React from "react";
import "./../../../css/review.css";

function Review({product }) {

    return (
      <div className="main__review">
      <div dangerouslySetInnerHTML={{ __html: product.productHighlights }} />
      </div>
    );
}

export default Review;
