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

import { MacroContextConsumer } from "./context/MacroContext";

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
    this.state = {};
  }

  render() {
    //for material-ui stepper
    const steps = getSteps();

    return (
      <div>
        <MacroContextConsumer>
          {context => (
            <React.Fragment>
              <Stepper activeStep={context.state.activeStep} alternativeLabel>
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                {context.state.activeStep === steps.length ? (
                  <div>
                    <MacroOutput />
                    <div className="form-input-buttons">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={context.handleReset}
                        style={style.formButtons}
                      >
                        Reset
                      </Button>
                      <Button
                        disabled={context.state.activeStep === 0}
                        onClick={context.handleBack}
                        style={style.formButtons}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {context.state.activeStep === 0 ? <BodyInfo /> : null}
                    {context.state.activeStep === 1 ? <ActivityInfo /> : null}
                    {context.state.activeStep === 2 ? <Goal /> : null}
                    {context.state.activeStep === steps.length - 1 ? (
                      <div className="form-input-buttons">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={context.handleFinish}
                          style={style.formButtons}
                        >
                          Finish
                        </Button>
                        <Button
                          disabled={context.state.activeStep === 0}
                          onClick={context.handleBack}
                          style={style.formButtons}
                        >
                          Back
                        </Button>
                      </div>
                    ) : (
                      <div className="form-input-buttons">
                        {context.state.activeStep === 0 ? (
                          <Button
                            disabled={!context.isEnabled}
                            variant="contained"
                            color="secondary"
                            onClick={context.handleNext}
                            style={style.formButtons}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={context.handleNext}
                            style={style.formButtons}
                          >
                            Next
                          </Button>
                        )}
                        <Button
                          disabled={context.state.activeStep === 0}
                          onClick={context.handleBack}
                          style={style.formButtons}
                        >
                          Back
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </MacroContextConsumer>
      </div>
    );
  }
}

export default CalcInput;
