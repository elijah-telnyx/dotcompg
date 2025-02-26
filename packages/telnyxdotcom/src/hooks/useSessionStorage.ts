import { useState } from 'react';
import { errorLogger } from 'utils/errorHandler/errorLogger';

// this MUST run on client-side JS Only, to be able to update browser storage
function useSessionStorage<T>(key: string, initialValue: T) {
  // Pass initial state function to useState so logic is only executed on hook init
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.sessionStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      if (error instanceof Error) errorLogger({ error });
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      if (error instanceof Error) errorLogger({ error });
    }
  };
  return [storedValue, setValue] as const;
}

export default useSessionStorage;
