import ThemeContext from "./ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(previousTheme =>
      previousTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;