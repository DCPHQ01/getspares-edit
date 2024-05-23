import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import Home from "./../src/app/page";
import { store } from "../src/redux";

it("should render the TopBar component without crashing", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByTestId("topBar")).toBeInTheDocument();
});
