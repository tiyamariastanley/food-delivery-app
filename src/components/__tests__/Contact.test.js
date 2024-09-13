import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../Contact";

describe("Contact page load test", () => {
  test("Contact Page loaded or not", () => {
    render(<Contact />);
    const heading = screen.getByText(/Contact/);
    expect(heading).toBeInTheDocument();
  });

  //both test() and it() are same

  it("Checks for 2 input box", () => {
    render(<Contact />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
  });
});
