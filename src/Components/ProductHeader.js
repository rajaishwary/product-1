import React, { Component } from "react";
import "./product-item.css";

const ProductHeader = () => {
  return (
    <div className="product-item">
      <p>{"Name"}</p>
      <p>{"Weight"}</p>
      <p>{"Availability"}</p>
      <p>{"Editable"}</p>
    </div>
  );
};

export default ProductHeader;