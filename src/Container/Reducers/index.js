import { combineReducers } from "redux";
import { restaurantDetails } from "./restraurantDetails";
import { mealTypes } from "./mealTypes";
import { menuItems } from "./menuItems";
import { locations } from "./locations";
import { restaurants } from "./restaurants";
const rootReducer = combineReducers({
  mealTypes,
  restaurantDetails,
  menuItems,
  locations,
  restaurants,
});

export default rootReducer;
