import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      goal: 'lose',
    };
  }

  handlePanel = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleSelection = event => {
    this.setState({ goal: event.target.value });
    this.props.passedGoal(event.target.value);
  };

  render() {
    const { expanded } = this.state;
    return (
      <Paper elevation={1} className="input-paper">
        <Typography variant='display1' align='center'>
          Goal
        </Typography>
        <div className="expansion">
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handlePanel('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Radio
                checked={this.state.goal === 'lose'}
                onChange={this.handleSelection}
                value="lose"
                name="goal"
              />
              <Typography className="selection-title">Lose</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Eat at a calorie deficit to encourage fat burning.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handlePanel('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Radio
                checked={this.state.goal === 'maintain'}
                onChange={this.handleSelection}
                value="maintain"
                name="goal"
              />
              <Typography className="selection-title">Maintain</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Eat roughly the same amount of calories as are being burned, to maintain current weight.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handlePanel('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Radio
                checked={this.state.goal === 'gain'}
                onChange={this.handleSelection}
                value="gain"
                name="goal"
              />
              <Typography className="selection-title">Gain</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Eat at a calorie surplus aiming to gain weight.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Paper>
    );
  }
}

export default Goal;
