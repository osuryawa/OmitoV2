// axios({
//     method: "GET",
//     url: `http://localhost:4567/menuitems/${restId}`,
//     headers: { "Content-Type": "application/json" },
// })
//     .then((response) => {
//         this.setState({
//             menuItems: response.data.items,
//             menuItemsModalIsOpen: true,
//         });
//     })
//     .catch();

import axios from "axios";
import { menuItemsActions } from './actions'

const fetchMenuItemsRequest = () => {
    return {
        type: menuItemsActions.FETCH_MENUITEMS_REQUEST
    }
}

const fetchMenuItemsSuccess = (restaurant) => {
    return {
        type: menuItemsActions.FETCH_MENUITEMS_SUCCESS,
        payload: restaurant
    }
}

const fetchMenuItemsFailure = (error) => {
    return {
        type: menuItemsActions.FETCH_MENUITEMS_FAILURE,
        payload: error
    }
}

export const fetchMenuItems = (restId) => {
    return function (dispatch) {
        dispatch(fetchMenuItemsRequest());
        axios({
            method: "GET",
            url: `http://localhost:4567/menuitems/${restId}`,
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                dispatch(fetchMenuItemsSuccess(response.data.items))
            })
            .catch((error) => {
                dispatch(fetchMenuItemsFailure(error.message))
            });
    }
}
