import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts, editProduct } from "../modules/products";
import ProductItem from "../Components/ProductItem";
import ProductHeader from "../Components/ProductHeader";
import {
  withRouter
} from 'react-router-dom'

class Products extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  hasData = () => {
    const { products } = this.props;
    return products && Array.isArray(products) && products.length
      ? true
      : false;
  };

  editProduct = name => {
    this.props.history.push('/edit-product');
    this.props.dispatch(editProduct(name));
    localStorage.setItem("selectedProduct", JSON.stringify(name));
  };

  productsList = () => {
    const { products } = this.props;
    return products.map((product, id) => (
      <ProductItem key={id} product={product} editProduct={this.editProduct} />
    ));
  };

  render() {
    return (
      <div>
        {this.hasData ? (
          <div className="products-container">
            <h3 className="list-title">{"Product List"}</h3>
            <ProductHeader />
            {this.productsList()}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ products }) {
  return {
    products: products.products
  };
}

export default withRouter(connect(mapStateToProps)(Products));
