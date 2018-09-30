import React, { Component } from "react";

const MacroContext = React.createContext();

class MacroContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      heightUnit: "cm",
      weightUnit: "kg",
      age: "",
      height: "",
      weight: "",
      convertedHeight: "",
      convertedWeight: "",
      gender: "",
      rce: "",
      totalCals: "",
      goalCals: "",
      totalProtein: "",
      totalFat: "",
      totalCarbs: "",
      activityLevel: "Sedentary",
      goal: "Lose",
      ageErrorText: "",
      heightErrorText: "",
      weightErrorText: "",
      genderErrorText: "",
      ageValidation: "",
      heightValidation: "",
      weightValidation: "",
      genderValidation: ""
    };
  }

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
      activityLevel: "",
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

  //Calculate macro information when finish button is pressed
  unitConversion = () => {
    if (this.state.weightUnit === "lb" && this.state.heightUnit === "ft/in") {
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
    } else if (this.state.weightUnit === "lb") {
      let kiloConversion = this.state.weight * 0.453592;
      //convert lbs into kilos, assign this.state.height to convertedHeight for processing
      this.setState(
        { convertedWeight: kiloConversion, convertedHeight: this.state.height },
        () => {
          //ensure that converted weight state set before calculating further
          this.calcRestingCals();
        }
      );
    } else if (this.state.heightUnit === "ft/in") {
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
    if (this.state.gender === "Male") {
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
    if (this.state.activity === "Sedentary") {
      let totalCals = Math.floor(this.state.rce * 1.2);
      this.setState({ totalCals: totalCals }, () => {
        //ensure that totalCals state set before calculating further
        this.calcGoalCals();
      });
    } else if (this.state.activity === "Light") {
      let totalCals = Math.floor(this.state.rce * 1.375);
      this.setState({ totalCals: totalCals }, () => {
        //ensure that totalCals state set before calculating further
        this.calcGoalCals();
      });
    } else if (this.state.activity === "Moderate") {
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
    if (this.state.goal === "Lose") {
      let goalCals = Math.floor(
        this.state.totalCals - this.state.totalCals * 0.2
      );
      this.setState({ goalCals: goalCals }, () => {
        //ensure that goalCals state set before calculating further
        this.calcMacroSplit();
      });
    } else if (this.state.goal === "Gain") {
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

  //validation events
  validateAge = event => {
    if (event.target.value === "") {
      //validation to make required
      this.setState({ ageErrorText: "Age is required" });
    } else if (event.target.value < 15 || event.target.value > 90) {
      this.setState({ ageErrorText: "Age must be between 15 and 90" });
    } else if (Number.isInteger(parseInt(event.target.value)) === false) {
      this.setState({ ageErrorText: "No decimals allowed" });
    } else {
      this.setState({ ageErrorText: "" });
      this.setState({ ageValidation: "true" });
    }
  };
  validateHeight = event => {
    if (event.target.value === "") {
      //validation to make required
      this.setState({ heightErrorText: "Height is required" });
    } else {
      this.setState({ heightErrorText: "" });
      this.setState({ heightValidation: "true" });
    }
  };
  validateWeight = event => {
    if (event.target.value === "") {
      //validation to make required
      this.setState({ weightErrorText: "Weight is required" });
    } else if (event.target.value < 30 || event.target.value > 400) {
      this.setState({ weightErrorText: "Weight must be between 30 and 400" });
    } else {
      this.setState({ weightErrorText: "" });
      this.setState({ weightValidation: "true" });
    }
  };
  validateGender = () => {
    if (this.state.gender === "") {
      //validation to make required
      this.setState({ genderErrorText: "Gender is required" });
    } else {
      this.setState({ genderErrorText: "" });
      this.setState({ genderValidation: "true" });
    }
  };

  render() {
    const { children } = this.props;
    var macroData = {
      labels: [
        "Protein: " + this.state.totalProtein + "g",
        "Fat: " + this.state.totalFat + "g",
        "Carbohydrate: " + this.state.totalCarbs + "g"
      ],
      datasets: [
        {
          label: "Macronutrients Allowance",
          data: [
            this.state.totalProtein,
            this.state.totalFat,
            this.state.totalCarbs
          ],
          backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
        }
      ]
    };

    var calorieData = {
      //labels: ["Resting", "Total", "Goal"],
      datasets: [
        {
          label: "Resting Calorie Expenditure: " + this.state.rce,
          data: [this.state.rce],
          backgroundColor: "#36A2EB"
        },
        {
          label: "Total Calorie Expenditure: " + this.state.totalCals,
          data: [this.state.totalCals],
          backgroundColor: "#FFCE56"
        },
        {
          label: "Goal Calorie Intake: " + this.state.goalCals,
          data: [this.state.goalCals],
          backgroundColor: "#FF6384"
        }
      ]
    };
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
      <MacroContext.Provider
        value={{
          //handlers for user input
          state: this.state,
          handleRadio: event =>
            this.setState({ [event.target.name]: event.target.value }),
          handleBody: event =>
            this.setState({ [event.target.id]: event.target.value }),
          //handlers for calcInput stepper
          handleFinish: this.handleFinish,
          handleReset: this.handleReset,
          handleBack: this.handleBack,
          handleNext: this.handleNext,
          //handlers for validation
          isEnabled: isEnabled,
          validateAge: this.validateAge,
          validateHeight: this.validateHeight,
          validateWeight: this.validateWeight,
          validateGender: this.validateGender,
          //data for charts
          macroData: macroData,
          calorieData: calorieData
        }}
      >
        {children}
      </MacroContext.Provider>
    );
  }
}

export default MacroContextProvider;

export const MacroContextConsumer = MacroContext.Consumer;
