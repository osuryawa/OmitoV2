import { restaurantDetailsActions } from "../Actions/actions";

const initialState = {
  loading: false,
  restaurant: {},
  error: "",
};

export const restaurantDetails = (state = initialState, action) => {
  switch (action.type) {
    case restaurantDetailsActions.FETCH_RESTAURANT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case restaurantDetailsActions.FETCH_RESTAURANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        restaurant: action.payload,
      };
    case restaurantDetailsActions.FETCH_RESTAURANT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        restaurant: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
