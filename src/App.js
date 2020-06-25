import React from 'react';

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import Themes from "./themes";
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './layout/Layout';

const App=(prpos)=>{
  return (
    <LayoutProvider>
    <UserProvider>
    <Provider store={store}>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
      </Provider>
    </UserProvider>
  </LayoutProvider>
  );
}

export default App;
