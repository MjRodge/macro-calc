import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

class MacroOutput extends Component {
  render() {
    return (
      <Paper elevation={1} className="input-paper">
        <h2>RESTING CALS: {this.props.passedRCE}</h2>
        <h2>TOTAL CALS: {this.props.passedTotalCals}</h2>
        <h2>GOAL CALS: {this.props.passedGoalCals}</h2>
      </Paper>
    );
  }
}

export default MacroOutput;
