import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTrailers } from "../../modules/trailers";
import { Button } from "../../Components";
import "./styles.scss";

class Trailers extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(getTrailers());
  }

  get trailers() {
    return !!this.props.trailers ? Object.values(this.props.trailers) : [];
  }

  render() {
    return (
      <div className="main-container trailers">
        <div className="filters-header">
          <Button>{"Comming Soon"}</Button>
          <Button>{"Now Showing"}</Button>
        </div>
        <div className="applied-filters">{"filters applied"}</div>
        <div className="trailers-container">
        {this.trailers.length
          ? this.trailers.map(trailer => (
              <div key={trailer.EventCode} className="trailer">{trailer.EventTitle}</div>
            ))
          : null}
        </div>

      </div>
    );
  }
}

function mapStateToProps({ trailers }) {
  return {
    trailers: trailers.trailers,
    languages: trailers.languages
  };
}

export default withRouter(connect(mapStateToProps)(Trailers));
