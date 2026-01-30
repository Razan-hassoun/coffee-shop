export const ADD_TO_CART = "ADD_TO_CART";

export function addToCartAction({ id, name, description, img,category,price, units }) {
  return {
    type: ADD_TO_CART,
    payload: { id, name, description, category,img, price, units }
  };
}