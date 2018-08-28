import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './header';
import CalcInput from './calcInput';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffd149',
      main: '#ffa000',
      dark: '#c67100',
      contrastText: '#000000',
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      heightUnit: 'cm',
      weightUnit: 'kg',
    };
  }
  handlePassedHeightUnit = passedHeightUnit => {
    this.setState({ heightUnit: passedHeightUnit })
  };
  handlePassedWeightUnit = passedWeightUnit => {
    this.setState({ weightUnit: passedWeightUnit })
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header
            passedHeightUnit={this.handlePassedHeightUnit}
            passedWeightUnit={this.handlePassedWeightUnit} />
          <CalcInput
            passedHeightUnit={this.state.heightUnit}
            passedWeightUnit={this.state.weightUnit} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
