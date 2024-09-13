import React, { useEffect, useRef, useState } from "react";
import { sampleData } from "./utils/Data";
import { Card, OfferCard } from "./Card";
import { isEmpty } from "lodash";
import { Shimmer } from "./Shimmer";
import { useGetRestaurantListQuery } from "./utils/services/restaurant";

export const Body = () => {
  //const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const observerTarget = useRef(null);
  const OfferCardComponent = OfferCard(Card);
  const { data, error, isLoading } = useGetRestaurantListQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          //fetchMoreData();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const res = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9698196&lng=77.7499721&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const data = await res.json();
  //   setData(
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
      setFilteredData(
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          .restaurants
      );
    }
  }, [data]);

  const fetchMoreData = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/update",
      {
        method: "POST",
        body: JSON.stringify({
          lat: 12.9698196,
          lng: 77.7499721,
          nextOffset: "CJhlELQ4KIDgj/aX2cLgMDCnEw==",
          widgetOffset: {
            NewListingView_category_bar_chicletranking_TwoRows: "",
            NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
            Restaurant_Group_WebView_SEO_PB_Theme: "",
            collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "159",
            inlineFacetFilter: "",
            restaurantCountWidget: "",
          },
          filters: {},
          seoParams: {
            seoUrl: "https://www.swiggy.com/",
            pageType: "FOOD_HOMEPAGE",
            apiName: "FoodHomePage",
          },
          page_type: "DESKTOP_WEB_LISTING",
          _csrf: "VQdvrE0EavkX-tNt7LPaYkg-0e3rYz7zuUki-TLc",
        }),
      }
    );
    const newData = await res.json();
    setData([
      ...data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        .restaurants,
      ...newData.data?.cards[0].card?.card?.gridElements?.infoWithStyle
        .restaurants,
      ,
    ]);
    setFilteredData(
      ...filteredData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        .restaurants,
      ...newData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
        .restaurants
    );
  };

  const showTopRated = () => {
    const topRated = sampleData.filter(
      (item) => item.info.avgRatingString >= 4
    );
    setData(topRated);
  };

  const searchHandler = () => {
    if (searchValue) {
      const filtered = data.filter((item) => {
        console.log(item.info.name);
        return item.info.name.toLowerCase().includes(searchValue);
      });
      console.log(filtered, searchValue);

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-16">
        <button
          className="font-bold bg-green-300 px-2 py-1 rounded-lg"
          onClick={showTopRated}
        >
          Top Rated
        </button>

        <div className="flex gap-4 mx-auto bg-gray-200 p-2 rounded-lg">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className="border bg-gray-200"
            placeholder="Search..."
          ></input>
          {"  "}
          <button
            onClick={searchHandler}
            className="bg-blue-800 py-1 px-2 text-white rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
        {!isLoading ? (
          filteredData.map((item) =>
            !isEmpty(item.info.aggregatedDiscountInfoV3) ? (
              <OfferCardComponent key={item.info.id} item={item} />
            ) : (
              <Card key={item.info.id} item={item} />
            )
          )
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
      <div ref={observerTarget}></div>
    </div>
  );
};
