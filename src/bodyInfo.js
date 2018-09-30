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
    this.state = {
      age: "",
      height: "",
      weight: "",
      gender: "",
      ageErrorText: "",
      heightErrorText: "",
      weightErrorText: "",
      genderErrorText: ""
    };
  }

  handleGender = gender => event => {
    this.setState(
      {
        [gender]: event.target.value
      },
      () => {
        //Call validateGender on change to avoid having to click off gender before Next button isEnabled
        this.validateGender();
      }
    );
    this.props.passedGender(event.target.value);
  };

  //validation events
  validateAge = event => {
    if (event.target.value === "") {
      //validation to make required
      this.setState({ ageErrorText: "Age is required" });
    } else if (event.target.value < 15 || event.target.value > 90) {
      this.setState({ ageErrorText: "Age must be between 15 and 90" });
    } else if (Number.isInteger(parseInt(event.target.value)) === false) {
      this.setState({ ageErrorText: "No decimals allowed" });
    } else {
      this.setState({ ageErrorText: "" });
      this.props.passedAgeValidation("true");
    }
  };
  validateHeight = event => {
    if (event.target.value === "") {
      //validation to make required
      this.setState({ heightErrorText: "Height is required" });
    } else {
      this.setState({ heightErrorText: "" });
      this.props.passedHeightValidation("true");
    }
  };
  validateWeight = event => {
    if (event.target.value === "") {
      //validation to make required
      this.setState({ weightErrorText: "Weight is required" });
    } else if (event.target.value < 30 || event.target.value > 400) {
      this.setState({ weightErrorText: "Weight must be between 30 and 400" });
    } else {
      this.setState({ weightErrorText: "" });
      this.props.passedWeightValidation("true");
    }
  };
  validateGender = () => {
    if (this.state.gender === "") {
      //validation to make required
      this.setState({ genderErrorText: "Gender is required" });
    } else {
      this.setState({ genderErrorText: "" });
      this.props.passedGenderValidation("true");
    }
  };

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
                onBlur={this.validateAge}
                type="number"
                margin="normal"
                error={this.state.ageErrorText.length === 0 ? false : true}
                helperText={this.state.ageErrorText}
              />
              {context.state.heightUnit === "cm" ? (
                <TextField
                  style={style.textField}
                  id="height"
                  label="Height"
                  value={context.state.height}
                  onChange={context.handleBody}
                  onBlur={this.validateHeight}
                  type="number"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {context.state.heightUnit}
                      </InputAdornment>
                    )
                  }}
                  error={this.state.heightErrorText.length === 0 ? false : true}
                  helperText={this.state.heightErrorText}
                />
              ) : (
                <TextField
                  style={style.textField}
                  label="Height"
                  value={context.state.height}
                  onChange={context.handleBody}
                  onBlur={this.validateHeight}
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
                  error={this.state.heightErrorText.length === 0 ? false : true}
                  helperText={this.state.heightErrorText}
                />
              )}
              <TextField
                style={style.textField}
                id="weight"
                label="Weight"
                value={context.state.weight}
                onChange={context.handleBody}
                onBlur={this.validateWeight}
                type="number"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {context.state.weightUnit}
                    </InputAdornment>
                  )
                }}
                error={this.state.weightErrorText.length === 0 ? false : true}
                helperText={this.state.weightErrorText}
              />
              <TextField
                style={style.textField}
                select
                id="gender"
                label="Gender"
                name="gender"
                value={context.state.gender}
                onChange={context.handleRadio}
                //onBlur={this.validateGender}
                margin="normal"
                error={this.state.genderErrorText.length === 0 ? false : true}
                helperText={this.state.genderErrorText}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </React.Fragment>
          )}
        </MacroContextConsumer>
      </Paper>
    );
  }
}

export default BodyInfo;
