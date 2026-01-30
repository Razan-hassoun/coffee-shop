import React from "react";
import axios from "axios";
import CartItem from "./CartItem";
import { addToCartAction } from "../../redux/actions/CartAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CartList extends React.PureComponent {
  constructor(props) {
    super(props);

    const localCart = localStorage.getItem("localCart");
    const prevCart = localCart ? JSON.parse(localCart) : [];

    let prevCartTotalAmount = 0;
    let prevCartTotalQuantity = 0;

    for (let i = 0; i < prevCart.length; i++) {
      prevCartTotalAmount += prevCart[i].price * prevCart[i].units;
      prevCartTotalQuantity += prevCart[i].units;
    }

    this.state = {
      cart: prevCart,
      cartTotalAmount: prevCartTotalAmount,
      cartTotalQuantity: prevCartTotalQuantity,
      orderPlaced: false,
    };
  }

  handleAddProduct = (product) => {
    this.props.addToCartAction(product);
    this.setState({ orderPlaced: false });
  };

  updateStates = (cart) => {
    let cartTotalAmount = 0;
    let cartTotalQuantity = 0;

    for (let i = 0; i < cart.length; i++) {
      cartTotalAmount += cart[i].price * cart[i].units;
      cartTotalQuantity += cart[i].units;
    }

    this.setState({
      cart,
      cartTotalAmount,
      cartTotalQuantity,
    });
  };

  // ✅ CREATE ORDER 
  CreateOrder = async (e) => {
    e.preventDefault();

    const userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));

    if (!userAuth || !userAuth.user || !userAuth.user.token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAuth.user.token,
      },
    };

    const body = {
      order: this.state.cart,
      user: userAuth.user.user,
      orderTotalQuantity: this.state.cartTotalQuantity,
      orderTotalAmount: this.state.cartTotalAmount,
    };

    try {
      const res = await axios.post("/api/orders/", body, config);
      console.log(res.data);

      this.setState({ orderPlaced: true });
      localStorage.removeItem("localCart");
      this.updateStates([]);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.cart !== this.props.cart &&
      !this.state.orderPlaced
    ) {
      this.updateStates(this.props.cart);
      localStorage.setItem(
        "localCart",
        JSON.stringify(this.props.cart)
      );
    }
  }

  render() {
    return (
      <div className="dropdown">
        <button type="button" className="btn btn-info" data-toggle="dropdown">
          <i className="fa fa-shopping-cart mr-1" />
          Shopping Cart
          <span className="badge badge-pill badge-danger ml-1">
            {this.state.cartTotalQuantity}
          </span>
        </button>

        <form className="dropdown-menu">
          <div className="row total-header-section">
            <div className="col-6">
              <i className="fa fa-shopping-cart" />
              <span className="badge badge-pill badge-danger ml-1">
                {this.state.cartTotalQuantity}
              </span>
            </div>
            <div className="col-6 text-right">
              <p>
                Total:
                <span className="text-info ml-1">
                  ${this.state.cartTotalAmount}
                </span>
              </p>
            </div>
          </div>

          {this.state.cart.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              addProd={this.handleAddProduct}
            />
          ))}

          <div className="text-center checkout">
            <button
              className="btn btn-primary btn-block"
              onClick={this.CreateOrder}
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cart,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCartAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(CartList);
