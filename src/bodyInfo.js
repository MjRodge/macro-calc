import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import MaskedInput from "react-text-mask";

import { MacroContextConsumer } from "./context/MacroContext";

const style = {
  textField: {
    width: "100%"
  }
};
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  //function to be used to format feet/inches user input
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/[3-8]/, "'", /[0-9]/, /[0-1]/]}
      placeholderChar={"\u2000"}
      showMask={false}
    />
  );
}
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

class BodyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Paper elevation={1} className="input-paper">
        <Typography variant="display1" align="center">
          Body Information
        </Typography>

        <MacroContextConsumer>
          {context => (
            <React.Fragment>
              <TextField
                style={style.textField}
                id="age"
                label="Age"
                value={context.state.age}
                onChange={context.handleBody}
                onBlur={context.validateAge}
                type="number"
                margin="normal"
                error={context.state.ageErrorText.length === 0 ? false : true}
                helperText={context.state.ageErrorText}
              />
              <TextField
                style={style.textField}
                select
                label="Gender"
                name="gender"
                value={context.state.gender}
                onChange={context.handleRadio}
                onBlur={context.validateGender}
                margin="normal"
                error={
                  context.state.genderErrorText.length === 0 ? false : true
                }
                helperText={context.state.genderErrorText}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
              {context.state.heightUnit === "cm" ? (
                <TextField
                  style={style.textField}
                  id="height"
                  label="Height"
                  value={context.state.height}
                  onChange={context.handleBody}
                  onBlur={context.validateHeight}
                  type="number"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {context.state.heightUnit}
                      </InputAdornment>
                    )
                  }}
                  error={
                    context.state.heightErrorText.length === 0 ? false : true
                  }
                  helperText={context.state.heightErrorText}
                />
              ) : (
                <TextField
                  style={style.textField}
                  label="Height"
                  value={context.state.height}
                  onChange={context.handleBody}
                  onBlur={context.validateHeight}
                  id="height"
                  margin="normal"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                    endAdornment: (
                      <InputAdornment position="end">
                        {context.state.heightUnit}
                      </InputAdornment>
                    )
                  }}
                  error={
                    context.state.heightErrorText.length === 0 ? false : true
                  }
                  helperText={context.state.heightErrorText}
                />
              )}
              <TextField
                style={style.textField}
                id="weight"
                label="Weight"
                value={context.state.weight}
                onChange={context.handleBody}
                onBlur={context.validateWeight}
                type="number"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {context.state.weightUnit}
                    </InputAdornment>
                  )
                }}
                error={
                  context.state.weightErrorText.length === 0 ? false : true
                }
                helperText={context.state.weightErrorText}
              />
            </React.Fragment>
          )}
        </MacroContextConsumer>
      </Paper>
    );
  }
}

export default BodyInfo;
