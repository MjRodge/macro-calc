import React, { Component } from "react";

const MacroContext = React.createContext();

class MacroContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      activityLevel: "sedentary",
      goal: "lose"
    };
  }
  render() {
    const { children } = this.props;

    return (
      <MacroContext.Provider
        value={{
          state: this.state,
          handleRadio: event =>
            this.setState({ [event.target.name]: event.target.value }),
          handleBody: event =>
            this.setState({ [event.target.id]: event.target.value })
        }}
      >
        {children}
      </MacroContext.Provider>
    );
  }
}

export default MacroContextProvider;

export const MacroContextConsumer = MacroContext.Consumer;
