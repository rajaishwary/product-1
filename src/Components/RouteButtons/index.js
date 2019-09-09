import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "../../Components";
import "./styles.scss";

class RouteButtons extends React.Component {

  handleClick = () => {
    this.props.history.push('/trailers');
  }

  render() {
    return (
      <div className="buttons-container">
          <Button onClick={this.handleClick}>{"Trailers"}</Button>
      </div>
    );
  }
}

export default withRouter(RouteButtons);