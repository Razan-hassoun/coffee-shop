import React, { PureComponent } from "react";
import Pagination from "../../Pagination";
import axios from "axios";

class ShowOrders extends PureComponent {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      itemsPerPage: 4,
      orders: [],
    };
  }

  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  fetchPosts = async (url,token) => {
    this.setState({ loading: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const res = await axios.get(url, config);
    this.setState({ orders: res.data });
    this.setState({ loading: false });
  };

componentDidMount() {
  const userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));

  if (!userAuth || !userAuth.user) {
    alert("Please login first");
    this.props.history.push("/login");
    return;
  }

  const token = userAuth.user.token;
  const userId = userAuth.user.user.id;

  this.fetchPosts("api/orders/" + userId, token);
}


  render() {
    const indexOfLastPost = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage;
    const showOrders = this.state.orders.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    return (
      <div className="container">
        <h1>Order Details:</h1>
        <div className="mt-1 col-12">
          <ul className="list-group  my-3">
            {showOrders.map((user) => (
              <ul className="list-group my-3" key={user._id}>
                <li className="list-group-item list-group-item-success">
                  Customer Name : {user.user.name}
                </li>
                <li className="list-group-item list-group-item-success">
                  Email : {user.user.email}
                </li>
                <ul className="list-group my-3">
                  {user.order.map((order) => (
                    <li key={order.id} className="list-group-item list-group-item-info">
                      Item name:{order.name}, Price:${order.price}, Units
                      Bought:{order.units}
                    </li>
                  ))}
                </ul>
                <ul className="list-group my-1">
                  <li className="list-group-item list-group-item-primary">
                    Total Quantity: {user.orderTotalQuantity}, Total Amount: $
                    {user.orderTotalAmount}
                  </li>
                </ul>
              </ul>
            ))}
          </ul>
        </div>
        <Pagination
          itemsPerPage={this.state.itemsPerPage}
          totalItems={this.state.orders.length}
          currentPage={this.state.currentPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default ShowOrders;
