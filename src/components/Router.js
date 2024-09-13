import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import About from "./About";
import { Body } from "./Body";
import { Error } from "./Error";
import { RestaurantDetails } from "./RestaurantDetails";
import { Cart } from "./Cart";
import Contact from "./Contact";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About email={"tiya@gmail.com"} />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantDetails />,
      },
    ],
  },
]);
