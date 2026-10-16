import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./pages/Home";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    "students",
    JSON.stringify([
      { id: 1, name: "Arun", age: 21, position: "Designer" },
      { id: 2, name: "Rahul", age: 22, position: "Developer" },
      { id: 3, name: "Maya", age: 25, position: "Designer" },
    ])
  );
});

describe("Employee dashboard", () => {
  test("shows the dashboard heading and employee actions", () => {
    renderHome();

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Add Employee Form/ })).toHaveAttribute(
      "href",
      "/employees/add"
    );
    expect(screen.getByRole("link", { name: /Employee Cards/ })).toHaveAttribute(
      "href",
      "/employees/cards"
    );
  });

  test("shows employee and position totals", () => {
    renderHome();

    const totalEmployeesCard = screen.getByText("Total Employees").closest(".stat-card");
    const totalPositionsCard = screen.getByText("Total Positions").closest(".stat-card");

    expect(within(totalEmployeesCard).getByRole("heading", { name: "3" })).toBeInTheDocument();
    expect(within(totalPositionsCard).getByRole("heading", { name: "2" })).toBeInTheDocument();
  });

  test("shows employee counts grouped by position", () => {
    renderHome();

    expect(screen.getByRole("heading", { name: "Employees by Position" })).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
    expect(screen.getByText("2 employees")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("1 employee")).toBeInTheDocument();
  });

  test("supports older saved records that use the course field", () => {
    localStorage.setItem(
      "students",
      JSON.stringify([{ id: 4, name: "Kumar", age: 23, course: "Accountant" }])
    );

    renderHome();

    expect(screen.getByText("Accountant")).toBeInTheDocument();
    expect(screen.getByText("1 employee")).toBeInTheDocument();
  });
});
