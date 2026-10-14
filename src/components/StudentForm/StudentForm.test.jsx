
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StudentForm from "./StudentForm";

describe("StudentForm Tests", () => {
  test("displays the Add Student form", () => {
    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={null}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    expect(
      screen.getByRole("heading", { name: "Add Student" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Add Student" })
    ).toBeInTheDocument();
  });

  test("shows validation errors when the form is empty", () => {
    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={null}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Student" })
    );

    expect(
      screen.getByText("Enter a valid Student ID")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Name is required")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Age is required")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Course is required")
    ).toBeInTheDocument();
  });

  test("calls onAddStudent with valid student details", () => {
    const onAddStudent = jest.fn();

    render(
      <StudentForm
        onAddStudent={onAddStudent}
        editingStudent={null}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Id/i), {
      target: { value: "4" },
    });

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Kumar" },
    });

    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { value: "23" },
    });

    fireEvent.change(screen.getByLabelText(/Course/i), {
      target: { value: "React JS" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Add Student" })
    );

    expect(onAddStudent).toHaveBeenCalledWith({
      id: 4,
      name: "Kumar",
      age: 23,
      course: "React JS",
    });
  });

  test("displays existing student details in edit mode", () => {
    const student = {
      id: 2,
      name: "Arun",
      age: 21,
      course: "Information Technology",
    };

    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={student}
        onUpdateStudent={jest.fn()}
        onCancelEdit={jest.fn()}
      />
    );

    expect(
      screen.getByRole("heading", { name: "Edit Student" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Id/i)).toHaveValue(2);
    expect(screen.getByLabelText(/Name/i)).toHaveValue("Arun");
    expect(screen.getByLabelText(/Age/i)).toHaveValue(21);

    expect(screen.getByLabelText(/Course/i)).toHaveValue(
      "Information Technology"
    );
  });

  test("calls onUpdateStudent with updated details", () => {
    const onUpdateStudent = jest.fn();

    const student = {
      id: 2,
      name: "Arun",
      age: 21,
      course: "Information Technology",
    };

    render(
      <StudentForm
        onAddStudent={jest.fn()}
        editingStudent={student}
        onUpdateStudent={onUpdateStudent}
        onCancelEdit={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Arun Kumar" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Update Student" })
    );

    expect(onUpdateStudent).toHaveBeenCalledWith({
      id: 2,
      name: "Arun Kumar",
      age: 21,
      course: "Information Technology",
    });
  });
});
