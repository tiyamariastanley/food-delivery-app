import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Body } from "../Body";
import { Provider } from "react-redux";
import Store from "../utils/Store";
import { Card } from "../Card";
import { BrowserRouter } from "react-router-dom";
import { testData } from "../mocks/RestaurantMockData";
import { act } from "react";
import MOCK_RES_LIST_DATA from "../mocks/RestaurantListData.json";

it("Checks if restaurants are listed properly", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={Store}>
          <Body />
        </Provider>
      </BrowserRouter>
    )
  );

  await waitFor(() => {
    const resCards = screen.getAllByTestId("res-list-card");
    expect(resCards.length).toBe(8);
  });
});

it("Checks if search is working properly", async () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Body />
      </Provider>
    </BrowserRouter>
  );

  const search = screen.getByText(/Search/);
  const searchInput = screen.getByPlaceholderText(/Search/);

  fireEvent.change(searchInput, { target: { value: "kfc" } });
  fireEvent.click(search);
  await waitFor(() => {
    const filteredCards = screen.getAllByTestId("res-list-card");
    expect(filteredCards.length).toBe(1);
  });
});

it("Checks if top rated button is working properly", async () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Body />
      </Provider>
    </BrowserRouter>
  );

  const topRated = screen.getByText(/Top Rated/);
  fireEvent.click(topRated);

  await waitFor(() => {
    const filteredCards = screen.getAllByTestId("res-list-card");
    expect(filteredCards.length).toBe(7);
  });
});
