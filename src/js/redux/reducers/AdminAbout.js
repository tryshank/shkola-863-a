import {
  ACTION_GET_ABOUT_TEXT,
  ACTION_SAVE_ABOUT,
} from './../constants/ActionTypes';
import * as Constants from '../constants/Constants';

export const adminAbout = (state = [], action) => {
  switch (action.type) {
    case ACTION_GET_ABOUT_TEXT:
      {
        if (!Array.isArray(action.payload.docs)) {
          console.error('response from DB need to be Array');
        } else {
          return {
            ...state,
            state: Constants.EMPTY,
            about: action.payload.docs[0],
            initial: {
              about: action.payload.docs[0],
            },
          };
        }
        return state;
      }
    case ACTION_SAVE_ABOUT:
      {
        if (!action.payload.result) {
          console.error('response from DB save error');
        } else {
          return state;
        }
        return state;
      }
    default:
      return state;
  }
};

export default adminAbout;
