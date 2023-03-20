import { restaurantsActions } from "../Actions/actions";

const initialState = {
  loading: false,
  restaurants: [],
  error: "",
};

export const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case restaurantsActions.FETCH_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case restaurantsActions.FETCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
        error: "",
      };
    case restaurantsActions.FETCH_RESTAURANTS_FAILURE:
      return {
        ...state,
        loading: false,
        restaurants: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
