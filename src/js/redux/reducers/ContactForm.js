import {
  ACTION_SUBMIT_CONTACTS_FORM,
} from './../constants/ActionTypes';

export const contactFormState = (state = null, action) => {
  switch (action.type) {
    case ACTION_SUBMIT_CONTACTS_FORM:
      {
        console.log('contactFormState action: ', action);
        if (action.payload.result) {
          return action.payload.result.toString();
        }
        return 'false';
      }
    default:
      return null;
  }
};

export default contactFormState;
