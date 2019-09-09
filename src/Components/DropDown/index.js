import React, { Component } from "react";
import classnames from "classnames";
import "./styles.scss";

class DropDown extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };
  }

  showMenu = event => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("onmouseleave", this.closeMenu);
    });
  };

  closeMenu = event => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("onmouseleave", this.closeMenu);
    });
  };

  get isMultiSelect() {
    return this.props.multi || false;
  }

  render() {
    const { selected, items } = this.props;
    return (
      <div className="dropdown" onMouseLeave={this.closeMenu}>
        <div className="dropbtn" onMouseEnter={this.showMenu}>
          {this.isMultiSelect ? selected.join(",") : selected}
          <i class="material-icons">keyboard_arrow_down</i>
        </div>

        {this.state.showMenu ? (
          <div
            className="dropdown-content"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            {items.map((item, index) => (
              <div className={classnames("item", {'item__item-selected': selected.includes(item)})} key={index}>
                {this.isMultiSelect ? (
                  <i
                    className={classnames("material-icons")}
                  >
                    {selected.includes(item) ? "check_box" : "crop_square"}
                  </i>
                ) : null}
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropDown;
