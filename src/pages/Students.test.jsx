
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Students from "./Students";

describe("Students Page Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("displays all students", () => {
    render(<Students />);

    expect(screen.getByText("Pavithran")).toBeInTheDocument();
    expect(screen.getByText("Arun")).toBeInTheDocument();
    expect(screen.getByText("Rahul")).toBeInTheDocument();
  });

  test("filters students by search term", () => {
    render(<Students />);

    const searchInput = screen.getByPlaceholderText("Search student...");

    fireEvent.change(searchInput, {
      target: { value: "Arun" },
    });

    expect(screen.getByText("Arun")).toBeInTheDocument();
    expect(screen.queryByText("Pavithran")).not.toBeInTheDocument();
    expect(screen.queryByText("Rahul")).not.toBeInTheDocument();
  });

  test("shows no students found for an unmatched search", () => {
    render(<Students />);

    fireEvent.change(screen.getByPlaceholderText("Search student..."), {
      target: { value: "UnknownStudent" },
    });

    expect(screen.getByText("No students found.")).toBeInTheDocument();
  });
});
