import { createContext, useEffect, useState } from "react";

const modeSwitchContext = createContext({
  darkMode: false,
  ontoggleDarkMode: () => {},
});

export function ModeSwitchContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const handletoggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    console.log("mode change btn clicked");
  };
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("--white", "#111");
      root.style.setProperty("--black", "#f2efef");
      root.style.setProperty('--lightGrey','#3a3a3a');
      root.style.setProperty('--darkblack','#e0e0e0');
      root.style.setProperty('--lightBlack','#777');
    } else {
      root.style.setProperty("--white", "#f2efef");
      root.style.setProperty("--black", "#111");
      root.style.setProperty('--lightGrey','#cccccc');
      root.style.setProperty('--darkblack','#1e1e1e');
      root.style.setProperty('--lightBlack','#3a3a3a');
    }
  }, [darkMode]);
  const modeSwitchCtx = {
    darkMode,
    ontoggleDarkMode: handletoggleDarkMode,
  };
  return (
    <modeSwitchContext.Provider value={modeSwitchCtx}>
      {children}
    </modeSwitchContext.Provider>
  );
}
export default modeSwitchContext;
