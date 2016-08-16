import * as Redux from './Redux';
import { createAction } from 'redux-actions';

const requestServerData = () =>
  fetch('http://localhost:3000/courses-json/').then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  .catch((error) => {
    throw new Error(
      'There has been a problem with your fetch operation: ' & (error.message || 'unknown')
    );
  });

export const requestCoursesAction = createAction(Redux.ACTION_FETCH_SERVER_DATA, requestServerData);
