import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Product from "../components/Products/Product";
import Pagination from "../components/Pagination";
import { addToCartAction } from "../redux/actions/CartAction";
import history from "./../history";
import axios from "axios";

class Products extends PureComponent {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      itemsPerPage: 4,
      products: [],
      search: "",
      category: "All",
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Search = (event) => {
    event.preventDefault();
    // console.log(this.state);
    const search = this.state.search;

    if (search === "") {
      this.setState({ category: "All" });
      this.fetchPosts("api/items");
    } else {
      if (this.state.category === "All") {
        const uri = "api/items/name/" + search;
        this.fetchPosts(uri);
      } else {
        const uri =
          "api/items/category/" + this.state.category + "/name/" + search;
        // console.log("search cat,name", uri);
        this.fetchPosts(uri);
      }
    }
  }; 

  Category = (event) => {
    var category = event.target.value;
    this.setState({ category: category });
    // console.log("category changes", category);
    const uri = "api/items/category/" + category;

    if (category === "All") this.fetchPosts("api/items");
    else this.fetchPosts(uri);
  };

  handleAddProduct = (product) => {
    // console.log("clicked",product);
    // console.log("this",this.state);
    this.props.addToCartAction(product);
  };

  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  fetchPosts = async (url) => {
    this.setState({ loading: true });
    const res = await axios.get(url);
    // console.log("got data",res.data);
    this.setState({ products: res.data });
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.fetchPosts("api/items");
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage;
    const showProducts = this.state.products.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light col-12">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <select
              className="form-control col-3"
              name="category"
              value={this.state.category}
              onChange={this.Category.bind(this)}
            >
              <option className="nav-item dropdown" value="All">
                All
              </option>
              <option className="nav-item dropdown" value="Espresso">
                Espresso
              </option>
              <option className="nav-item dropdown" value="Ristretto">
                Ristretto
              </option>
              <option className="nav-item dropdown" value="Drip Brew">
                Drip Brew
              </option>
            </select>
            <ul className="navbar-nav mr-auto justify-center"></ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                onChange={this.onChange.bind(this)}
                name="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={this.Search.bind(this)}
              >
                Search
              </button>
            </form>
            <div>
              {this.props.isAuthUser && (
                <button
                  type="button"
                  className="btn btn-info mx-2"
                  onClick={() => history.push("/AddProduct")}
                >
                  {"Add new Item"}
                </button>
              )}
            </div>
          </div>
        </nav>

        <div className="d-flex flex-wrap mt-1 single-product">
          {showProducts.map((product) => (
            <Product
              key={product._id}
              {...product}
              id={product._id}
              addProd={this.handleAddProduct}
              isAuthUser={this.props.isAuthUser}
            />
          ))}
        </div>
        <Pagination
          itemsPerPage={this.state.itemsPerPage}
          totalItems={this.state.products.length}
          currentPage={this.state.currentPage}
          paginate={this.paginate}
        />
      </>
    );
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cart: cart,
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCartAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionsToProps)(Products);
