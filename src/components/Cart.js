import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "./MenuItem";
import { clearCart } from "./utils/CartSlice";
import { isEmpty } from "lodash";

export const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);

  return (
    <div className="w-1/2 h-full m-auto text-center mt-10">
      <h1 className="font-extrabold text-black text-2xl">
        {!isEmpty(cartItems) ? "Cart" : "Empty Cart"}
      </h1>
      {!isEmpty(cartItems) && (
        <>
          <button
            className="bg-green-400 p-2 rounded-lg mt-5"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear Cart
          </button>
          <div className="bg-white mt-20 p-5">
            {cartItems.map((item) => (
              <MenuItem
                key={item.card.info.id}
                item={item}
                type="remove"
              ></MenuItem>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
