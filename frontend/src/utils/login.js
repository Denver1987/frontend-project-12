export const authorize = ({ token, username }) => {
  window.localStorage.authToken = token;
  window.localStorage.currentUser = username;
}

export const loguot = () => {
  delete window.localStorage.authToken;
  delete window.localStorage.currentUser;
}

export const getAuthToken = () => {
  return window.localStorage.authToken;
}

export const getCurrentUser = () => {
  return window.localStorage.currentUser;
}

export const isAuthenticated = () => {
  return getAuthToken() !== undefined;
}
