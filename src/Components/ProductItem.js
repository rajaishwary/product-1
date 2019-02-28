import React, { Component } from "react";
import "./product-item.css";

const ProductItem = ({ product, editProduct }) => {
  return (
    <div className="product-item">
      <span className="item-col">{product.name}</span>
      <span className="item-col">{product.weight}</span>
      <span className="item-col">{product.availability}</span>
      <div className="item-col">{product.isEditable ? <button onClick={() => editProduct(product.name)}>{"Edit"}</button> : null}</div>
    </div>
  );
};

export default ProductItem;
