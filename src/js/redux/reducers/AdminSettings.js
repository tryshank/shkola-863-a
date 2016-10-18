import {
  ACTION_GET_SETTINGS_MAIL,
  ACTION_SAVE_SETTINGS,
} from './../constants/ActionTypes';
import * as Constants from '../constants/Constants';

export const adminSettings = (state = null, action) => {
  console.log('adminSettings action: ', action);
  switch (action.type) {
    case ACTION_GET_SETTINGS_MAIL:
      {
        if (action.payload.result) {
          return {
            state: Constants.EMPTY,
            mail: action.payload.mail,
          };
        }
        return null;
      }
    case ACTION_SAVE_SETTINGS:
      {
        if (action.payload.result) {
          return {
            ...state,
            state: action.payload.result.toString(),
          };
        }
        return null;
      }
    default:
      return state;
  }
};

export default adminSettings;
