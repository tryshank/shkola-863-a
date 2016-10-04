import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise';
import activeCourseId from './reducers/ActiveCourseId';
import activeCourseImage from './reducers/ActiveCourseImage';
import coursesData from './reducers/CoursesData';
import dialogState from './reducers/DialogState';
import imagesFiles from './reducers/ImagesFiles';

const Reducers = combineReducers({
  activeCourseId,
  activeCourseImage,
  coursesData,
  dialogState,
  imagesFiles,
});

export const store = createStore(Reducers, applyMiddleware(promiseMiddleware));
