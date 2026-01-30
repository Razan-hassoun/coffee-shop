import React from "react";
import history from "../../history";
import axios from "axios";

const DeleteProduct = (id) => {
  // console.log("id of delete ",id);
  var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": userAuth.user.token,
    },
  };
  var uri = "/api/items/" + id;
  //Hard Delete
  console.log(uri);
  axios.delete(uri, config).then(
    (res) => {
      console.log(res.data, res.status);
      window.location.reload(true);
    },
    (err) => console.log(err)
  );
 };

const Product = ({
  id,
  name,
  description,
  img,
  category,
  price,
  softDelete,
  addProd,
  isAuthUser,
}) => {
  // console.log("single product auth", isAuthUser);
  // console.log("product id is ", id);
  return (
    <>
    {!softDelete && (
    <div className="card col-xl-3 col-lg-3 col-sm-6 col-6">
      <img
        src={img}
        className="img-thumbnail mx-2 img-fluid item-img"
        alt={name}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <h5 className="card-title">{category}</h5>
        <p className="card-text item-desc">{description}</p>
        <p className="card-text">${price}</p>
        <div>
          <button
            type="button"
            className="btn btn-success mx-2"
            onClick={() =>
              addProd({ id, name, description, img, category, price, units: 1 })
            }
          >
            Add to Cart
          </button>
          {isAuthUser && (
            <>
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={() => DeleteProduct(id)}
              >
                {"(Hard)Delete"}
              </button>

              <button
                type="button"
                className="btn btn-info mx-2"
                onClick={() => history.push("/UpdateProduct/?id=" + id)}
              >
                {"Update Item"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Product;
