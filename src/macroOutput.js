import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Doughnut, HorizontalBar } from "react-chartjs-2";

import { MacroContextConsumer } from "./context/MacroContext";

const style = {
  resultsTitle: {
    marginLeft: "9vw"
  }
};

class MacroOutput extends Component {
  render() {
    var calorieOptions = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "cals"
            }
          }
        ]
      }
    };

    return (
      <MacroContextConsumer>
        {context => (
          <div>
            <Typography
              variant="display1"
              gutterBottom
              style={style.resultsTitle}
            >
              Your Results
            </Typography>
            <div className="macro-output-container">
              <Paper elevation={1} className="output-paper macro-output">
                <Typography variant="display1" align="center" gutterBottom>
                  Macro Split
                </Typography>
                <div className="macro-chart">
                  <Doughnut
                    data={context.macroData}
                    options={{ maintainAspectRatio: false, responsive: true }}
                  />
                </div>
              </Paper>
              <Paper elevation={1} className="output-paper macro-output">
                <Typography variant="display1" align="center" gutterBottom>
                  Calorie Goal
                </Typography>
                <div className="macro-chart">
                  <HorizontalBar
                    data={context.calorieData}
                    options={calorieOptions}
                  />
                </div>
              </Paper>
              <Paper elevation={1} className="output-paper macro-output">
                <Typography variant="display1" align="center" gutterBottom>
                  User Information
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  Age: {context.state.age}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  Height: {context.state.height}
                  {context.state.heightUnit}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  Weight: {context.state.weight}
                  {context.state.weightUnit}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  Gender: {context.state.gender}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  Activity Level: {context.state.activityLevel}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  Goal: {context.state.goal}
                </Typography>
              </Paper>
            </div>
          </div>
        )}
      </MacroContextConsumer>
    );
  }
}

export default MacroOutput;
