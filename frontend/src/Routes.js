import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Shop from "./components/Shop/Shop";
import AddProduct from "./components/Products/AddProduct/AddProduct";
import UpdateProduct from "./components/Products/UpdateProduct/UpdateProduct";
import ShowOrders from "./components/Shop/Orders/ShowOrders";

export default class Routes extends Component {
  render() {
    // console.log("routes",this.props.isAuthUser);
    return (
      <Router history={history}>
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/About" component={About} />
          <Route path="/AddProduct" component={AddProduct} />
          <Route
            path="/Shop"
            render={(props) => (
              <Shop {...props} isAuthUser={this.props.isAuthUser} />
            )}
          />
          <Route
            path="/UpdateProduct"
            render={(props) => <UpdateProduct {...props} />}
          />
          <Route path="/ShowOrders" component={ShowOrders} />
          <Route path="/" component={Home} />

        </Switch>
      </Router>
    );
  }
}
