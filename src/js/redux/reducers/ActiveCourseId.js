import {
  ACTION_SET_ACTIVE_COURSE_ID,
  ACTION_COURSE_DELETE,
  ACTION_COURSE_ADD,
  ACTION_COURSE_CREATE,
} from './../constants/ActionTypes';

export const activeCourseId = (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_ACTIVE_COURSE_ID:
      {
        return action.payload;
      }
    case ACTION_COURSE_DELETE:
      {
        return null;
      }
    case ACTION_COURSE_ADD:
      {
        return null;
      }
    case ACTION_COURSE_CREATE:
      {
        return action.payload.data._id;
      }
    default:
      return state;
  }
};

export default activeCourseId;
