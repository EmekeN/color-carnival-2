import { useState, useEffect } from "react";

/**
 * Custom hook to manage retrieving and updating local storage
 * @param {String} key - Key of local storage value to manipulate
 * @param {any} defaultValue Default value if nothing in Storage
 */
export const useLocalStorage = (key, defaultValue) => {
  const [localStorageVal, setLocalStorageVal] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(localStorageVal) : value;

      /** @todo prevent submitting duplicate values? */ 
      setLocalStorageVal(valueToStore);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localStorageVal));
  }, [localStorageVal, localStorageVal]);

  return [localStorageVal, setValue];
};