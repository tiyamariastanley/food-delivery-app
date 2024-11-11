import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { Header } from "../Header";
import { RestaurantDetails } from "../RestaurantDetails";
import Store from "../utils/Store";
import { act } from "react";
import { Cart } from "../Cart";

it("Checks if resturant details loads properly", async () => {
  const restaurantId = "377396";
  await act(async () =>
    render(
      <Provider store={Store}>
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
    expect(screen.getByText(/Hunan Paneer Dry/)).toBeInTheDocument();
  });
});

it("Checks add to cart functionality", async () => {
  const restaurantId = "377396";
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  await act(async () =>
    render(
      <Provider store={Store}>
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
    const addButtons = screen.getAllByRole("button", { name: "Add" });
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
  });

  await waitFor(() => {
    expect(screen.getByText(/Cart\(2\)/)).toBeInTheDocument();
  });
});

it("Checks remove from cart functionality", async () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  await act(async () =>
    render(
      <Provider store={Store}>
        <Cart />
      </Provider>
    )
  );

  await waitFor(() => {
    expect(screen.getByText(/Cart\(2\)/)).toBeInTheDocument();
    expect(screen.getByText(/Combo for 1 Non-Veg/)).toBeInTheDocument();
  });

  const removeButton = screen.getAllByRole("button", { name: "Remove" });
  fireEvent.click(removeButton[0]);

  await waitFor(() => {
    // you should use queryByText instead of getByText as it is no longer in the document
    expect(screen.queryByText(/Combo for 1 Non-Veg/)).not.toBeInTheDocument();
    expect(screen.getByText(/Cart\(1\)/)).toBeInTheDocument();
  });
});

it("Checks clear cart functionality", async () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  await act(async () =>
    render(
      <Provider store={Store}>
        <Cart />
      </Provider>
    )
  );

  await waitFor(() => {
    const clearButton = screen.getByText(/Clear Cart/);
    fireEvent.click(clearButton);
  });
  await waitFor(() => {
    expect(screen.getByText(/Cart\(0\)/)).toBeInTheDocument();
    expect(screen.getByText(/Empty Cart/)).toBeInTheDocument();
  });
});
