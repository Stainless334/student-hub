import { useState, useEffect} from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
        const savedCourse = localStorage.getItem(key);
        if (savedCourse) {
          try {
            return JSON.parse(savedCourse);
          } catch (error) {
            console.error("Something went wrong", error);
          }

        }
        
        return initialValue
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;