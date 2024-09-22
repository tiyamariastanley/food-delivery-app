import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { Header } from "../Header";
import { RestaurantDetails } from "../RestaurantDetails";
import Store from "../utils/Store";
import { act } from "react";
import MOCK_RES_DETAILS_DATA from "../mocks/RestaurantDetailsData.json";

it("Checks the cart functionality", async () => {
  // This test is not working - dont know that to do. Some issue with API mock :(

  const restaurantId = "377396";
  await act(async () =>
    render(
      <Provider store={Store}>
        {/* <Header /> */}
        <MemoryRouter initialEntries={[`/restaurant/${restaurantId}`]}>
          <Routes>
            <Route path="/restaurant/:resId" element={<RestaurantDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  );

  await waitFor(() => {
    const recommendedAcc = screen.getByText(/Recommended/);

    fireEvent.click(recommendedAcc);
    expect(screen.getByText(/Hunan Paneer Dry/).toBeInTheDocument());
  });
});
