export const getCoursesData = () => {
  const init = { method: 'get', cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' } };
  return fetch(new Request('/api/course/', init), init).then((response) => {
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
};


export const getImagesList = () => {
  const init = { method: 'get', cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' } };
  return fetch(new Request('/api/image/', init), init).then((response) => {
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
};


const setHeaders = () =>
  new Headers({ 'Content-Type': 'application/json' });

export const createCourse = (courseItem) => {
  const init = { method: 'post', headers: setHeaders(), credentials: 'include',
    body: JSON.stringify({ data: courseItem }) };
  return fetch(new Request('/api/course/', init)).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return { result: false, err: null };
  }, (err) =>
    ({ result: false, err }));
};


export const saveCourse = (courseItem) => {
  const init = { method: 'put', headers: setHeaders(), credentials: 'include',
    body: JSON.stringify({ courseItem }) };
  return fetch(new Request(`/api/course/${courseItem._id}`, init)).then((res) => {
    if (res.status === 200) {
      return { result: true, courseItem };
    }
    return { result: false, err: null };
  }, (err) =>
      ({ result: false, err }));
};


export const deleteCourse = (id) => {
  const init = { method: 'delete', headers: setHeaders(), credentials: 'include',
    body: JSON.stringify({ id }) };
  return fetch(new Request(`/api/course/${id}`, init)).then((res) => {
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
  return fetch('/api/image/upload', { method: 'POST', credentials: 'include', body: formData }).
    then(res => {
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


export const submitContactForm = (formData) =>
  fetch('/api/send-mail', { method: 'post', headers: setHeaders(), cache: 'no-store',
    body: JSON.stringify(formData) })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.status);
  }).catch((error) => {
    throw new Error(
      'There has been a problem with fetch operation: ' & (error.message || 'unknown')
    );
  });


export const getSettingsMail = () => {
  const init = { method: 'get', credentials: 'include', cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' } };
  return fetch(new Request('/api/admin/email', init), init).then((response) => {
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
};


export const saveSettings = (settings, initialState) => {
  const { adminEmail } = settings;
  const init = { method: 'put', headers: setHeaders(), credentials: 'include',
    body: JSON.stringify({ adminEmail }) };
  return fetch(new Request('/api/admin/email', init)).then((res) => {
    if (res.status === 200) {
      return { result: true, settings, initialState };
    }
    return { result: false, err: null };
  }, (err) =>
    ({ result: false, err }));
};
