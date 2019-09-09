import React from "react";
import classnames from "classnames";
import "./styles.scss";

export default class Button extends React.Component {

  getClassName = (type = 'primary') => {
    switch(type) {
      default:
      case 'primary': return "button__primary";
      case 'danger': return "button__danger";
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    if(this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const { type } = this.props;
    return (
      <button 
        className={classnames("button", this.getClassName(type))}
        onClick={this.handleClick}
      >
        {this.props.children || "Add Text"}
      </button>
    );
  }
}