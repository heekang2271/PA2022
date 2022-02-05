import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './Components/GlobalStyles';
import Router from './Router';
import { docWidthState, isDarkState, userState } from './atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function App() {
  const isDark = useRecoilValue(isDarkState);
  const setDocWidth = useSetRecoilState(docWidthState);

  useEffect(() => {
    const handleResize = () => {
      setDocWidth(document.body.clientWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
