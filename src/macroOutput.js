import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

class MacroOutput extends Component {
  render() {
    return (
      <Paper elevation={1} className="input-paper">
        <h2>RESTING CALS: {this.props.passedRCE}</h2>
        <h2>TOTAL CALS: {this.props.passedTotalCals}</h2>
        <h2>GOAL CALS: {this.props.passedGoalCals}</h2>
        <h2>Total protein: {this.props.passedProtein}g</h2>
        <h2>Total fat: {this.props.passedFat}g</h2>
        <h2>Total carbs: {this.props.passedCarbs}g</h2>
      </Paper>
    );
  }
}

export default MacroOutput;
