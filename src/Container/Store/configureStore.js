import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";
import logger from "redux-logger";

export default function configureStore() {
  let store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
  return store;
}
