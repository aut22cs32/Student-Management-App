
import { render, screen, fireEvent } from "@testing-library/react";
import StudentCard from "./StudentCard";

describe("StudentCard Tests", () => {
  const mockStudent = {
    id: 1,
    name: "Pavithran",
    age: 22,
    course: "Computer Science",
  };

  test("displays student details", () => {
    render(
      <StudentCard
        {...mockStudent}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Pavithran")).toBeInTheDocument();
    expect(screen.getByText("22")).toBeInTheDocument();
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("1", { exact: false })).toBeInTheDocument();
  });

  test("calls onEdit when Edit button is clicked", () => {
    const onEdit = jest.fn();

    render(
      <StudentCard
        {...mockStudent}
        onEdit={onEdit}
        onDelete={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(onEdit).toHaveBeenCalledWith(1);
  });

  test("calls onDelete when Delete button is clicked", () => {
    const onDelete = jest.fn();

    render(
      <StudentCard
        {...mockStudent}
        onEdit={() => {}}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
