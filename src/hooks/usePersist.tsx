import { useCallback, useEffect, useState } from "react";

export default function usePersist<T>(
  key: string,
  initialState: T
): [value: T, setNewValue: (newValue: T) => void, clearValue: () => T] {
  const originalKey = `persisted-state-data-${key}`;

  const [value, setValue] = useState(initialState);

  const getPersistedData = useCallback(() => {
    const persistedData = localStorage.getItem(originalKey);

    if (persistedData) {
      const result = JSON.parse(persistedData);
      setValue(result);
    }
  }, [originalKey]);

  const setNewValue = useCallback(
    (newValue: T) => {
      const stringifiedData = JSON.stringify(newValue);
      localStorage.setItem(originalKey, stringifiedData);
      setValue(newValue);
    },
    [originalKey]
  );

  const clearAllPersistData = useCallback(() => {
    setValue(initialState);
    localStorage.removeItem(originalKey);
    return initialState;
  }, [originalKey, initialState]);

  useEffect(() => {
    getPersistedData();
  }, [getPersistedData]);

  return [value, setNewValue, clearAllPersistData];
}
