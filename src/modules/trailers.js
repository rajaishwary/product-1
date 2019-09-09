import { getTrailersApi } from "../Services";
import { data } from '../Services/mock';

/* Constants */
export const FETCH_TRAILERS_REQUEST = "home/FETCH_TRAILERS_REQUEST";
export const FETCH_TRAILERS_SUCCESS = "home/FETCH_TRAILERS_SUCCESS";

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

/* Reducer */
const initialState = {
  languages: [],
  trailers: null,
  isRequesting: false
};

export default function trailers(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRAILERS_REQUEST: {
      return { ...state, trailers: [], isRequesting: true };
    }
    case FETCH_TRAILERS_SUCCESS: {
      return { ...state, trailers: action.data[1], languages: action.data[0], isRequesting: false };
    }

    default:
      return state;
  }
}
