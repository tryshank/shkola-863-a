import { createAction } from 'redux-actions';
import * as WebAPI from '../../view/common/WebAPI';
import * as Constants from '../constants/ActionTypes';

export const getCoursesAction =
  createAction(Constants.ACTION_FETCH_COURSES_DATA, WebAPI.getCoursesData);
export const getImagesAction =
  createAction(Constants.ACTION_FETCH_IMAGES_LIST, WebAPI.getImagesList);
export const addCourseAction = createAction(Constants.ACTION_COURSE_ADD);
export const createCourseAction = createAction(Constants.ACTION_COURSE_CREATE, WebAPI.createCourse);
export const saveCourseAction = createAction(Constants.ACTION_COURSE_SAVE, WebAPI.saveCourse);
export const deleteCourseAction = createAction(Constants.ACTION_COURSE_DELETE, WebAPI.deleteCourse);
export const setActiveCourseIdAction = createAction(Constants.ACTION_SET_ACTIVE_COURSE_ID);
export const openDeleteDialogAction = createAction(Constants.ACTION_SHOW_DIALOG);
export const closeDeleteDialogAction = createAction(Constants.ACTION_CLOSE_DIALOG);
export const imageUploadAction = createAction(Constants.ACTION_IMAGE_UPLOAD, WebAPI.uploadImage);
export const orderCourseAction = createAction(Constants.ACTION_COURSE_ORDER, WebAPI.orderCourses);
