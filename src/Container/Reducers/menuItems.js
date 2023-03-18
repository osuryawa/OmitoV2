import { menuItemsActions } from '../Actions/actions'


const initialState = {
    loading: false,
    menuItems: [],
    error: "",
    menuItemsModalIsOpen: false,
};

export const menuItems = (state = initialState, action) => {
    switch (action.type) {
        case menuItemsActions.FETCH_MENUITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case menuItemsActions.FETCH_MENUITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                menuItems: action.payload,
                menuItemsModalIsOpen: true
            }
        case menuItemsActions.FETCH_MENUITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                menuItems: [],
                error: action.payload,
                menuItemsModalIsOpen: false
            }
        default:
            return state;
    }
}