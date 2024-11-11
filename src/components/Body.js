import React, { useEffect, useRef, useState } from "react";
import { Card, OfferCard } from "./Card";
import { isEmpty } from "lodash";
import { Shimmer } from "./Shimmer";
import { useGetRestaurantListQuery } from "./utils/services/restaurant";
import { useNavigate } from "react-router-dom";

export const Body = () => {
  const [resData, setResData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const observerTarget = useRef(null);
  const OfferCardComponent = OfferCard(Card);
  const { data, error, isLoading } = useGetRestaurantListQuery();
  const navigate = useNavigate();

  // cannot do auto fetch as swiggy update API is protected and cannot be accessed.

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         //fetchMoreData();
  //       }
  //     },
  //     { threshold: 1 }
  //   );

  //   if (observerTarget.current) {
  //     observer.observe(observerTarget.current);
  //   }

  //   return () => {
  //     if (observerTarget.current) {
  //       observer.unobserve(observerTarget.current);
  //     }
  //   };
  // }, [observerTarget]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const res = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9698196&lng=77.7499721&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const data = await res.json();
  //   setResData(
  //     data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants
  //   );
  //   setFilteredData(
  //     data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants
  //   );

  //   console.log(
  //     data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants
  //   );
  // };

  useEffect(() => {
    if (data) {
      setResData(
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          .restaurants
      );
      setFilteredData(
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          .restaurants
      );
    }
  }, [data]);

  // const fetchMoreData = async () => {
  //   const res = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/update",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         lat: 12.9698196,
  //         lng: 77.7499721,
  //         nextOffset: "CJhlELQ4KIDgj/aX2cLgMDCnEw==",
  //         widgetOffset: {
  //           NewListingView_category_bar_chicletranking_TwoRows: "",
  //           NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
  //           Restaurant_Group_WebView_SEO_PB_Theme: "",
  //           collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "159",
  //           inlineFacetFilter: "",
  //           restaurantCountWidget: "",
  //         },
  //         filters: {},
  //         seoParams: {
  //           seoUrl: "https://www.swiggy.com/",
  //           pageType: "FOOD_HOMEPAGE",
  //           apiName: "FoodHomePage",
  //         },
  //         page_type: "DESKTOP_WEB_LISTING",
  //         _csrf: "VQdvrE0EavkX-tNt7LPaYkg-0e3rYz7zuUki-TLc",
  //       }),
  //     }
  //   );
  //   const newData = await res.json();
  //   setData([
  //     ...data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //       .restaurants,
  //     ...newData.data?.cards[0].card?.card?.gridElements?.infoWithStyle
  //       .restaurants,
  //     ,
  //   ]);
  //   setFilteredData(
  //     ...filteredData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //       .restaurants,
  //     ...newData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
  //       .restaurants
  //   );
  // };

  const showTopRated = () => {
    const topRated = resData.filter((item) => item.info.avgRatingString >= 4);
    setFilteredData(topRated);
  };

  const searchHandler = (searchValue) => {
    if (searchValue) {
      const filtered = resData.filter((item) => {
        return item.info.name.toLowerCase().includes(searchValue);
      });
      console.log(filtered, searchValue);

      setFilteredData(filtered);
    } else {
      setFilteredData(resData);
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-16">
        <button
          className="font-bold bg-green-300 px-2 rounded-lg"
          onClick={showTopRated}
        >
          Top Rated
        </button>

        <div className="flex gap-4 mx-auto bg-gray-200 p-2 rounded-lg">
          <input
            onChange={(e) => searchHandler(e.target.value)}
            className="border bg-gray-200 focus:outline-none focus:border-transparent"
            placeholder="Search..."
          ></input>
          <span>🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-5">
        {!isLoading ? (
          filteredData.map((item) => (
            <div
              className="w-60 transform transition ease-in hover:scale-90"
              onClick={() => navigate(`/restaurant/${item.info.id}`)}
              data-testid="res-list-card"
              key={item.info.id}
            >
              {!isEmpty(item.info.aggregatedDiscountInfoV3) ? (
                <OfferCardComponent key={item.info.id} data={item.info} />
              ) : (
                <Card key={item.info.id} data={item.info} />
              )}
            </div>
          ))
        ) : (
          <>
            <Shimmer></Shimmer>
            <Shimmer></Shimmer>
            <Shimmer></Shimmer>
            <Shimmer></Shimmer>
            <Shimmer></Shimmer>
            <Shimmer></Shimmer>
            <Shimmer></Shimmer>
            <Shimmer></Shimmer>
          </>
        )}
      </div>
      {/* <div ref={observerTarget}></div> */}
    </div>
  );
};
