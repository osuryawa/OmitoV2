import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { mealTypes } from "../Reducers/mealTypes";

export default function configureStore() {
  let store = createStore(
    mealTypes,
    applyMiddleware(thunk, logger)
  );
  return store;
}
