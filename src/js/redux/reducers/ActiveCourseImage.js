import {
  ACTION_IMAGE_UPLOAD,
  ACTION_IMAGE_CHANGE,
} from './../constants/ActionTypes';

// TODO: combine with activeCourseId / imagesFiles ?
export const activeCourseImage = (state = null, action) => {
  switch (action.type) {
    case ACTION_IMAGE_UPLOAD:
    case ACTION_IMAGE_CHANGE:
      {
        return action.payload.filename;
      }
    default:
      return null;
  }
};

export default activeCourseImage;
