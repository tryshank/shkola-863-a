import {
  ACTION_SHOW_DIALOG,
  ACTION_CLOSE_DIALOG,
} from './../constants/ActionTypes';

export const dialogState = (state = { open: false }, action) => {
  switch (action.type) {
    case ACTION_SHOW_DIALOG:
      {
        return { open: true, actions: action.payload.actions, text: action.payload.text };
      }
    case ACTION_CLOSE_DIALOG:
      {
        return { open: false };
      }
    default:
      return state;
  }
};

export default dialogState;
