import { render, screen } from "@testing-library/react";
import { Card, OfferCard } from "../Card";
import "@testing-library/jest-dom";
import { testData } from "../mocks/RestaurantMockData";
import { BrowserRouter } from "react-router-dom";

it("Check restaurant card loaded properly with data", () => {
  //Need to create a mock data to test props
  render(
    <BrowserRouter>
      <Card data={testData} />
    </BrowserRouter>
  );
  const title = screen.getByText(/Chinese Wok/);
  expect(title).toBeInTheDocument();
});

it("Check restaurant card loaded properly with Offer card", () => {
  //Test HOC
  const OfferCardComponent = OfferCard(Card);
  render(
    <BrowserRouter>
      <OfferCardComponent data={testData} />
    </BrowserRouter>
  );
  const title = screen.getByText(/₹169/);
  expect(title).toBeInTheDocument();
});
