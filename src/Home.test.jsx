
import { render, screen, within } from "@testing-library/react";
import Home from "./pages/Home";

beforeEach(() => {
  localStorage.clear();

  localStorage.setItem(
    "students",
    JSON.stringify([
      {
        id: 1,
        name: "Pavithran",
        age: 22,
        course: "Computer Science",
      },
      {
        id: 2,
        name: "Arun",
        age: 21,
        course: "Information Technology",
      },
      {
        id: 3,
        name: "Rahul",
        age: 22,
        course: "Computer Science",
      },
    ])
  );
});

describe("Home Dashboard Tests", () => {
  test("displays the dashboard heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Student Dashboard" })
    ).toBeInTheDocument();
  });

  test("displays the correct total students count", () => {
    render(<Home />);

    const studentCard = screen
      .getByText("Total Students")
      .closest(".stat-card");

    expect(within(studentCard).getByRole("heading", { name: "3" }))
      .toBeInTheDocument();
  });

  test("displays the correct total courses count", () => {
    render(<Home />);

    const courseCard = screen
      .getByText("Total Courses")
      .closest(".stat-card");

    expect(within(courseCard).getByRole("heading", { name: "2" }))
      .toBeInTheDocument();
  });

  test("displays course-wise student counts", () => {
    render(<Home />);

    expect(screen.getByText("Course-wise Students"))
      .toBeInTheDocument();

    expect(screen.getByText("Computer Science"))
      .toBeInTheDocument();

    expect(screen.getByText("2 students"))
      .toBeInTheDocument();

    expect(screen.getByText("Information Technology"))
      .toBeInTheDocument();

    expect(screen.getByText("1 students"))
      .toBeInTheDocument();
  });
});
