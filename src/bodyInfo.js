import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MaskedInput from 'react-text-mask';

const style = {
  textField: {
    width: '100%',
  },
}
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  //function to be used to format feet/inches user input
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[ /[3-8]/, '\'', /[0-9]/, /[0-1]/]}
      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
}
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class BodyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      height: '',
      weight: '',
      gender: '',
    };
  }

  handleAge = age => event => {
    this.setState({
      [age]: event.target.value,
    });
    this.props.passedAge(event.target.value);
  };
  handleHeight = height => event => {
    this.setState({
      [height]: event.target.value,
    });
    this.props.passedHeight(event.target.value);
  };
  handleWeight = weight => event => {
    this.setState({
      [weight]: event.target.value,
    });
    this.props.passedWeight(event.target.value);
  };
  handleGender = gender => event => {
    this.setState({
      [gender]: event.target.value,
    });
    this.props.passedGender(event.target.value);
  };

  render() {
    return (
      <Paper elevation={1} className="input-paper">
        <Typography variant='display1' align='center'>
          Body Information
        </Typography>
        <TextField
          style={style.textField}
          id="age"
          label="Age"
          value={this.state.age}
          onChange={this.handleAge("age")}
          type="number"
          margin="normal"
        />
        {this.props.passedHeightUnit === "cm" ? (
          <TextField
            style={style.textField}
            id="height"
            label="Height"
            value={this.state.height}
            onChange={this.handleHeight("height")}
            type="number"
            margin="normal"
            InputProps={{
              endAdornment: <InputAdornment position="end">{this.props.passedHeightUnit}</InputAdornment>,
            }}
          />
        ) : (
          <TextField
            style={style.textField}
            label="Height"
            value={this.state.height}
            onChange={this.handleHeight("height")}
            id="height"
            margin="normal"
            InputProps={{
              inputComponent: TextMaskCustom,
              endAdornment: <InputAdornment position="end">{this.props.passedHeightUnit}</InputAdornment>,
            }}
          />
        )}
        <TextField
          style={style.textField}
          id="weight"
          label="Weight"
          value={this.state.weight}
          onChange={this.handleWeight("weight")}
          type="number"
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">{this.props.passedWeightUnit}</InputAdornment>,
          }}
        />
        <TextField
          style={style.textField}
          select
          label="Gender"
          value={this.state.gender}
          onChange={this.handleGender("gender")}
          margin="normal"
        >
          <MenuItem value="male">
            Male
          </MenuItem>
          <MenuItem value="female">
            Female
          </MenuItem>
        </TextField>
        <h1>{this.state.height}</h1>
      </Paper>
    );
  }
}

export default BodyInfo;
