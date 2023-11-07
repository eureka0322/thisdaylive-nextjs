import { 
  GET_ACCOUNT_THEME,
  SET_ACCOUNT_THEME, 
  SET_SEARCHBAR_TOGGLE
} from "../types";

const initialState = {
  theme: 'light',
  searchbar: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case SET_SEARCHBAR_TOGGLE:
      return {
        ...state,
        searchbar: action.searchbar,
      };
    default:
      return state;
  }
};

export default accountReducer;
