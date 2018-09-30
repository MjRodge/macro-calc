import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "./header";
import CalcInput from "./calcInput";
import MacroContextProvider from "./context/MacroContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#819ca9",
      main: "#546e7a",
      dark: "#29434e",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#ffd149",
      main: "#ffa000",
      dark: "#c67100",
      contrastText: "#000000"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MacroContextProvider>
          <div className="App">
            <Header />
            <CalcInput />
          </div>
        </MacroContextProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
