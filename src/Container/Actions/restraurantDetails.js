import axios from "axios";
import { constants } from "../../constants";
import { restaurantDetailsActions } from "./actions";

const fetchRestaurantRequest = () => {
  return {
    type: restaurantDetailsActions.FETCH_RESTAURANT_DETAILS_REQUEST,
  };
};

const fetchRestaurantSuccess = (restaurants) => {
  return {
    type: restaurantDetailsActions.FETCH_RESTAURANT_DETAILS_SUCCESS,
    payload: restaurants,
  };
};

const fetchRestaurantFailure = (error) => {
  return {
    type: restaurantDetailsActions.FETCH_RESTAURANT_DETAILS_FAILURE,
    payload: error,
  };
};

export const fetchRestaurantsDetails = (restaurant) => {
  return function (dispatch) {
    dispatch(fetchRestaurantRequest());
    axios({
      method: "GET",
      url: `${constants.hosts.localhost}/restaurant/${restaurant}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch(fetchRestaurantSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchRestaurantFailure(error.message));
      });
  };
};
