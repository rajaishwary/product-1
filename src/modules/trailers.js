import { getTrailersApi } from "../Services";
import { data } from "../Services/mock";

/* util */
function getGenres(trailers) {
  const results = Object.values(trailers).reduce((acc, curr) => {
    acc.push(...curr.EventGenre.split("|"));
    return [...new Set(acc)];
  }, []);
  return results;
}

function isGenreSelected(trailerGenre, filterGenres) {
  const tGenres = trailerGenre && trailerGenre.split("|");
  let shouldBeInData = false;
  tGenres.forEach(element => {
    if (!shouldBeInData) {
      shouldBeInData = filterGenres.includes(element);
    }
  });
  return shouldBeInData;
}

/* Constants */
export const FETCH_TRAILERS_REQUEST = "trailers/FETCH_TRAILERS_REQUEST";
export const FETCH_TRAILERS_SUCCESS = "trailers/FETCH_TRAILERS_SUCCESS";

export const ON_FILTER_UPDATE = "trailers/ON_FILTER_UPDATE";

/* Action Creators */
export function getTrailers() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_TRAILERS_REQUEST });
      const trailers = await getTrailersApi();
      if (!!trailers) {
        dispatch({ type: FETCH_TRAILERS_SUCCESS, data: trailers });
      }
    } catch (error) {
      // Mock data
      dispatch({ type: FETCH_TRAILERS_SUCCESS, data });
      console.log(error);
    }
  };
}

export function updateFilters(data) {
  return async (dispatch, getState) => {
    try {
      const trailersClone = JSON.parse(
        JSON.stringify(getState().trailers.initialTrailers)
      );
      const filtersClone = JSON.parse(
        JSON.stringify(getState().trailers.filters)
      );
      const updatedFilters = Object.assign({}, filtersClone, data);
      const filteredTrailers = Object.values(trailersClone).filter(trailer => {
        if (!updatedFilters.languages.length && !updatedFilters.genres.length) {
          return true;
        }
        if (!updatedFilters.languages.length) {
          return isGenreSelected(trailer.EventGenre, updatedFilters.genres);
        }
        if (!updatedFilters.genres.length) {
          return updatedFilters.languages.includes(trailer.EventLanguage);
        }
        return (
          isGenreSelected(trailer.EventGenre, updatedFilters.genres) &&
          updatedFilters.languages.includes(trailer.EventLanguage)
        );
      });
      dispatch({
        type: ON_FILTER_UPDATE,
        data: { trailers: filteredTrailers, filters: updatedFilters }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* Reducer */
const initialState = {
  languages: [],
  initialTrailers: null,
  trailers: null,
  isRequesting: false,
  genres: [],
  filters: {
    mode: "COMING_SOON",
    popularity: "Popular",
    languages: [],
    genres: []
  }
};

export default function trailers(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRAILERS_REQUEST: {
      return { ...state, trailers: [], isRequesting: true };
    }
    case FETCH_TRAILERS_SUCCESS: {
      return {
        ...state,
        trailers: action.data[1],
        initialTrailers: action.data[1],
        languages: action.data[0],
        genres: getGenres(action.data[1]),
        isRequesting: false
      };
    }

    case ON_FILTER_UPDATE: {
      return {
        ...state,
        trailers: action.data.trailers,
        filters: action.data.filters
      };
    }

    default:
      return state;
  }
}
