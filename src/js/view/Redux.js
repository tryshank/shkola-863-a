import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise';
import { createAction } from 'redux-actions';
import * as WebAPI from './WebAPI';

export const ACTION_FETCH_COURSES_DATA = 'ACTION_FETCH_COURSES_DATA';
export const ACTION_SET_ACTIVE_COURSE_ID = 'ACTION_SET_ACTIVE_COURSE_ID';
export const ACTION_SHOW_DIALOG = 'ACTION_SHOW_DIALOG';
export const ACTION_CLOSE_DIALOG = 'ACTION_CLOSE_DIALOG';
export const ACTION_COURSE_DELETE = 'ACTION_COURSE_DELETE';
export const ACTION_COURSE_SAVE = 'ACTION_COURSE_SAVE';

const activeCourseId = (state = null, action) => {
  console.log('activeCourseId', action);
  switch (action.type) {
    case ACTION_SET_ACTIVE_COURSE_ID:
      {
        return action.payload;
      }
    case ACTION_COURSE_DELETE:
      {
        return null;
      }
    default:
      return state;
  }
};


const coursesData = (state = [], action) => {
  console.log('coursesData ', action);
  console.log('state ', state);
  switch (action.type) {
    case ACTION_FETCH_COURSES_DATA:
      {
        let newData = state;
        if (Array.isArray(action.payload)) {
          newData = action.payload;
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
          console.log('courseIndex ',courseIndex);
          if (courseIndex || courseIndex === 0) {
            newData = [].concat(state.slice(0, courseIndex),
              action.payload.courseItem, state.slice(courseIndex + 1));
            console.log('newDat', newData);
          }
        }
        return newData;
      }
    case ACTION_COURSE_DELETE:
      {
        let newData = state;
        if ((action.payload.id) && (action.payload.result)) {
          newData = state.filter(courseItem => courseItem._id !== action.payload.id);
          console.log('after deleting ', newData);
        }
        return newData;
      }
    default:
      return state;
  }
};


const dialogState = (state = { open: false }, action) => {
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
}


const Reducers = combineReducers({
  coursesData,
  activeCourseId,
  dialogState,
});

export const store = createStore(Reducers, applyMiddleware(promiseMiddleware));

export const getCoursesAction = createAction(ACTION_FETCH_COURSES_DATA, WebAPI.getCoursesData);
export const saveCourse = createAction(ACTION_COURSE_SAVE, WebAPI.saveCourse);
export const deleteCourse = createAction(ACTION_COURSE_DELETE, WebAPI.deleteCourse);
export const setActiveCourseIdAction = createAction(ACTION_SET_ACTIVE_COURSE_ID);
export const openDeleteDialog = createAction(ACTION_SHOW_DIALOG);
export const closeDeleteDialog = createAction(ACTION_CLOSE_DIALOG);
