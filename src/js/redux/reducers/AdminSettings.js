import {
  ACTION_GET_SETTINGS_MAIL,
  ACTION_SAVE_SETTINGS,
} from './../constants/ActionTypes';
import * as Constants from '../constants/Constants';

export const adminSettings = (state = null, action) => {
  switch (action.type) {
    case ACTION_GET_SETTINGS_MAIL:
      {
        if (action.payload.result) {
          return {
            ...state,
            state: Constants.EMPTY,
            mail: action.payload.mail,
            initial: {
              mail: action.payload.mail,
            },
          };
        }
        return state;
      }
    case ACTION_SAVE_SETTINGS:
      {
        if (action.payload.result) {
          const newData = {
            ...state,
            state: action.payload.result.toString(),
            mail: action.payload.settings,
            initial: {
              ...state.initial,
              mail: action.payload.settings,
            },
          };
          return newData;
        }
        return state;
      }
    default:
      return state;
  }
};

export default adminSettings;
