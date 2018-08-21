import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      goal: '',
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
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handlePanel('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Radio
              checked={this.state.goal === 'lose'}
              onChange={this.handleSelection}
              value="lose"
              name="goal"
            />
            <Typography>Lose</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
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
            <Typography>Maintain</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handlePanel('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Radio
              checked={this.state.activityLevel === 'gain'}
              onChange={this.handleSelection}
              value="gain"
              name="goal"
            />
            <Typography>Gain</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </Paper>
    );
  }
}

export default Goal;
