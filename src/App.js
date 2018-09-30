import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "./header";
import CalcInput from "./calcInput";

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

//Create context to store data in app
export const MacroContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      heightUnit: "cm",
      weightUnit: "kg"
    };
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <MacroContext.Provider
            value={{
              state: this.state,
              handleWeightUnit: event =>
                this.setState({ weightUnit: event.target.value }),
              handleHeightUnit: event =>
                this.setState({ heightUnit: event.target.value })
            }}
          >
            <Header />
            <CalcInput />
          </MacroContext.Provider>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
