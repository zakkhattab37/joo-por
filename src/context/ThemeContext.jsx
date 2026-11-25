import { useEffect, useState } from 'react';
import { ThemeContext } from './useTheme';

const getInitialTheme = () => {
  if (typeof document === 'undefined') return 'dark';
  // index.html applies the saved theme before paint; default is dark
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#37353e' : '#eeeeee');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
