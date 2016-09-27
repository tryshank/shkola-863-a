module.exports = {
  login(username, password) {
    const loginData = {
      username,
      password,
    };
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'include',
    });
  },

  ensureAuthenticated() {
    return fetch('/api/auth/isLoggedIn', { credentials: 'include' });
  },
};
