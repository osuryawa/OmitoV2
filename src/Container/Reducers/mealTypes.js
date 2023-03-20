import { mealTypesActions } from "../Actions/actions";

const initialState = {
  loading: false,
  mealTypeData: [],
  error: "",
};

export const mealTypes = (state = initialState, action) => {
  switch (action.type) {
    case mealTypesActions.FETCH_MEALTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case mealTypesActions.FETCH_MEALTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        mealTypeData: action.payload,
        error: "",
      };
    case mealTypesActions.FETCH_MEALTYPE_FAILURE:
      return {
        ...state,
        loading: false,
        mealTypeData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
