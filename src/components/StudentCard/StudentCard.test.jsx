import { fireEvent, render, screen } from "@testing-library/react";
import StudentCard from "./StudentCard";

describe("Employee card", () => {
  const employee = {
    id: 1,
    name: "Maya",
    age: 25,
    position: "Analyst",
  };

  test("displays employee details", () => {
    render(<StudentCard {...employee} onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByText("Maya")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Analyst")).toBeInTheDocument();
    expect(screen.getByText("Employee ID:")).toBeInTheDocument();
  });

  test("calls onEdit with the employee ID", () => {
    const onEdit = jest.fn();
    render(<StudentCard {...employee} onEdit={onEdit} onDelete={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(onEdit).toHaveBeenCalledWith(1);
  });

  test("calls onDelete with the employee ID", () => {
    const onDelete = jest.fn();
    render(<StudentCard {...employee} onEdit={() => {}} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test("displays an older course value as the employee position", () => {
    render(
      <StudentCard
        id={2}
        name="Arun"
        age={21}
        course="Information Technology"
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Information Technology")).toBeInTheDocument();
  });
});
