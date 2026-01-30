import React from "react";
import { Provider } from "react-redux";
import Navbar from "../Navbar";
import Store from "../../Store";

class Navigation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isAuthUser: false,
    };
  }

  componentDidMount() {
    var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
    if (userAuth && userAuth.isAuthorised && userAuth.user.user.isAdmin) {
      this.setState({ isAuthUser: true });
    }
  }

  setAuthLevel = (level) => {
    console.log("Setting auth level in app.js to ", level);
    this.setState({ isAuthUser: level });
    this.props.isAuthUser(level);
  };

  render() {
    // console.log("Navigation auth", this.state.isAuthUser);
    return (
      <Provider store={Store}>
        <Navbar isAuthUser={this.setAuthLevel} />
      </Provider>
    );
  }
}

export default Navigation;
