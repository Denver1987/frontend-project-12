export const authorize = ({ token, username }) => {
  window.localStorage.authToken = token;
  window.localStorage.currentUser = username;
};

export const loguot = () => {
  delete window.localStorage.authToken;
  delete window.localStorage.currentUser;
};

export const getAuthToken = () => window.localStorage.authToken;

export const getCurrentUser = () => window.localStorage.currentUser;

export const isAuthenticated = () => getAuthToken() !== undefined;
