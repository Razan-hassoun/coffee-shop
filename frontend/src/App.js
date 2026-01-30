import React, { Component } from "react";
import Routes from "./Routes";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthUser: false,
    };
  }

  setAuth = (enable) => {
    this.setState({ isAuthUser: enable });
  };

  render() {
    return (
      <>
        <Navigation isAuthUser={this.setAuth} />
        <Routes isAuthUser={this.state.isAuthUser} />
      </>
    );
  }
}

export default App;
