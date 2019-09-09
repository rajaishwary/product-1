import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTrailers, updateFilters } from "../../modules/trailers";
import { Button, DropDown } from "../../Components";
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

  handleSelectFilter = name => value => {
    this.props.dispatch(updateFilters({ [name]: value }));
  };

  render() {
    const { filters, languages, genres } = this.props;
    return (
      <div className="main-container trailers">
        <div className="filters-header">
          <div className="action-btns">
            <Button onClick={this.goToHome}>{"Home"}</Button>
            <Button
              type="active"
              onClick={() => this.handleSelectFilter("mode")("COMING_SOON")}
            >
              {"Coming Soon"}
            </Button>
            <Button
              type="secondary"
              onClick={() => this.handleSelectFilter("mode")("NOW_SHOWING")}
            >
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
        <div className="applied-filters">{"filters applied"}</div>
        <div className="trailers-container">
          {this.trailers.length
            ? this.trailers.map(trailer => (
                <div className="card" key={trailer.EventCode}>
                  <div
                    className="card-img"
                    style={{
                      backgroundImage: `url(https://in.bmscdn.com/events/moviecard/${
                        trailer.EventCode
                      }.jpg)`
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
    languages: trailers.languages,
    genres: trailers.genres,
    filters: trailers.filters
  };
}

export default withRouter(connect(mapStateToProps)(Trailers));
