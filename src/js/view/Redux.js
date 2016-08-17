import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

export const ACTION_FETCH_SERVER_DATA = 'ACTION_FETCH_SERVER_DATA';

export const getCoursesDataAction = (coursesData) => {
  return {
    type: ACTION_FETCH_SERVER_DATA,
    coursesData,
  };
};

export const fetchReducer = (state = { coursesData: [] }, action) => {
  switch (action.type) {
    case ACTION_FETCH_SERVER_DATA:
      {
        let newData = state;
        const data = action.coursesData || action.payload;
        if (Array.isArray(data)) {
          newData = Object.assign({}, state, {
            coursesData: Array.concat(state.coursesData, data),
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

export const store = createStore(fetchReducer, applyMiddleware(promiseMiddleware));
