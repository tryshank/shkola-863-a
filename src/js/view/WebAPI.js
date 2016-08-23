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
