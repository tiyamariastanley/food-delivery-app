import React, { useContext } from "react";
import { IMG_URL } from "./utils/Constants";
import { useNavigate } from "react-router-dom";

export const Card = ({ item }) => {
  const data = item.info;
  const navigate = useNavigate();

  return (
    <div
      className="w-60 transform transition ease-in hover:scale-90"
      onClick={() => navigate(`/restaurant/${data.id}`)}
    >
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
    const data = props.item.info;
    const offer = Object.values(data.aggregatedDiscountInfoV3).map(
      (value) => value
    );

    return (
      <div className="w-60">
        <p className="absolute text-white font-bold z-10 ml-5 mb-5 truncate">
          {offer.join(" ")}
        </p>
        <Card {...props}></Card>
      </div>
    );
  };
};
