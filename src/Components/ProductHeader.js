import React, { Component } from "react";
import "./product-item.css";

const ProductHeader = () => {
  return (
    <div className="product-item header">
      <span className="item-col">{"Name"}</span>
      <span className="item-col">{"Weight"}</span>
      <span className="item-col">{"Availability"}</span>
      <span className="item-col">{"Editable"}</span>
    </div>
  );
};

export default ProductHeader;