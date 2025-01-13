export const authorize = ({ token, username }) => {
  window.localStorage.authToken = token;
  window.localStorage.currentUser = username;
}

export const loguot = () => {
  window.localStorage.authToken = null;
  window.localStorage.currentUser = null;
}

export const getAuthToken = () => {
  return window.localStorage.authToken;
}

export const getCurrentUser = () => {
  return window.localStorage.currentUser;
}

export const isAuthenticated = () => {
  return getAuthToken() !== 'null' && getAuthToken() !== undefined;
}