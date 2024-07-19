import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { useSelector } from 'react-redux';
const App = () => {
  const { darkMode } = useSelector(state => state.app);
  return (
    <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
