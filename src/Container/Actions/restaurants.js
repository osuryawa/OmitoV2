import axios from "axios";
import { constants } from "../../constants";
import { restaurantsActions } from "./actions";

const fetchRestaurantRequest = () => {
  return {
    type: restaurantsActions.FETCH_RESTAURANTS_REQUEST,
  };
};

const fetchRestaurantSuccess = (restaurants) => {
  return {
    type: restaurantsActions.FETCH_RESTAURANTS_SUCCESS,
    payload: restaurants,
  };
};

const fetchRestaurantFailure = (error) => {
  return {
    type: restaurantsActions.FETCH_RESTAURANTS_FAILURE,
    payload: error,
  };
};

export const fetchRestaurants = (locationId) => {
  return function (dispatch) {
    dispatch(fetchRestaurantRequest());
    axios({
      method: "GET",
      url: `${constants}/restaurants/${locationId}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch(fetchRestaurantSuccess(response.data.restaurants));
      })
      .catch((error) => {
        dispatch(fetchRestaurantFailure(error));
      });
  };
};
