import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_URL } from "./utils/Constants";
import { isEmpty } from "lodash";
import { Shimmer } from "./Shimmer";
import { useRestaurantMenu } from "./utils/useRestaurantMenu";
import { MenuAccordion } from "./MenuAccordion";
import { useGetRestaurantByIdQuery } from "./utils/services/restaurant";

export const RestaurantDetails = () => {
  const params = useParams();
  const restaurantId = params.resId;
  //const resData = useRestaurantMenu(restaurantId);
  console.log("restaurantId", restaurantId);

  const {
    data: resData,
    error,
    isLoading,
  } = useGetRestaurantByIdQuery(restaurantId, {
    skip: !restaurantId,
  });

  const [expandIndex, setExpandIndex] = useState(0);

  if (isLoading) {
    return <Shimmer />;
  }

  console.log("resData", resData);

  const { name, avgRating, costForTwoMessage, cuisines } =
    resData?.data?.cards[2].card.card.info;

  // resData?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
  //   .itemCards;

  const menuList =
    resData?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards;
  console.log("menuList", menuList);

  return (
    <div className="mt-4 text-center">
      <div className="mb-10">
        <h1 className="font-extrabold text-2xl">{name}</h1>
        <h3 className="font-bold text-gray-500">
          {avgRating} stars - {costForTwoMessage}
        </h3>
        <h3 className="font-bold text-orange-500 underline">
          {" "}
          {cuisines.join(", ")}
        </h3>
      </div>
      <hr></hr>
      <div className="mt-5 w-6/12 m-auto">
        {!isEmpty(menuList) &&
          menuList.map(
            (item, index) =>
              index !== 0 &&
              item.card.card.title && (
                <MenuAccordion
                  key={item.card.card.title}
                  menuCategory={item.card.card}
                  expand={index === expandIndex}
                  handleExpand={() =>
                    setExpandIndex(expandIndex === index ? null : index)
                  }
                ></MenuAccordion>
              )
          )}
      </div>
    </div>
  );
};
