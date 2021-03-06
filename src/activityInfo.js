import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";

import { MacroContextConsumer } from "./context/MacroContext";

class ActivityInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
  }

  handlePanel = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <MacroContextConsumer>
        {context => (
          <Paper elevation={1} className="input-paper">
            <Typography variant="display1" align="center">
              Activity Information
            </Typography>
            <div className="expansion">
              <ExpansionPanel
                expanded={expanded === "panel1"}
                onChange={this.handlePanel("panel1")}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Radio
                    checked={context.state.activityLevel === "Sedentary"}
                    onChange={context.handleRadio}
                    value="Sedentary"
                    name="activityLevel"
                  />
                  <Typography className="selection-title">Sedentary</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Office job combined with very little exercise.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === "panel2"}
                onChange={this.handlePanel("panel2")}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Radio
                    checked={context.state.activityLevel === "Light"}
                    onChange={context.handleRadio}
                    value="Light"
                    name="activityLevel"
                  />
                  <Typography className="selection-title">Light</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Office job combined with 0-3 low/medium intensity workouts
                    per week.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === "panel3"}
                onChange={this.handlePanel("panel3")}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Radio
                    checked={context.state.activityLevel === "Moderate"}
                    onChange={context.handleRadio}
                    value="Moderate"
                    name="activityLevel"
                  />
                  <Typography className="selection-title">Moderate</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Active job combined with 0-3 low/medium intensity workouts
                    per week.
                    <br />
                    Office job with 3-5 medium/high intensity workouts per week.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === "panel4"}
                onChange={this.handlePanel("panel4")}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Radio
                    checked={context.state.activityLevel === "Heavy"}
                    onChange={context.handleRadio}
                    value="Heavy"
                    name="activityLevel"
                  />
                  <Typography className="selection-title">Heavy</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Active job combined with 3-5 medium/high intensity workouts
                    per week.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </Paper>
        )}
      </MacroContextConsumer>
    );
  }
}

export default ActivityInfo;
