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
        if (action.payload.courseItem._id) {
          // TODO: rename active course title in courses list
        }
        return newData;
      }
    case ACTION_COURSE_DELETE:
      {
        // TODO: remove deleted item from list, update activeCourseId
        return state;
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
