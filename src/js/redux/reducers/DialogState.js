import React from 'react';
import {
  ACTION_SHOW_DIALOG,
  ACTION_CLOSE_DIALOG,
  ACTION_COURSE_SAVE,
} from './../constants/ActionTypes';
import {
  DIALOG_CLOSE_ACTION,
} from './../constants/Constants';

export const dialogState = (state = { open: false }, action) => {
  switch (action.type) {
    case ACTION_SHOW_DIALOG:
      {
        return { open: true, ...action.payload };
      }
    case ACTION_CLOSE_DIALOG:
      console.log('action ', action);
      {
        return { open: false };
      }
    case ACTION_COURSE_SAVE:
      {
        if (!action.payload.result) {
          // show saving error dialog
          return ({
            open: true,
            actions: [{
              action: DIALOG_CLOSE_ACTION,
              label: 'Close',
              primary: true,
            }],
            caption: 'Error',
            text: `${action.payload.err}`,
          });
        }
        return state;
      }
    default:
      return state;
  }
};

export default dialogState;
