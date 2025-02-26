type UseLocalStorageProps = {
  getItem: (key: string) => string | boolean;
  setItem: (key: string, value: string) => boolean;
};

const isBool = (value: string | undefined) =>
  value === "true" ? true : value === "false" ? false : value || "";

// for SSR - this code runs on both client and server
// needed to avoid window reference error on server
const isBrowser = () => typeof window !== "undefined";

export const getItem = (key: string) =>
  isBrowser() ? isBool(window.localStorage[key]) : "";

export const setItem = (key: string, value: string) => {
  if (isBrowser()) {
    window.localStorage.setItem(key, value);
    return true;
  }
  return false;
};

const useLocalStorage = (): UseLocalStorageProps => {
  return {
    getItem,
    setItem,
  };
};

export default useLocalStorage;
