import React, { Component } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import BodyInfo from "./bodyInfo";
import ActivityInfo from "./activityInfo";
import Goal from "./goal";
import MacroOutput from "./macroOutput";
import "./css/paper.css";

function getSteps() {
  return ["Body Information", "Activity Level", "Goal"];
}

const style = {
  formButtons: {
    float: "right",
    margin: "2px",
    marginBottom: "8px"
  }
};

class CalcInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      age: "",
      height: "",
      weight: "",
      //original height and weight state kept unconverted to ouput with results
      //conversions used for calulations
      convertedHeight: "",
      convertedWeight: "",
      gender: "",
      activity: "",
      goal: "",
      rce: "",
      totalCals: "",
      goalCals: "",
      totalProtein: "",
      totalFat: "",
      totalCarbs: "",
      ageValidation: "",
      heightValidation: "",
      weightValidation: "",
      genderValidation: ""
    };
  }

  //handle props passed from bodyInfo.js component
  handlePassedAge = passedAge => {
    this.setState({ age: passedAge });
  };
  handlePassedHeight = passedHeight => {
    this.setState({ height: passedHeight });
  };
  handlePassedWeight = passedWeight => {
    this.setState({ weight: passedWeight });
  };
  handlePassedGender = passedGender => {
    this.setState({ gender: passedGender });
  };
  handlePassedAgeValidation = passedAgeValidation => {
    this.setState({ ageValidation: passedAgeValidation });
  };
  handlePassedHeightValidation = passedHeightValidation => {
    this.setState({ heightValidation: passedHeightValidation });
  };
  handlePassedWeightValidation = passedWeightValidation => {
    this.setState({ weightValidation: passedWeightValidation });
  };
  handlePassedGenderValidation = passedGenderValidation => {
    this.setState({ genderValidation: passedGenderValidation });
  };

  //handle props passed from activityInfo.js Component
  handlePassedActivity = passedActivity => {
    this.setState({ activity: passedActivity });
  };

  //handle props passed from goal.js Component
  handlePassedGoal = passedGoal => {
    this.setState({ goal: passedGoal });
  };

  //Calculate macro information when finish button is pressed
  unitConversion = () => {
    if (
      this.props.passedWeightUnit === "lb" &&
      this.props.passedHeightUnit === "ft/in"
    ) {
      let kiloConversion = this.state.weight * 0.453592;
      let heightSplitArray = this.state.height.split("'");
      let cmConversion =
        (Number(heightSplitArray[0]) * 12 + Number(heightSplitArray[1])) * 2.54;
      this.setState(
        { convertedWeight: kiloConversion, convertedHeight: cmConversion },
        () => {
          //ensure that converted weight and height state set before calculating further
          this.calcRestingCals();
        }
      );
    } else if (this.props.passedWeightUnit === "lb") {
      let kiloConversion = this.state.weight * 0.453592;
      //convert lbs into kilos, assign this.state.height to convertedHeight for processing
      this.setState(
        { convertedWeight: kiloConversion, convertedHeight: this.state.height },
        () => {
          //ensure that converted weight state set before calculating further
          this.calcRestingCals();
        }
      );
    } else if (this.props.passedHeightUnit === "ft/in") {
      let heightSplitArray = this.state.height.split("'");
      let cmConversion =
        (Number(heightSplitArray[0]) * 12 + Number(heightSplitArray[1])) * 2.54;
      //convert ft/in into cms, assign this.state.weight to convertedWeight for processing
      this.setState(
        { convertedHeight: cmConversion, convertedWeight: this.state.weight },
        () => {
          //ensure that converted height state set before calculating further
          this.calcRestingCals();
        }
      );
    } else {
      //already in units of choice, assign to converted* for processing
      this.setState(
        {
          convertedWeight: this.state.weight,
          convertedHeight: this.state.height
        },
        () => {
          this.calcRestingCals();
        }
      );
    }
  };
  calcRestingCals = () => {
    //ADD CHECK/CONVERSION FOR MEASUREMENT UNITS [THIS.PROPS.PASSEDWEIGHTUNIT]
    if (this.state.gender === "male") {
      let rce = Math.floor(
        10 * this.state.convertedWeight +
          6.25 * this.state.convertedHeight -
          5 * this.state.age +
          5
      );
      this.setState({ rce: rce }, () => {
        //ensure that rce state set before calculating further
        this.calcTotalCals();
      });
    } else {
      let rce = Math.floor(
        10 * this.state.convertedWeight +
          6.25 * this.state.convertedHeight -
          5 * this.state.age -
          161
      );
      this.setState({ rce: rce }, () => {
        //ensure that rce state set before calculating further
        this.calcTotalCals();
      });
    }
  };
  calcTotalCals = () => {
    if (this.state.activity === "sedentary") {
      let totalCals = Math.floor(this.state.rce * 1.2);
      this.setState({ totalCals: totalCals }, () => {
        //ensure that totalCals state set before calculating further
        this.calcGoalCals();
      });
    } else if (this.state.activity === "light") {
      let totalCals = Math.floor(this.state.rce * 1.375);
      this.setState({ totalCals: totalCals }, () => {
        //ensure that totalCals state set before calculating further
        this.calcGoalCals();
      });
    } else if (this.state.activity === "moderate") {
      let totalCals = Math.floor(this.state.rce * 1.55);
      this.setState({ totalCals: totalCals }, () => {
        //ensure that totalCals state set before calculating further
        this.calcGoalCals();
      });
    } else {
      let totalCals = Math.floor(this.state.rce * 1.725);
      this.setState({ totalCals: totalCals }, () => {
        //ensure that totalCals state set before calculating further
        this.calcGoalCals();
      });
    }
  };
  calcGoalCals = () => {
    if (this.state.goal === "lose") {
      let goalCals = Math.floor(
        this.state.totalCals - this.state.totalCals * 0.2
      );
      this.setState({ goalCals: goalCals }, () => {
        //ensure that goalCals state set before calculating further
        this.calcMacroSplit();
      });
    } else if (this.state.goal === "gain") {
      let goalCals = Math.floor(
        this.state.totalCals + this.state.totalCals * 0.2
      );
      this.setState({ goalCals: goalCals }, () => {
        //ensure that goalCals state set before calculating further
        this.calcMacroSplit();
      });
    } else {
      let goalCals = this.state.totalCals;
      this.setState({ goalCals: goalCals }, () => {
        //ensure that goalCals state set before calculating further
        this.calcMacroSplit();
      });
    }
  };
  calcMacroSplit = () => {
    let totalProtein = Math.floor(this.state.convertedWeight * 2.2 * 0.825);
    this.setState({ totalProtein: totalProtein });
    let totalFat = Math.floor((this.state.goalCals * 0.18) / 9);
    this.setState({ totalFat: totalFat });
    let totalCarbs = Math.floor(
      (this.state.goalCals - totalProtein * 4 - totalFat * 9) / 4
    );
    this.setState({ totalCarbs: totalCarbs });
  };

  //handles for stepper
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };
  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };
  handleReset = () => {
    this.setState({
      activeStep: 0,
      //set all state to empty
      age: "",
      height: "",
      weight: "",
      convertedHeight: "",
      convertedWeight: "",
      gender: "",
      activity: "",
      goal: "",
      rce: "",
      totalCals: "",
      goalCals: "",
      totalProtein: "",
      totalFat: "",
      totalCarbs: "",
      ageValidation: "",
      heightValidation: "",
      weightValidation: "",
      genderValidation: ""
    });
  };
  handleFinish = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
    //DO MACRO FUNCTION HERE
    //unitConversion always only function called - first in chain
    this.unitConversion();
  };

  render() {
    //for material-ui stepper
    const steps = getSteps();
    const { activeStep } = this.state;

    //to disable next button when conditions are not met
    const {
      ageValidation,
      heightValidation,
      weightValidation,
      genderValidation
    } = this.state;
    const isEnabled =
      ageValidation.length > 0 &&
      heightValidation.length > 0 &&
      weightValidation.length > 0 &&
      genderValidation.length > 0;

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
                passedRCE={this.state.rce}
                passedTotalCals={this.state.totalCals}
                passedGoalCals={this.state.goalCals}
                passedProtein={this.state.totalProtein}
                passedFat={this.state.totalFat}
                passedCarbs={this.state.totalCarbs}
                passedAge={this.state.age}
                passedHeight={this.state.height}
                passedWeight={this.state.weight}
                passedGender={this.state.gender}
                passedActivity={this.state.activity}
                passedGoal={this.state.goal}
                passedWeightUnit={this.props.passedWeightUnit}
                passedHeightUnit={this.props.passedHeightUnit}
              />
              <div className="form-input-buttons">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleReset}
                  style={style.formButtons}
                >
                  Reset
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
          ) : (
            <div>
              {activeStep === 0 ? (
                <BodyInfo
                  passedAge={this.handlePassedAge}
                  passedHeight={this.handlePassedHeight}
                  passedWeight={this.handlePassedWeight}
                  passedGender={this.handlePassedGender}
                  passedAgeValidation={this.handlePassedAgeValidation}
                  passedHeightValidation={this.handlePassedHeightValidation}
                  passedWeightValidation={this.handlePassedWeightValidation}
                  passedGenderValidation={this.handlePassedGenderValidation}
                  passedHeightUnit={this.props.passedHeightUnit}
                  passedWeightUnit={this.props.passedWeightUnit}
                />
              ) : null}
              {activeStep === 1 ? (
                <ActivityInfo passedActivity={this.handlePassedActivity} />
              ) : null}
              {activeStep === 2 ? (
                <Goal passedGoal={this.handlePassedGoal} />
              ) : null}
              {activeStep === steps.length - 1 ? (
                <div className="form-input-buttons">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleFinish}
                    style={style.formButtons}
                  >
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
              ) : (
                <div className="form-input-buttons">
                  {activeStep === 0 ? (
                    <Button
                      disabled={!isEnabled}
                      variant="contained"
                      color="secondary"
                      onClick={this.handleNext}
                      style={style.formButtons}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleNext}
                      style={style.formButtons}
                    >
                      Next
                    </Button>
                  )}
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    style={style.formButtons}
                  >
                    Back
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CalcInput;
