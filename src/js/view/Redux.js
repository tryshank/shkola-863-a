import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { createAction } from 'redux-actions';
import * as WebAPI from './WebAPI';

export const ACTION_FETCH_COURSES_DATA = 'ACTION_FETCH_COURSES_DATA';

export const coursesReducer = (state = { coursesData: [] }, action) => {
  switch (action.type) {
    case ACTION_FETCH_COURSES_DATA:
      {
        let newData = state;
        if (Array.isArray(action.payload)) {
          newData = Object.assign({}, state, {
            coursesData: Array.concat(state.coursesData, action.payload),
          });
        } else {
          console.error('coursesData need to be Array');
        }
        return newData;
      }
    default:
      return state;
  }
};

export const store = createStore(coursesReducer, applyMiddleware(promiseMiddleware));

export const getCoursesAction = createAction(ACTION_FETCH_COURSES_DATA, WebAPI.getCoursesData);
