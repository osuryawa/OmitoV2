import axios from "axios";
import { mealTypesActions } from "./actions";
import { constants } from "../../constants";

export const isLoading = () => {
  return {
    type: mealTypesActions.FETCH_MEALTYPE_REQUEST,
  };
};

const mealTypesLoaded = (mealTypes) => {
  return {
    type: mealTypesActions.FETCH_MEALTYPE_SUCCESS,
    payload: mealTypes,
  };
};

const setIsError = (error) => {
  return {
    type: mealTypesActions.FETCH_MEALTYPE_FAILURE,
    payload: error.message,
  };
};

export const fetchMealTypes = () => {
  return (dispatch) => {
    dispatch(isLoading());
    axios
      .get(`${constants.hosts.localhost}/mealtypes`)
      .then((response) => {
        dispatch(mealTypesLoaded(response.data));
      })
      .catch((error) => {
        dispatch(setIsError(error));
      });
  };
};
