import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../Header";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Store from "../../components/utils/Store";
import { BrowserRouter } from "react-router-dom";

it("Checks if Header loaded properly", () => {
  // Need to wrap with provider and store as its an isolated testing.
  // It will throw error for libraries and frameworks used in the components.

  render(
    //to make useNavigate() work, we need to wrap the component with a router
    <BrowserRouter>
      <Provider store={Store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const login = screen.getByRole("button", { name: "Login" });
  expect(login).toBeInTheDocument();
});

it("Checks if cart item is 0", () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const cartItems = screen.getByText(/(0)/);
  expect(cartItems).toBeInTheDocument();
});

it("Checks if Login button changes to logout onClick", () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const login = screen.getByRole("button", { name: "Login" });
  fireEvent.click(login);
  const logout = screen.getByRole("button", { name: "Logout" });
  expect(logout).toBeInTheDocument();
});
