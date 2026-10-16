import { fireEvent, render, screen } from "@testing-library/react";
import StudentForm from "./StudentForm";

describe("Employee form", () => {
  test("displays the Add Employee form", () => {
    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={null}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    expect(screen.getByRole("heading", { name: "Add Employee" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Employee" })).toBeInTheDocument();
    expect(screen.getByLabelText("Position:")).toBeInTheDocument();
  });

  test("shows validation errors when required fields are empty", () => {
    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={null}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Add Employee" }));

    expect(screen.getByText("Enter a valid Employee ID")).toBeInTheDocument();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Age is required")).toBeInTheDocument();
    expect(screen.getByText("Position is required")).toBeInTheDocument();
  });

  test("submits valid employee details", () => {
    const onAddEmployee = jest.fn();
    render(
      <StudentForm
        onAddStudent={onAddEmployee}
        editingStudent={null}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Employee ID:"), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Kumar" } });
    fireEvent.change(screen.getByLabelText("Age:"), { target: { value: "23" } });
    fireEvent.change(screen.getByLabelText("Position:"), { target: { value: "Analyst" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Employee" }));

    expect(onAddEmployee).toHaveBeenCalledWith({
      id: 4,
      name: "Kumar",
      age: 23,
      position: "Analyst",
    });
  });

  test("loads saved employee details when editing, including older course data", () => {
    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={{ id: 2, name: "Arun", age: 21, course: "Information Technology" }}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    expect(screen.getByRole("heading", { name: "Edit Employee" })).toBeInTheDocument();
    expect(screen.getByLabelText("Employee ID:")).toHaveValue(2);
    expect(screen.getByLabelText("Name:")).toHaveValue("Arun");
    expect(screen.getByLabelText("Age:")).toHaveValue(21);
    expect(screen.getByLabelText("Position:")).toHaveValue("Information Technology");
  });

  test("submits an updated employee with the Position field", () => {
    const onUpdateEmployee = jest.fn();
    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={{ id: 2, name: "Arun", age: 21, position: "Designer" }}
        onUpdateStudent={onUpdateEmployee}
        onCancelEdit={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Arun Kumar" } });
    fireEvent.click(screen.getByRole("button", { name: "Update Employee" }));

    expect(onUpdateEmployee).toHaveBeenCalledWith({
      id: 2,
      name: "Arun Kumar",
      age: 21,
      position: "Designer",
    });
  });
});
