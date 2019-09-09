import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Header } from "../../Components/Header";
import { ExContainer } from "./ExContainer";

const width = document.get;

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        <ExContainer />
      </div>
    );
  }
}

export default withRouter(Home);
