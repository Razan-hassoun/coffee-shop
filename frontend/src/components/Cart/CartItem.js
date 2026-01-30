import React from "react";

const CartItem = ({ id, name, description, img,category, price, units, addProd }) => {
  return (
    <div className="row cart-detail">
      <div className="col-lg-3 col-sm-3 col-3 p-1">
        <img className="img-thumbnail" src={img} alt={name} />
      </div>
      <div className="col-lg-9 col-sm-9 col-9 cart-detail-product d-flex justify-content-between">
        <div className="d-flex flex-column">
          <p>{name}</p>
          <span className="count">Price : ${price}</span>
          <span className="price text-info"> Quantity:{units}</span>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary mx-1"
            onClick={() =>
              addProd({ id, name, description, img,category, price, units: 1 })
            }
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-warning mx-1"
            onClick={() =>
              addProd({ id, name, description, img, category,price, units: -1 })
            }
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
