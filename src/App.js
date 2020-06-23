import React from 'react';

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import Themes from "./themes";
import UserActions from './views/login/UserActions';

const App=(prpos)=>{
  return (
    <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <UserActions />
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>
  );
}

export default App;
