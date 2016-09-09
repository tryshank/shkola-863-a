export const getCoursesData = (type) =>
  fetch(`http://localhost:3000/courses-${type}/`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  })
  .catch((error) => {
    throw new Error(
      'There has been a problem with fetch operation: ' & (error.message || 'unknown')
    );
  });


const setHeaders = () =>
  new Headers({ 'Content-Type': 'application/json' });

export const createCourse = (courseItem) => {
  const init = { method: 'post', headers: setHeaders(),
    body: JSON.stringify({ data: courseItem }) };
  return fetch(new Request('http://localhost:3000/courses-post/', init)).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return { result: false, err: null };
  }, (err) =>
    ({ result: false, err }));
};


export const saveCourse = (courseItem) => {
  const init = { method: 'put', headers: setHeaders(), body: JSON.stringify({ courseItem }) };
  return fetch(new Request(`http://localhost:3000/courses-post/${courseItem._id}`, init)).then((res) => {
    if (res.status === 200) {
      return { result: true, courseItem };
    }
    return { result: false, err: null };
  }, (err) =>
      ({ result: false, err }));
};


export const deleteCourse = (id) => {
  const init = { method: 'delete', headers: setHeaders(), body: JSON.stringify({ id }) };
  return fetch(new Request(`http://localhost:3000/courses-post/${id}`, init)).then((res) => {
    if (res.status === 200) {
      // delete successful
      return { result: true, id };
    }
    return { result: false };
  }, (err) =>
    ({ result: false, err }));
};


export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('type', 'file');
  formData.append('file', file);
  return fetch('http://localhost:3000/image-upload', { method: 'POST', body: formData }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.status);
  }).catch((error) => {
    throw new Error(
      'There has been a problem with fetch operation: ' & (error.message || 'unknown')
    );
  });
};
