import axios from "axios";
import { locationsActions } from "./actions";
import { constants } from "../../constants";

export const isLoading = () => {
  return {
    type: locationsActions.FETCH_lOCATIONS_REQUEST,
  };
};

const locationLoaded = (mealTypes) => {
  return {
    type: locationsActions.FETCH_lOCATIONS_SUCCESS,
    payload: mealTypes,
  };
};

const setIsError = (error) => {
  return {
    type: locationsActions.FETCH_lOCATIONS_FAILURE,
    payload: error.message,
  };
};

export const fetchLocations = () => {
  return (dispatch) => {
    dispatch(isLoading());
    axios
      .get(`${constants.hosts.localhost}/locations`)
      .then((response) => {
        dispatch(locationLoaded(response.data));
      })
      .catch((error) => {
        dispatch(setIsError(error));
      });
  };
};
