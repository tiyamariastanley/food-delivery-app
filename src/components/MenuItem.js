import React from "react";
import { FOOD_IMG } from "./utils/Constants";
import { useDispatch } from "react-redux";
import { addItem } from "./utils/CartSlice";

export const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  const addToCarthandler = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div className="flex flex-row justify-between gap-x-10 border-b-2 last:border-b-0 py-5">
      <div className="flex flex-col w-9/12 text-left">
        <span className="font-bold text-gray-700">{item.card.info.name}</span>
        <span className="font-bold text-gray-700">
          ₹{item.card.info.price / 100}
        </span>
        <p className="text-gray-500 text-sm">{item.card.info.description}</p>
      </div>
      <div className="w-3/12 w-auto mb-5">
        <div className="absolute z-10 mt-24 ml-2">
          <button
            onClick={() => addToCarthandler(item)}
            className="border border-gray-300 rounded-lg p-2 w-24 text-green-600 font-bold bg-white hover:bg-gray-300"
          >
            Add
          </button>
        </div>
        <img
          src={FOOD_IMG + "/" + item.card.info.imageId}
          className="size-28"
        ></img>
      </div>
    </div>
  );
};
