import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const style = {
  textField: {
    width: '100%',
  },
}

class BodyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      height: '',
      weight: '',
    };
  }

  handleAge = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.props.passedAge(event.target.value);
  };
  handleHeight = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.props.passedHeight(event.target.value);
  };
  handleWeight = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.props.passedWeight(event.target.value);
  };

  render() {
    return (
      <Paper elevation={1} className="input-paper">
        <Typography variant='display3' align='center'>
          Body Information
        </Typography>
        <TextField
          style={style.textField}
          id="age"
          label="Age"
          value={this.state.age}
          onChange={this.handleAge("age")}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          style={style.textField}
          id="height"
          label="Height"
          value={this.state.height}
          onChange={this.handleHeight("height")}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          style={style.textField}
          id="weight"
          label="Weight"
          value={this.state.weight}
          onChange={this.handleWeight("weight")}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <h3>{this.state.age}</h3>
      </Paper>
    );
  }
}

export default BodyInfo;
