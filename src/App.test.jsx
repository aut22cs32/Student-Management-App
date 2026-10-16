import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App navigation", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, "", "/home");
  });

  test("shows only Home and About in the navigation bar", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });

    expect(within(navigation).getAllByRole("link")).toHaveLength(2);
    expect(within(navigation).getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(within(navigation).getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Employees" })).not.toBeInTheDocument();
  });

  test("opens the employee form from the home action", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("link", { name: /Add Employee Form/ }));

    expect(screen.getByLabelText("Employee ID:")).toBeInTheDocument();
    expect(screen.getByLabelText("Position:")).toBeInTheDocument();
    expect(screen.queryByText("Welcome, Pavithran!")).not.toBeInTheDocument();
  });

  test("opens employee cards from the home action", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("link", { name: /Employee Cards/ }));

    expect(screen.getByRole("heading", { name: "Employee Cards" })).toBeInTheDocument();
  });

  test("opens the About page from the navigation bar", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });

    fireEvent.click(within(navigation).getByRole("link", { name: "About" }));

    expect(screen.getByRole("heading", { name: "About this app" })).toBeInTheDocument();
  });
});
