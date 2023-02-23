import { combineReducers } from "redux";
import { restaurantsDetails } from "./details";
import { mealTypes } from "./mealTypes";
import { menuItems } from './menuItems'

const rootReducer = combineReducers({
    mealTypes,
    restaurantsDetails,
    menuItems,
})

export default rootReducer;