import React from "react";
import SignIn from "./SignIn";
import Register from "./Register";
import axios from "axios";

export default class Authorise extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      isRegister: true,
      isAuthenticated: false,
      error: "",
    };
  }

  authenticateUser = (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post("/api/auth/", userData, config).then(
      (res) => {
        console.log(res.data, res.status);
        var data = { user: res.data, isAuthorised: true };
        this.props.authUser(data);
        this.setState({ isAuthenticated: true });
      },
      (err) => {
        this.setState({ error: "Invalid Credentials" });
        console.log(err);
      }
    );
  };

  saveNewUser = (userData) => {
    // console.log("Register body", userData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post("/api/users/", userData, config).then(
      (res) => {
        console.log(res.data, res.status);
        var data = { user: res.data, isAuthorised: true };
        this.props.authUser(data);
        this.setState({ isAuthenticated: true });
      },
      (err) => {
        this.setState({ error: "Email already exists" });
        console.log(err)}
    );
  };

  logOut = (e) => {
    e.preventDefault();
    this.setState({ isAuthenticated: false });
    var data = { user: "", isAuthorised: false };
    this.props.authUser(data);
    //localstorage value removed in parent, Navbar.js
  };

  switchType = (e) => {
    e.preventDefault();

    this.state.isLogin
      ? this.setState({
          isLogin: false,
          isRegister: true,
        })
      : this.setState({
          isLogin: true,
          isRegister: false,
        });
  };

  componentDidMount() {
    var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
    if (userAuth && userAuth.isAuthorised) {
      this.setState({ isAuthenticated: true });
    }
  }

  componentDidUpdate() {
    var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
    if (userAuth && userAuth.isAuthorised) {
      this.setState({ isAuthenticated: true });
    }
  }

  render() {
    // console.log("Current auth state", this.state.isAuthenticated);

    return (
      <>
        {this.state.isAuthenticated && (
          <button
            onClick={this.logOut.bind(this)}
            className="btn btn-info mr-2"
          >
            <i className="fa fa-sign-out mr-1" aria-hidden="true"></i>
            {"Logout"}
          </button>
        )}

        {!this.state.isAuthenticated && (
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-info"
              data-toggle="dropdown"
            >
              {!this.state.isAuthenticated && this.state.isLogin && (
                <>
                  <i className="fa fa-sign-in mr-1" aria-hidden="true"></i>
                  {"Login"}
                </>
              )}
              {!this.state.isAuthenticated && this.state.isRegister && (
                <>
                  <i className="fa fa-registered mr-1" aria-hidden="true"></i>
                  {"Register"}
                </>
              )}
            </button>
            <form className="dropdown-menu" method="post">
              <div className="row total-header-section">
                <div className="col-lg-3 col-sm-3 col-3">
                  {this.state.isLogin && (
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  )}
                  {this.state.isRegister && (
                    <i className="fa fa-registered" aria-hidden="true"></i>
                  )}
                </div>
                <div className="col-lg-9 col-sm-9 col-9 total-section text-right signin">
                  <button
                    onClick={this.switchType.bind(this)}
                    className="btn btn-primary"
                  >
                    {this.state.isLogin && "Want to Register"}
                    {this.state.isRegister && "Want to Login"}
                  </button>
                </div>
              </div>
              {this.state.error.length > 0 && (
                <ul className="list-group">
                  <li className="list-group-item list-group-item-danger">
                    {this.state.error}
                  </li>
                </ul>
              )}
              {this.state.isLogin && (
                <SignIn userDetails={this.authenticateUser} />
              )}
              {this.state.isRegister && (
                <Register userDetails={this.saveNewUser} />
              )}
            </form>
          </div>
        )}
      </>
    );
  }
}
