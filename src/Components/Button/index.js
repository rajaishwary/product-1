import React from "react";
import classnames from "classnames";
import "./styles.scss";

export default class Button extends React.Component {
  getClassName = (type = "primary") => {
    switch (type) {
      default:
      case "primary":
        return "button__primary";
      case "secondary":
        return "button__secondary";
      case "active":
        return "button__active";
      case "danger":
        return "button__danger";
    }
  };

  handleClick = e => {
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const { type, className="" } = this.props;
    return (
      <button
        className={classnames("button", this.getClassName(type), className)}
        onClick={this.handleClick}
      >
        {this.props.children || "Add Text"}
      </button>
    );
  }
}
