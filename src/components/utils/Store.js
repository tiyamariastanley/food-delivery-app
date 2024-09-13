import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import { restaurantListApi } from "./services/restaurant";
import { setupListeners } from "@reduxjs/toolkit/query";

const Store = configureStore({
  reducer: {
    [restaurantListApi.reducerPath]: restaurantListApi.reducer,
    cart: CartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantListApi.middleware),
});

setupListeners(Store.dispatch);

export default Store;
