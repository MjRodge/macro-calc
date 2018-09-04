import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';

class MacroOutput extends Component {
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
        <Paper elevation={1} className="input-paper">
          <Typography variant='display1' align='center'>
            Your Results
          </Typography>
          <Typography>Age: {this.props.passedAge}</Typography>
          <Typography>Height: {this.props.passedHeight}</Typography>
          <Typography>Weight: {this.props.passedWeight}</Typography>
          <Typography>Gender: {this.props.passedGender}</Typography>
          <Typography>Activity Level: {this.props.passedActivity}</Typography>
          <Typography>Goal: {this.props.passedGoal}</Typography>
        </Paper>
        <Paper elevation={1} className="input-paper macro-output">
          <Doughnut data={macroData} options={{maintainAspectRatio: false, responsive: true}}/>
        </Paper>
        <Paper elevation={1} className="input-paper macro-output">
          <HorizontalBar data={calorieData} options={calorieOptions}/>
        </Paper>
      </div>
    );
  }
}

export default MacroOutput;
