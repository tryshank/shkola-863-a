import {
  ACTION_IMAGE_UPLOAD,
} from './../constants/ActionTypes';

// TODO: combine with activeCourseId / imagesFiles ?
export const activeCourseImage = (state = null, action) => {
  switch (action.type) {
    case ACTION_IMAGE_UPLOAD:
      {
        return action.payload.filename;
      }
    default:
      return null;
  }
};

export default activeCourseImage;
