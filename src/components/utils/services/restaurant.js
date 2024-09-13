import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const restaurantListApi = createApi({
  reducerPath: "restaurantListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.swiggy.com/dapi/" }),
  endpoints: (builder) => ({
    getRestaurantList: builder.query({
      query: () =>
        "restaurants/list/v5?lat=12.9698196&lng=77.7499721&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    }),
    getRestaurantById: builder.query({
      query: (restaurantId) =>
        `menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9698196&lng=77.7499721&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`,
    }),
  }),
});

export const { useGetRestaurantListQuery, useGetRestaurantByIdQuery } =
  restaurantListApi;
