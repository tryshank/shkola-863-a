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


export const saveCourse = (courseItem) => {
  console.log('save course item ', courseItem);

  const init = { method: 'put', headers: setHeaders(), body: JSON.stringify({ courseItem }) };
  console.log('save fetch');
  return fetch(new Request('http://localhost:3000/courses-post/' + (init.method === 'post' ? '' : courseItem._id), init)).then((res) => {
    if (res.status === 200) {
      return { result: true, courseItem };
    } else {
      console.log(res.status);
      return { result: false };
    }
  }, (err) => {
    console.log(err);
    return { result: false };
  });
};


export const deleteCourse = (id) => {

  const init = { method: 'delete', headers: setHeaders(), body: JSON.stringify({ id }) };

  return fetch(new Request('http://localhost:3000/courses-post/' + (init.method === 'post' ? '' : id), init)).then((res) => {
    console.log(res);
    if (res.status === 200) {
      // delete successful
      return { result: true, id };
    } else {
      return { result: false };
    }
  }, (err) => {
    console.log(err);
    return { result: false };
  });
};
