export const getCoursesData = () =>
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


const setHeaders = () =>
  new Headers({ 'Content-Type': 'application/json' });

export const createCourse = (courseItem) => {
  const init = { method: 'post', headers: setHeaders(), body: JSON.stringify({ data: courseItem }) };
  return fetch(new Request('http://localhost:3000/courses-post/', init)).then((res) => {
    console.log('res ', res);
    if (res.status === 200) {
      return res.json();
    } else {
      return { result: false, err: null };
    }
  }, (err) => {
    return { result: false, err };
  });
};


export const saveCourse = (courseItem) => {
  const init = { method: 'put', headers: setHeaders(), body: JSON.stringify({ courseItem }) };
  return fetch(new Request('http://localhost:3000/courses-post/' + (init.method === 'post' ? '' : courseItem._id), init)).then((res) => {
    if (res.status === 200) {
      return { result: true, courseItem };
    } else {
      return { result: false, err: null };
    }
  }, (err) => {
    return { result: false, err };
  });
};


export const deleteCourse = (id) => {
  const init = { method: 'delete', headers: setHeaders(), body: JSON.stringify({ id }) };
  return fetch(new Request('http://localhost:3000/courses-post/' + (init.method === 'post' ? '' : id), init)).then((res) => {
    if (res.status === 200) {
      // delete successful
      return { result: true, id };
    } else {
      return { result: false };
    }
  }, (err) => {
    return { result: false };
  });
};
