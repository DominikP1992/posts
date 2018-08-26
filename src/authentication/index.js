export const authenticate = (login, password) => {
  sessionStorage.setItem('sessionKey', window.btoa(`${login}${password}`));
};
export const signout = () => {
  sessionStorage.removeItem('sessionKey');
};
export const checkAuthentication = () => sessionStorage.getItem('sessionKey');
