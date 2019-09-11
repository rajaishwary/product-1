import React from "react";
import "./styles.scss";
import { runValidation } from "./utils";
import { Button } from "../../Components";

export default class ExContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: { dupsInNums: [], dupsInRange: {}, result: [] },
    };
  }

  handleChange = event => {
    const text = event.target.value;
    const error = runValidation(text);
    this.setState({ value: text, error });
  };

  render() {
    const { error: { dupsInNums, dupsInRange, result } } = this.state;
    return (
      <div className="ex-container">
        <React.Fragment>
          <input className="bar" value={this.state.value} onChange={event => this.handleChange(event)} />
          {dupsInNums.length || Object.keys(dupsInRange).length || result.length ? (<React.Fragment>
            <div>Duplicates numbers: {dupsInNums.join(", ") || "--"}</div>
            <div>Duplicates in range: {Object.keys(dupsInRange).map(range => dupsInRange[range].join(", ")) || "--"}</div>
            <div>Result: {result.join(", ")}</div>
          </React.Fragment>) : null}
          <Button className="bar">{"GET RESULTS"}</Button>
        </React.Fragment>
      </div>
    );
  }
}
