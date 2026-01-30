import React from "react";
import axios from "axios";
import history from "../../../history";

class AddProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      img: "",
      category: "Espresso",
      price: 1,
      units: 1,
      error: "",
    };
  }

  onChange = (event) => {
    // console.log(event.target.name, event.target.value);
    var incoming = event.target.value;
    switch (event.target.name) {
      case "name":
        if (incoming.length > 3) this.setState({ error: "" });
        else this.setState({ error: "Enter name more than 3 characters." });

        break;
      case "description":
        if (incoming.length < 6) {
          this.setState({
            error: "Description should be more than 5 characters",
          });
        } else this.setState({ error: "" });
        break;
      case "category":
        if (incoming.length < 3) {
          this.setState({
            error:
              "Category name needs to be given and greater than 3 characters.",
          });
        } else this.setState({ error: "" });
        break;
      case "price":
        if (Number.isInteger(parseInt(incoming))) this.setState({ error: "" });
        else
          this.setState({
            error: "Price should be a number.",
          });
        break;
        case "units":
        if (Number.isInteger(parseInt(incoming))) this.setState({ error: "" });
        else
          this.setState({
            error: "Unit should be a number.",
          });
        break;
      default:
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  AddToDatabase = (event) => {
    event.preventDefault();
    if (this.state.error.length === 0) {
      // console.log(this.state);
      const name = this.state.name;
      const description = this.state.description;
      const img = this.state.img;
      const category = this.state.category;
      const price = this.state.price;
      const units = this.state.units;

      //Request body
      const body = JSON.stringify({
        name,
        description,
        img,
        category,
        price,
        units,
      });
      var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userAuth.user.token,
        },
      };
      axios.post("/api/items/", body, config).then(
        (res) => {
          console.log(res.data, res.status);
          history.push("../Shop");
        },
        (err) => {
          this.setState({ error: "Item could not be inserted. Check again." });
          console.log(err);
        }
      );
    }
  };

  render() {
    return (
      <div className="container">
        <h3>Enter item details:</h3>
        {this.state.error.length > 0 && (
          <ul className="list-group">
            <li className="list-group-item list-group-item-danger">
              {this.state.error}
            </li>
          </ul>
        )}
        <form className="col-sm-9">
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Item name"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter description"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="img"
              name="img"
              placeholder="Enter Image URL"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={this.state.category}
              placeholder="Enter Category"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              min="1"
              value={this.state.price}
              placeholder="in numbers"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Units</label>
            <input
              type="number"
              className="form-control"
              id="units"
              name="units"
              min="1"
              value={this.state.units}
              placeholder="in numbers"
              onChange={this.onChange.bind(this)}
            />
          </div>

          <div className="col-lg-6 col-sm-6 col-6 checkout">
            <button
              onClick={this.AddToDatabase.bind(this)}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Add to Database
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
