import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class ActivityInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      height: '',
      weight: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <Paper elevation={1} className="input-paper">

      </Paper>
    );
  }
}

export default ActivityInfo;
