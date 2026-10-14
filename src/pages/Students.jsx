
import { useState, useEffect } from "react";
import "../App.css";

import Header from "../components/Header/Header";
import StudentCard from "../components/StudentCard/StudentCard";
import StudentForm from "../components/StudentForm/StudentForm";

import useLocalStorage from "../hooks/useLocalStorage";
import userContext from "../context/userContext";

function Students() {
  const username = "Pavithran";

  const [students, setStudents] = useLocalStorage("students", [
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");

  function handleAddStudent(student) {
  const idExists = students.some(
    (existingStudent) =>
      existingStudent.id === student.id
  );

  if (idExists) {
    setMessage("This ID already exists!");
    return;
  }

  setStudents((prevStudents) => [
    ...prevStudents,
    student,
  ]);

  setMessage("Student added successfully!");
}

  function handleDeleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );

    setMessage("Student deleted successfully!");
  }

  function handleUpdateStudent(updatedStudent) {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    );

    setEditingStudent(null);
    setMessage("Student updated successfully!");
  }

  function handleEditStudent(id) {
    const student = students.find(
      (student) => student.id === id
    );
    if (student) {
      setEditingStudent(student);
    }
  }

function handleCancelEdit() {
  setEditingStudent(null);
}

  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );


  useEffect(() => {
    if (message === "") return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <userContext.Provider value={username}>
      <div>
        <Header />

        {message && (
          <p className="success-message">{message}</p>
        )}

        <div className="app-container">
          <div className="form-section">
            <StudentForm
              onAddStudent={handleAddStudent}
              editingStudent={editingStudent}
              onUpdateStudent={handleUpdateStudent}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div className="students-section">
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            {filteredStudents.length > 0 ? (
              <div className="student-list">
                {filteredStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    age={student.age}
                    course={student.course}
                    onDelete={handleDeleteStudent}
                    onEdit={handleEditStudent}
                  />
                ))}
              </div>
            ) : (
              <p>No students found.</p>
            )}
          </div>
        </div>
      </div>
    </userContext.Provider>
  );
}

export default Students;