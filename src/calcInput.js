import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BodyInfo from './bodyInfo';
import ActivityInfo from './activityInfo';
import Goal from './goal';
import './css/paper.css';

function getSteps() {
  return ['Body Information', 'Activity Level', 'Goal'];
}

const style = {
  formButtons: {
    float: 'right',
  },
}

class CalcInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      age: '',
      height: '',
      weight: '',
    };
  }

  handlePassedAge = passedAge => {
    this.setState({ age: passedAge })
  };
  handlePassedHeight = passedHeight => {
    this.setState({ height: passedHeight })
  };
  handlePassedWeight = passedWeight => {
    this.setState({ weight: passedWeight })
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography >All steps completed</Typography>
              <Button onClick={this.handleReset} style={style.formButtons}>Reset</Button>
            </div>
          ) : (
            <div>
              {activeStep === 0 ?
                <BodyInfo
                  passedAge={this.handlePassedAge}
                  passedHeight={this.handlePassedHeight}
                  passedWeight={this.handlePassedWeight} />
                : null}
              {activeStep === 1 ? <ActivityInfo /> : null}
              {activeStep === 2 ? <Goal /> : null}
              <div className="form-input-buttons">
                <Button variant="contained" color="secondary" onClick={this.handleNext} style={style.formButtons}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  style={style.formButtons}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
        <h1>age: {this.state.age}</h1>
        <h1>weight: {this.state.weight}</h1>
        <h1>height: {this.state.height}</h1>
      </div>
    );
  }
}

export default CalcInput;
