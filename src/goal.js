import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class Goal extends Component {
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
        <div>Hello world</div>
        <TextField
          id="age"
          label="Age"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </Paper>
    );
  }
}

export default Goal;
