import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Employees from "./Students";

const employeeFixtures = [
  { id: 1, name: "Arun", age: 21, position: "Designer" },
  { id: 2, name: "Rahul", age: 22, position: "Developer" },
];

function renderEmployees(view = "cards") {
  return render(
    <MemoryRouter>
      <Employees view={view} />
    </MemoryRouter>
  );
}

describe("Employee pages", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("students", JSON.stringify(employeeFixtures));
  });

  test("displays employee cards and does not show the old greeting", () => {
    renderEmployees();

    expect(screen.getByRole("heading", { name: "Employee Cards" })).toBeInTheDocument();
    expect(screen.getByText("Arun")).toBeInTheDocument();
    expect(screen.getByText("Rahul")).toBeInTheDocument();
    expect(screen.queryByText("Welcome, Pavithran!")).not.toBeInTheDocument();
  });

  test("filters employee cards by name", () => {
    renderEmployees();
    fireEvent.change(screen.getByPlaceholderText("Search by employee name..."), {
      target: { value: "Arun" },
    });

    expect(screen.getByText("Arun")).toBeInTheDocument();
    expect(screen.queryByText("Rahul")).not.toBeInTheDocument();
  });

  test("shows an empty state when search has no matches", () => {
    renderEmployees();
    fireEvent.change(screen.getByPlaceholderText("Search by employee name..."), {
      target: { value: "Unknown Employee" },
    });

    expect(screen.getByText("No employees found. Add an employee to get started.")).toBeInTheDocument();
  });

  test("adds an employee from the employee form and clears the fields", () => {
    renderEmployees("form");

    fireEvent.change(screen.getByLabelText("Employee ID:"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Maya" } });
    fireEvent.change(screen.getByLabelText("Age:"), { target: { value: "25" } });
    fireEvent.change(screen.getByLabelText("Position:"), { target: { value: "Analyst" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Employee" }));

    expect(JSON.parse(localStorage.getItem("students"))).toContainEqual({
      id: 3,
      name: "Maya",
      age: 25,
      position: "Analyst",
    });
    expect(screen.getByLabelText("Employee ID:")).toHaveValue(null);
    expect(screen.getByText("Employee added successfully!")).toBeInTheDocument();
  });
});
