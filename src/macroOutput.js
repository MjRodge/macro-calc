import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';

const style = {
  resultsTitle: {
    marginLeft: "9vw",
  },
}

class MacroOutput extends Component {
  capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    var macroData = {
      labels: ["Protein: "+this.props.passedProtein+"g",
        "Fat: "+this.props.passedFat+"g",
        "Carbohydrate: "+this.props.passedCarbs+"g"],
      datasets: [
      {
        label: 'Macronutrients Allowance',
        data: [this.props.passedProtein, this.props.passedFat, this.props.passedCarbs],
        backgroundColor: [
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
        ]
      }]
    };

    var calorieData = {
        //labels: ["Resting", "Total", "Goal"],
        datasets: [{
          label: 'Resting Calorie Expenditure: '+this.props.passedRCE,
          data: [this.props.passedRCE],
          backgroundColor: '#36A2EB',
        },
        {
          label: 'Total Calorie Expenditure: '+this.props.passedTotalCals,
          data: [this.props.passedTotalCals],
          backgroundColor: '#FFCE56',
        },
        {
          label: 'Goal Calorie Intake: '+this.props.passedGoalCals,
          data: [this.props.passedGoalCals],
          backgroundColor: '#FF6384',
        }]
    };
    var calorieOptions = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'cals'
          }
        }],
      }
    }

    return (
      <div>
        <Typography variant='display1' gutterBottom style={style.resultsTitle}>
          Your Results
        </Typography>
        <div className="macro-output-container">
          <Paper elevation={1} className="output-paper macro-output">
            <Typography variant='display1' align='center' gutterBottom>
              Macro Split
            </Typography>
            <div className="macro-chart">
              <Doughnut data={macroData} options={{maintainAspectRatio: false, responsive: true}}/>
            </div>
          </Paper>
          <Paper elevation={1} className="output-paper macro-output">
            <Typography variant='display1' align='center' gutterBottom>
              Calorie Goal
            </Typography>
            <div className="macro-chart">
              <HorizontalBar data={calorieData} options={calorieOptions}/>
            </div>
          </Paper>
          <Paper elevation={1} className="output-paper macro-output">
            <Typography variant='display1' align='center' gutterBottom>
              User Information
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Age: {this.props.passedAge}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Height: {this.props.passedHeight}{this.props.passedHeightUnit}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Weight: {this.props.passedWeight}{this.props.passedWeightUnit}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Gender: {this.capitalise(this.props.passedGender)}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Activity Level: {this.capitalise(this.props.passedActivity)}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Goal: {this.capitalise(this.props.passedGoal)}
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

export default MacroOutput;
