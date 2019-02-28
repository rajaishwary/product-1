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
      <select className="drop-down" onChange={e => this.handleChange("priceRange", e.target.value)}>
        {optionsArr.map((opt, id) => (
          <option
            key={id}
            value={`${opt}`}
            selected={opt === this.state.product.priceRange}
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
          <h3>{"Edit Product"}</h3>
          <label>Name</label>
          <input
            className="text-input"
            name="name"
            value={product.name}
            onChange={e => this.handleChange("name", e.target.value)}
          />
          <label>Weight</label>
          <input
            className="text-input"
            name="weight"
            value={product.weight}
            onChange={e => this.handleChange("weight", e.target.value)}
          />
          <label>Availability</label>
          <input
            className="text-input"
            name="availability"
            value={product.availability}
            onChange={e => this.handleChange("availability", e.target.value)}
          />
          <label>Product Url</label>
          <input
            className="text-input"
            name="productUrl"
            value={product.productUrl}
            onChange={e => this.handleChange("productUrl", e.target.value)}
          />
          <div className="radio-btn-container">
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
          </div>
          <label>{"Price Range"}</label>
          {this.dropDown()}
          <div className="editable-container">
            <input
              type="checkbox"
              name="isEditable"
              checked={product.isEditable}
              onChange={e =>
                this.handleChange("isEditable", !product.isEditable)
              }
            />
            <label for="isEditable">isEditable</label>
          </div>
          <button className="update-btn" onClick={e => this.handleSubmit(e)}>{"Update"}</button>
        </form>
      )
    );
  }
}

function mapStateToProps({ products }) {
  return {
    product: products.product,
    pricingInfo: products.pricingInfo
  };
}

export default connect(mapStateToProps)(EditProduct);
