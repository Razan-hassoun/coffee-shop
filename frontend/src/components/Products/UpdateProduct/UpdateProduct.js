import React from "react";
import axios from "axios";
import history from "../../../history";

class UpdateProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      img: "",
      category: "",
      price: 1,
      units: 1,
      softDelete: false,
      error: "",
    };
  }

  componentDidMount() {
    const authResult = new URLSearchParams(window.location.search);
    const id = authResult.get("id");
    // console.log("id is ", id);

    const fetchPosts = async () => {
      const res = await axios.get("/api/items/" + id);
      //   console.log(res.data);
      if (res.status === 200) {
        var item = res.data;
        this.setState({
          id: id,
          name: item.name,
          description: item.description,
          img: item.img,
          category: item.category,
          price: item.price,
          units: item.units,
          softDelete:item.softDelete
        });
        console.log("Item found in database", item);
      } else {
        console.log("Item not found in database");
      }
    };

    fetchPosts();
  }

  onChange = (event) => {
    // console.log(event.target.name, event.target.value);
    var incoming = event.target.value;
    switch (event.target.name) {
      case "name":
        if (incoming.length > 5) this.setState({ error: "" });
        else this.setState({ error: "Enter name more than 5 characters." });

        break;
      case "description":
        console.log("less than 6");
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
      case "softDelete":
        this.setState({
          softDelete: event.target.checked
        });
        break;
      default:
    }

    if (event.target.name !== "softDelete")
      this.setState({ [event.target.name]: event.target.value });
  };

  updateDatabase = (event) => {
    event.preventDefault();
    if (this.state.error.length === 0) {
      // console.log(this.state);
      const id = this.state.id;
      const name = this.state.name;
      const description = this.state.description;
      const img = this.state.img;
      const category = this.state.category;
      const price = this.state.price;
      const units = this.state.units;
      const softDelete = this.state.softDelete;
      console.log(softDelete);
      //Request body
      const body = JSON.stringify({
        name,
        description,
        img,
        category,
        price,
        units,
        softDelete
      });
      var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userAuth.user.token,
        },
      };
      var uri = "/api/items/" + id;
      console.log(uri);
      axios.put(uri, body, config).then(
        (res) => {
          console.log(res.data, res.status);
          history.push("../Shop");
        },
        (err) => {
          this.setState({ error: "Item could not be updated. Check again." });
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
              value={this.state.name}
              name="name"
              placeholder="Enter Item name"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              defaultValue={this.state.description}
              id="description"
              rows="3"
              onChange={this.onChange.bind(this)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="img">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="img"
              value={this.state.img}
              name="img"
              placeholder="Enter Image URL"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={this.state.category}
              name="category"
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
              value={this.state.price}
              name="price"
              min="0"
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
              value={this.state.units}
              name="units"
              min="0"
              placeholder="in numbers"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="softDelete"
              name="softDelete"
              checked={this.state.softDelete}
              onChange={this.onChange.bind(this)}
            />
            <label className="form-check-label" htmlFor="softDelete">
              Soft Delete
            </label>
          </div>
          <div className="col-lg-6 col-sm-6 col-6 checkout">
            <button
              onClick={this.updateDatabase.bind(this)}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateProduct;
