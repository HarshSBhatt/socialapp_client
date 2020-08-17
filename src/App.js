//! Built-in or Third Party Packages

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

//! User Files

import "./styles/CustomAntTheme.less";
import "./styles/App.scss";
import customTheme from "./utils/theme";
import { ConfigureStore } from "./store/configureStore";
import Routing from "./routes/Routing";
import Navbar from "./components/layout/Navbar";
import { setAuthHeader } from "./utils/setAuthHeader";
import { setCurrentUser, logoutUser, getUserData } from "./store/actions";

//! MUI Imports

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const store = ConfigureStore();

const theme = createMuiTheme(customTheme);

if (localStorage.authToken) {
  const decoded = jwt_decode(localStorage.authToken);
  setAuthHeader(localStorage.authToken);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getUserData());

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <div>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <Routing />
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
