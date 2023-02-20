import { actions } from "../Actions/actions";

const initialState = {
  loading: false,
  mealTypeData: [],
  error: "",
};

export const mealTypes = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MEALTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_MEALTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        mealTypeData: action.payload,
        error: "",
      };
    case actions.FETCH_MEALTYPE_FAILURE:
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
