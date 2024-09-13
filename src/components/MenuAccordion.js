import React, { useState } from "react";
import { MenuItem } from "./MenuItem";

export const MenuAccordion = ({ menuCategory, expand, handleExpand }) => {
  return (
    <div className="cursor-pointer bg-white mb-5 shadow-custom-light p-5">
      {menuCategory.title && (
        <div
          className="flex justify-between w-full font-extrabold text-lg"
          onClick={handleExpand}
        >
          <p>
            {menuCategory.title} ({menuCategory?.itemCards?.length})
          </p>
          <span>{"↓"}</span>
        </div>
      )}
      {expand &&
        menuCategory?.itemCards?.map((item) => (
          <MenuItem key={item.card.info.id} item={item}></MenuItem>
        ))}
    </div>
  );
};
