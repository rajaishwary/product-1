import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTrailers, updateFilters } from "../../modules/trailers";
import { Button, DropDown } from "../../Components";
import { Card } from "./Card";
import { CardDetails } from "./CardDetails";
import "./styles.scss";

class Trailers extends React.Component {
  constructor() {
    super();
    this.trailersRef = React.createRef();
    this.state = {
      index: "NONE",
      key: "",
      trailer: null,
      clickedIdx: ""
    };
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

  handleSelectFilter = name => value => {
    this.props.dispatch(updateFilters({ [name]: value }));
  };

  // get dimensions() {
  //   const { width } = this.trailersRef.getBoundingClientRect();
  //   const index = width / 200;
  //   return width;
  // }

  handleClick = (trailer, index) => {
    // have used hardcoded item count, as added in css width per. Can handle it with @media
    const ITEM_COUNT = 6;
    this.setState({
      index: parseInt(index / ITEM_COUNT) * ITEM_COUNT,
      key: trailer.EventCode,
      trailer,
      clickedIdx: index
    });
  };

  closeTrailerDetails = () => {
    this.setState({
      index: "NONE",
      key: "",
      trailer: null,
      clickedIdx: ""
    });
  };

  render() {
    const { filters, languages, genres } = this.props;
    return (
      <div className="main-container trailers">
        <div className="filters-header">
          <div className="action-btns">
            <Button onClick={this.goToHome}>{"Home"}</Button>
            <Button type="active" onClick={() => this.handleSelectFilter("mode")("COMING_SOON")}>
              {"Coming Soon"}
            </Button>
            <Button type="secondary" onClick={() => this.handleSelectFilter("mode")("NOW_SHOWING")}>
              {"Now Showing"}
            </Button>
          </div>
          <div className="dropdowns">
            <DropDown
              selected={filters.popularity}
              items={["Fresh", "Popular"]}
              onSelect={value => this.handleSelectFilter("popularity")(value)}
            />
            <DropDown
              multi
              selected={filters.languages}
              placeholder={"All languages"}
              items={languages}
              onSelect={value => this.handleSelectFilter("languages")(value)}
            />
            <DropDown
              multi
              selected={filters.genres}
              placeholder={"All genres"}
              items={genres}
              onSelect={value => this.handleSelectFilter("genres")(value)}
            />
          </div>
        </div>
        <div className="applied-filters">
          {filters.languages.map(lang => {
            return <div className="pill">{lang}</div>;
          })}
          {filters.genres.map(genre => {
            return <div className="pill">{genre}</div>;
          })}
        </div>
        <div className="trailers-container" ref={ref => (this.trailersRef = ref)}>
          {this.trailers.length
            ? this.trailers.map((trailer, index) => (
                <React.Fragment>
                  {this.state.index === index ? (
                    <CardDetails
                      key={`${this.state.key}-${this.state.index}`}
                      trailer={this.state.trailer}
                      onClose={this.closeTrailerDetails}
                    />
                  ) : null}
                  <Card
                    key={trailer.EventCode}
                    index={index}
                    isActive={index === this.state.clickedIdx}
                    trailer={trailer}
                    onClick={this.handleClick}
                    EventCode={trailer.EventCode}
                    EventTitle={trailer.EventTitle}
                    width={this.dimensions}
                  />
                </React.Fragment>
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
    languages: trailers.languages,
    genres: trailers.genres,
    filters: trailers.filters
  };
}

export default withRouter(connect(mapStateToProps)(Trailers));
