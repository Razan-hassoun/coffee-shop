import React from "react";
import Products from "../../containers/Products";
import { Provider } from "react-redux";
import Store from "../../Store";

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthUser: false,
      loading: false,
      currentPage: 1,
      itemsPerPage: 10,
    };
  }

  componentDidMount() {
    var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
    if (userAuth && userAuth.isAuthorised && userAuth.user.user.isAdmin) {
      this.setState({ isAuthUser: true });
    }
  }

  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  render() {
    // console.log("Shop auth", this.props.isAuthUser);
    var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
    var isAuthentic = false;
    //case when navigation returned false due to refresh, but actual user is still logged in
    if (
      userAuth &&
      userAuth.isAuthorised &&
      userAuth.user.user.isAdmin !== this.props.isAuthorised
    )
      isAuthentic = userAuth.user.user.isAdmin;
    else if (
      userAuth &&
      userAuth.isAuthorised &&
      userAuth.user.user.isAdmin === this.props.isAuthorised
    )
      isAuthentic = this.props.isAuthUser;

    return (
      <div className="container clearfix d-flex flex-column mt-1">
        <div className="row clearfix">
          <Provider store={Store}>
            <Products isAuthUser={isAuthentic} />
          </Provider>
        </div>
      </div>
    );
  }
}

export default Shop;
