export const getItem = (key) => JSON.parse(sessionStorage.getItem(key));
export const saveItem = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));