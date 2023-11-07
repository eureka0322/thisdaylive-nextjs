import { 
  SET_ACCOUNT_THEME,
SET_SEARCHBAR_TOGGLE } from "../types";
  import { AnyAction, Dispatch } from 'redux';

interface AccountThemeAction {
  type: string;
  theme: string;
}

// export const setAccountSettingTheme = (theme : string) => async (dispatch: (arg0: AccountThemeAction) => void) => {
//   dispatch({
//     type: SET_ACCOUNT_THEME,
//     theme: theme,
//   });
// };


export const setAccountSettingTheme = (theme) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_ACCOUNT_THEME,
    theme: theme,
  });
};

export const setSearchBarToggle = (toggle) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_SEARCHBAR_TOGGLE,
    searchbar: toggle,
  });
};

