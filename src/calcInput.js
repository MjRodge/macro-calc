import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BodyInfo from './bodyInfo';
import ActivityInfo from './activityInfo';
import Goal from './goal';
import MacroOutput from './macroOutput';
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
      gender: '',
      activity: '',
      goal: '',
      rce: '',
      totalCals: '',
    };
  }

//handle props passed from bodyInfo.js component
  handlePassedAge = passedAge => {
    this.setState({ age: passedAge })
  };
  handlePassedHeight = passedHeight => {
    this.setState({ height: passedHeight })
  };
  handlePassedWeight = passedWeight => {
    this.setState({ weight: passedWeight })
  };
  handlePassedGender = passedGender => {
    this.setState({ gender: passedGender })
  };

//handle props passed from activityInfo.js Component
  handlePassedActivity = passedActivity => {
    this.setState({ activity: passedActivity })
  };

//handle props passed from goal.js Component
  handlePassedGoal = passedGoal => {
    this.setState({ goal: passedGoal })
  };

//Calculate macro information when finish button is pressed
  calcRestingCals = () => {
    if (this.state.gender === "male") {
      let rce = ((10*this.state.weight)+(6.25*this.state.height)-(5*this.state.age)+5);
      console.log(rce);
      this.setState({ rce: rce }, () => {
        this.calcTotalCals();
      });
    } else {
      let rce = ((10*this.state.weight)+(6.25*this.state.height)-(5*this.state.age)-161);
      console.log(rce);
      this.setState({ rce: rce });
    }
  }
  calcTotalCals = () => {
    if (this.state.activity === "sedentary") {
      let totalCals = (this.state.rce*1.2);
      this.setState({ totalCals: totalCals });
      console.log(totalCals);
    } else if (this.state.activity === "light") {
      let totalCals = (this.state.rce*1.375);
      this.setState({ totalCals: totalCals });
      console.log(totalCals);
    } else if (this.state.activity === "moderate") {
      let totalCals = (this.state.rce*1.55);
      this.setState({ totalCals: totalCals });
      console.log(totalCals);
    } else {
      let totalCals = (this.state.rce*1.725);
      this.setState({ totalCals: totalCals });
      console.log(totalCals);
    }
  }

//handles for stepper
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
  handleFinish = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
    //DO MACRO FUNCTION HERE
    this.calcRestingCals();
  }

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
              <MacroOutput
                passedRCE={this.state.rce}/>
              <Button variant="contained" color="secondary" onClick={this.handleReset} style={style.formButtons}>Reset</Button>
            </div>
          ) : (
            <div>
              {activeStep === 0 ?
                <BodyInfo
                  passedAge={this.handlePassedAge}
                  passedHeight={this.handlePassedHeight}
                  passedWeight={this.handlePassedWeight}
                  passedGender={this.handlePassedGender} />
                : null}
              {activeStep === 1 ?
                <ActivityInfo
                  passedActivity={this.handlePassedActivity} />
                : null}
              {activeStep === 2 ?
                <Goal
                  passedGoal={this.handlePassedGoal} />
                : null}
              {activeStep === steps.length - 1 ?
                <div className="form-input-buttons">
                  <Button variant="contained" color="secondary" onClick={this.handleFinish} style={style.formButtons}>
                    Finish
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    style={style.formButtons}
                  >
                    Back
                  </Button>
                </div>
                :
                <div className="form-input-buttons">
                  <Button variant="contained" color="secondary" onClick={this.handleNext} style={style.formButtons}>
                    Next
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    style={style.formButtons}
                  >
                    Back
                  </Button>
                </div>
              }
            </div>
          )}
        </div>
        <h3>rce: {this.state.rce}</h3>
        <h3>age: {this.state.age}</h3>
        <h3>weight: {this.state.weight}</h3>
        <h3>height: {this.state.height}</h3>
        <h3>gender: {this.state.gender}</h3>
        <h3>activity: {this.state.activity}</h3>
        <h3>goal: {this.state.goal}</h3>
      </div>
    );
  }
}

export default CalcInput;
