import React from "react";

export default class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  onChange = (event) => {
    var incoming = event.target.value;
    switch (event.target.name) {
      case "email":
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(incoming))
          this.setState({ error: "" });
        else this.setState({ error: "Email form: abc@xyz.com" });

        break;
      case "password":
        if (incoming.length < 6) {
          this.setState({
            error: "Password should be more than 5 characters",
          });
        } else if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{6,})/.test(
            incoming
          )
        )
          this.setState({ error: "" });
        else
          this.setState({
            error: "Password should have alphanumeric and special characters.",
          });
        break;
      default:
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  Login = (event) => {
    event.preventDefault();
    if (this.state.error.length === 0) {
      // console.log(this.state);
      const email = this.state.email;
      const password = this.state.password;

      //Request body
      const body = JSON.stringify({ email, password });
      this.props.userDetails(body);
    }
  };

  render() {
    return (
      <div className="row col-12 mt-3">
        {this.state.error.length > 0 && (
          <ul className="list-group">
            <li className="list-group-item list-group-item-danger">
              {this.state.error}
            </li>
          </ul>
        )}
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="col-lg-12 col-sm-12 col-12 text-center checkout">
          <button
            onClick={this.Login.bind(this)}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
