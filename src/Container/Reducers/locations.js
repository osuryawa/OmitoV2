import { locationsActions } from "../Actions/actions";

const initialState = {
  loading: false,
  locationsData: [],
  error: "",
};

export const locations = (state = initialState, action) => {
  switch (action.type) {
    case locationsActions.FETCH_lOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case locationsActions.FETCH_lOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locationsData: action.payload,
        error: "",
      };
    case locationsActions.FETCH_lOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        locationsData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
