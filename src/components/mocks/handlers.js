import { http, HttpResponse } from "msw";
import MOCK_RES_DATA from "./RestaurantListData.json";
import MOCK_RES_DETAILS_DATA from "./RestaurantDetailsData.json";

export const handlers = [
  // Mock the restaurant list API
  http.get("https://www.swiggy.com/dapi/restaurants/list/v5", ({ request }) => {
    console.log("first request", request);
    return HttpResponse.json(MOCK_RES_DATA);
  }),
  http.get("https://www.swiggy.com/dapi/menu/pl", ({ request }) => {
    console.log("hello");

    const url = new URL(request.url);
    const restaurantId = url.searchParams.get("restaurantId");

    console.log("Second request with restaurantId:", restaurantId);

    if (restaurantId === "377396") {
      console.log("inside");

      return HttpResponse.json(MOCK_RES_DETAILS_DATA); // Ensure this data matches your expectations
    } else {
      return HttpResponse.status(404);
    }
  }),
  // Add more handlers for other API calls if necessary
];
