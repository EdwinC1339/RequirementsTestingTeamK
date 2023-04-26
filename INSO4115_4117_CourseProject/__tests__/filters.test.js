import React from "react";
import renderer from "react-test-renderer";
import Filters from "../src/components/Filters.jsx";

import { render } from "@testing-library/react";
import Filters from "./Filters";

test("Filters should render a dropdown list of items", () => {
  const { getByRole } = render(<Filters />);
  const dropdownButton = getByRole("button", { name: /Restriction Selection/ });
  expect(dropdownButton).toBeInTheDocument();
});
