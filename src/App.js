//! Built-in or Third Party Packages

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

//! User Files

import "./styles/App.scss";
import { ConfigureStore } from "./store/configureStore";
import Routing from "./routes/Routing";
import Navbar from "./components/Navbar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

//! MUI Imports

const store = ConfigureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});
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
