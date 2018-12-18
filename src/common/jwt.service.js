const IdToken = "id_token";

export const getToken = () => {
  return window.localStorage.getItem(IdToken);
};


export const destroyToken = () => {
  window.localStorage.removeItem(IdToken);
};

export const saveToken = token => {
  window.localStorage.setItem(IdToken, token);
};

export default { getToken, saveToken, destroyToken };
