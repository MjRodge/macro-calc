import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './header';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffd149',
      main: '#ffa000',
      dark: '#c67100',
      contrastText: '#000000',
    },
    secondary: {
      light: '#82f7ff',
      main: '#40c4ff',
      dark: '#0094cc',
      contrastText: '#000000',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
