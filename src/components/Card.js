import React, { useContext } from "react";
import { IMG_URL } from "./utils/Constants";
import { useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  return (
    <div>
      <img
        src={IMG_URL + "/" + data.cloudinaryImageId}
        className="rounded-2xl w-full h-48 shadow-black"
      ></img>
      <div className="p-2">
        <h3 className="font-bold">{data.name}</h3>
        <h4 className="font-semibold">
          {data.avgRating} stars . {data.sla.slaString}
        </h4>
        <p className="font-semibold text-gray-500 truncate">
          {data.cuisines.join(", ")}
        </p>
      </div>
    </div>
  );
};

export const OfferCard = (Card) => {
  return (props) => {
    const data = props.data;
    const offer = Object.values(data.aggregatedDiscountInfoV3).map(
      (value) => value
    );

    return (
      <div className="w-60">
        <div className="absolute bg-gradient-to-b from-black w-full h-[30%] rounded-t-2xl">
          <p className="text-white font-bold ml-5 mb-5 overflow-hidden">
            {offer.join(" ")}
          </p>
        </div>
        <Card {...props}></Card>
      </div>
    );
  };
};
