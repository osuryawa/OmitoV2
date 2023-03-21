import axios from "axios";
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

export const fetchRestaurants = (restaurant) => {
  return function (dispatch) {
    dispatch(fetchRestaurantRequest());
    axios({
      method: "GET",
      url: `http://100.25.134.2:4567/restaurant/${restaurant}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log('res', response.data)
        dispatch(fetchRestaurantSuccess(response.data));
        // this.setState({
        //     restaurant: response.data.restaurant,
        //     restId: restaurant,
        // });
      })
      .catch((error) => {
        dispatch(fetchRestaurantFailure(error.message));
        // console.log(err);
      });
  };
};
