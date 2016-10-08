import {
  ACTION_FETCH_COURSES_DATA,
  ACTION_COURSE_SAVE,
  ACTION_COURSE_DELETE,
  ACTION_COURSE_ADD,
  ACTION_COURSE_CREATE,
  ACTION_COURSE_ORDER,
} from './../constants/ActionTypes';

export const coursesData = (state = [], action) => {
  switch (action.type) {
    case ACTION_FETCH_COURSES_DATA:
      {
        let newData = state;
        if (Array.isArray(action.payload.docs)) {
          newData = action.payload.docs;
        } else {
          console.error('response from DB need to be Array');
        }
        return newData;
      }
    case ACTION_COURSE_SAVE:
      {
        let newData = state;
        let courseIndex = null;
        if ((action.payload.courseItem) && (action.payload.result)) {
          // TODO: refactor when courseItem will contains list ordering
          for (let i = 0; i < state.length; i++) {
            if (state[i]._id === action.payload.courseItem._id) {
              courseIndex = i;
              break;
            }
          }
          if (courseIndex || courseIndex === 0) {
            newData = [].concat(state.slice(0, courseIndex),
              action.payload.courseItem, state.slice(courseIndex + 1));
          }
        }
        return newData;
      }
    case ACTION_COURSE_DELETE:
      {
        let newData = state;
        if ((action.payload.id) && (action.payload.result)) {
          newData = state.filter(courseItem => courseItem._id !== action.payload.id);
        }
        return newData;
      }
    case ACTION_COURSE_ADD:
      {
        return state;
      }
    case ACTION_COURSE_CREATE:
      {
        let newData;
        // append courses list with new item
        if (action.payload.data) {
          newData = [].concat(state, action.payload.data);
        }
        return newData;
      }
    case ACTION_COURSE_ORDER:
      {
        let newData = state;
        if (action.payload && action.payload.result) {
          newData = state.map((courseItem) => {
            let courseItemModified = courseItem;
            if (courseItem._id === action.payload.original.id) {
              courseItemModified = { ...courseItem, ordering: action.payload.swap.position };
            }
            if (courseItem._id === action.payload.swap.id) {
              courseItemModified = { ...courseItem, ordering: action.payload.original.position };
            }
            return courseItemModified;
          });
          const swapElement = newData[action.payload.swap.index];
          newData[action.payload.swap.index] = newData[action.payload.original.index];
          newData[action.payload.original.index] = swapElement;
        }
        return newData;
      }
    default:
      return state;
  }
};

export default coursesData;
