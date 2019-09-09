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

  goToHome = () => {
    this.props.history.replace("/");
  };

  get trailers() {
    return !!this.props.trailers ? Object.values(this.props.trailers) : [];
  }

  render() {
    return (
      <div className="main-container trailers">
        <div className="filters-header">
          <Button onClick={this.goToHome}>{"Home"}</Button>
          <Button>{"Comming Soon"}</Button>
          <Button>{"Now Showing"}</Button>
        </div>
        <div className="applied-filters">{"filters applied"}</div>
        <div className="trailers-container">
          {this.trailers.length
            ? this.trailers.map(trailer => (
                <div className="card" key={trailer.EventCode}>
                  <div
                    className="card-img"
                    style={{
                      backgroundImage: `url(https://in.bmscdn.com/events/moviecard/${trailer.EventCode}.jpg)`
                    }}
                  />
                  <div className="card-details">{trailer.EventTitle}</div>
                </div>
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
