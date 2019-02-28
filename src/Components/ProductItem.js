import React, { Component } from "react";
import "./product-item.css";

const ProductItem = ({ product, editProduct }) => {
  return (
    <div className="product-item">
      <p>{product.name}</p>
      <p>{product.weight}</p>
      <p>{product.availability}</p>
      <div>{product.isEditable ? <button onClick={() => editProduct(product.name)}>{"Edit"}</button> : null}</div>
    </div>
  );
};

export default ProductItem;
