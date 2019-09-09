import React, { Component } from "react";
import classnames from "classnames";
import "./styles.scss";

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      items: props.items || [],
      selected: props.selected || []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items.length !== this.props.items.length) {
      this.setState({ items: this.props.items });
    }
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

  handleSelect = item => {
    if (this.isMultiSelect) {
      let selectedArr = this.state.selected.slice(0);
      if (selectedArr.includes(item)) {
        const itemIndex = selectedArr.indexOf(item);
        selectedArr.splice(itemIndex, 1);
      } else {
        selectedArr.push(item);
      }
      this.setState({ selected: selectedArr }, () =>
        this.props.onSelect(selectedArr)
      );
    } else {
      this.setState({ selected: item }, () => this.props.onSelect(item));
    }
  };

  render() {
    const { selected, items } = this.state;
    const { placeholder } = this.props;
    return (
      <div className="dropdown" onMouseLeave={this.closeMenu}>
        <div className="dropbtn" onMouseEnter={this.showMenu}>
          <span>
            {this.isMultiSelect
              ? selected.length ? selected.join(",") : placeholder
              : selected}
          </span>
          <i className="material-icons">keyboard_arrow_down</i>
        </div>

        {this.state.showMenu ? (
          <div
            className="dropdown-content"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            {items.map((item, index) => (
              <div
                className={classnames("item", {
                  "item__item-selected": selected.includes(item)
                })}
                key={index}
                onClick={() => this.handleSelect(item)}
              >
                {this.isMultiSelect ? (
                  <i className={classnames("material-icons")}>
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
