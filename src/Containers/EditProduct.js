import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct, getPricingInfo } from "../modules/products";
import "./styles.css";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.nameRef = null;
    this.weightRef = null;
    this.availabilityRef = null;
    this.productUrlRef = null;
    this.state = {
      product: props.product || null,
      errors: []
    };
  }

  componentDidMount() {
    this.props.dispatch(getPricingInfo());
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.product) {
      this.props.dispatch(
        updateProduct(this.props.product.name, this.state.product)
      );
      this.props.history.replace("/");
    }
  };

  handleChange = (name, value) => {
    const prod = JSON.parse(JSON.stringify(this.state.product));
    if (prod && prod.name) {
      prod[`${name}`] = value;
      this.setState({ product: prod });
    }
  };

  dropDown = () => {
    const { pricingTier } = this.state.product;
    const optionsArr = this.props.pricingInfo[pricingTier];
    return (
      <select>
        {optionsArr.map((opt, id) => (
          <option
            key={id}
            value={`${opt}`}
            onChange={e => this.handleChange("pricingTier", e.target.value)}
          >
            {opt}
          </option>
        ))}
      </select>
    );
  };

  render() {
    const { product } = this.state;
    return (
      product && (
        <form className="edit-product">
          {"Edit Product"}
          <input
            name="name"
            value={product.name}
            onChange={e => this.handleChange("name", e.target.value)}
          />
          <input
            name="weight"
            value={product.weight}
            onChange={e => this.handleChange("weight", e.target.value)}
          />
          <input
            name="availability"
            value={product.availability}
            onChange={e => this.handleChange("availability", e.target.value)}
          />
          <input
            name="productUrl"
            value={product.productUrl}
            onChange={e => this.handleChange("productUrl", e.target.value)}
          />
          <input
            type="radio"
            name="infotype"
            value="budget"
            label="budget"
            onChange={e => this.handleChange("pricingTier", "budget")}
            checked={product.pricingTier === "budget"}
          />
          <label for="budget">Budget</label>
          <input
            type="radio"
            name="infotype"
            value="premier"
            label="premier"
            onChange={e => this.handleChange("pricingTier", "premier")}
            checked={product.pricingTier === "premier"}
          />
          <label for="premier">Premier</label>
          {this.dropDown()}
          <input
            type="checkbox"
            name="isEditable"
            checked={product.isEditable}
            onChange={e => this.handleChange("isEditable", !product.isEditable)}
          />
          <label for="isEditable">isEditable</label>
          <button onClick={e => this.handleSubmit(e)}>{"Update"}</button>
        </form>
      )
    );
  }
}

function mapStateToProps({ products }) {
  console.log(products);
  return {
    product: products.product,
    pricingInfo: products.pricingInfo
  };
}

export default connect(mapStateToProps)(EditProduct);
