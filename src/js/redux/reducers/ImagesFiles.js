import {
  ACTION_FETCH_IMAGES_LIST,
  ACTION_IMAGE_UPLOAD,
} from './../constants/ActionTypes';

export const imagesFiles = (state = [], action) => {
  switch (action.type) {
    case ACTION_FETCH_IMAGES_LIST:
      {
        return action.payload.imagesFiles ? action.payload.imagesFiles : state;
      }
    case ACTION_IMAGE_UPLOAD:
      {
        return [].concat(state).concat(action.payload.data);
      }
    default:
      return state;
  }
};

export default imagesFiles;
