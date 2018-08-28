import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Divider from '@material-ui/core/Divider';
import './css/header.css';

const style = {
  textField: {
    width: '87%',
  },
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      heightUnit: 'cm',
      weightUnit: 'kg',
    };
  }

  openMenu = (open) => () => {
    this.setState({
      menu: open,
    });
  };

  handleWeightUnit = weightUnit => event => {
      this.setState({ [weightUnit]: event.target.value });
      this.props.passedWeightUnit(event.target.value);
    };
  handleChange = event => {
    this.setState({ heightUnit: event.target.value });
    this.props.passedHeightUnit(event.target.value);
  };

  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon onClick={this.openMenu(true)}/>
            <SwipeableDrawer open={this.state.menu}
              onClose={this.openMenu(false)} onOpen={this.openMenu(true)}>
              <div
                tabIndex={0}
                role="button"
                //onClick={this.openMenu(false)}
                //onKeyDown={this.openMenu(false)}
              >
                <AppBar position="static" color="secondary">
                  <Toolbar>
                    <Typography variant='display1' align='center' color="textSecondary">
                      Options
                    </Typography>
                    <IconButton onClick={this.openMenu(false)}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <div className="unit-options">
                  <TextField
                    style={style.textField}
                    select
                    label="Weight Unit"
                    value={this.state.weightUnit}
                    onChange={this.handleWeightUnit("weightUnit")}
                    margin="normal"
                  >
                    <MenuItem value="kg">
                      Kilograms
                    </MenuItem>
                    <MenuItem value="lb">
                      Pounds
                    </MenuItem>
                  </TextField>
                </div>
                <Divider />
                <div className="unit-options">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Height Unit</FormLabel>
                      <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        value={this.state.heightUnit}
                        onChange={this.handleChange}
                      >
                        <FormControlLabel value="cm" control={<Radio />} label="Centimetres" />
                        <FormControlLabel value="ft/in" control={<Radio />} label="Feet & Inches" />
                      </RadioGroup>
                  </FormControl>
                </div>
                <Divider />
              </div>
            </SwipeableDrawer>
          </IconButton>
          <Typography variant='display1' align='center' color="textPrimary">
            Macro Calculator
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
