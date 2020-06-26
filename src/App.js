import React from 'react';

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider, loginUser } from "./context/UserContext";
import Themes from "./themes";
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './layout/Layout';
import UserActions from './views/login/UserActions';

const App=(prpos)=>{
  return (
    <LayoutProvider>
    <UserProvider>
    <Provider store={store}>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <Layout />
        {/* <UserActions /> */}
      </ThemeProvider>
      </Provider>
    </UserProvider>
  </LayoutProvider>
  );
}

export default App;
