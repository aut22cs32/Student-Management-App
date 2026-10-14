
import { useEffect, useState } from "react";
import "./StudentForm.css";

export default function StudentForm({
  editingStudent,
  onAddStudent,
  onUpdateStudent,
  onCancelEdit,
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(editingStudent);

  // Edit mode-la existing details fill pannum
  useEffect(() => {
    if (editingStudent) {
      setId(String(editingStudent.id ?? ""));
      setName(editingStudent.name ?? "");
      setAge(String(editingStudent.age ?? ""));
      setCourse(editingStudent.course ?? "");
    } else {
      setId("");
      setName("");
      setAge("");
      setCourse("");
    }

    setErrors({});
  }, [editingStudent]);

  // Form validation
  function validateForm() {
    const newErrors = {};

    if (id.trim() === "" || Number(id) <= 0) {
      newErrors.id = "Enter a valid Student ID";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (age.trim() === "" || Number(age) <= 0) {
      newErrors.age = "Age is required";
    }

    if (!course.trim()) {
      newErrors.course = "Course is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // Add / Update student
  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const studentData = {
      id: Number(id),
      name: name.trim(),
      age: Number(age),
      course: course.trim(),
    };

    if (isEditing) {
      onUpdateStudent(studentData);
    } else {
      onAddStudent(studentData);
    }
  }

  return (
    <div className="student-form">
      <h2>{isEditing ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="student-id">Id:</label>
          <input
            id="student-id"
            type="number"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          {errors.id && (
            <p className="error-message">{errors.id}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="student-name">Name:</label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="student-age">Age:</label>
          <input
            id="student-age"
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
          {errors.age && (
            <p className="error">{errors.age}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="student-course">Course:</label>
          <input
            id="student-course"
            type="text"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          />
          {errors.course && (
            <p className="error">{errors.course}</p>
          )}
        </div>

        <button type="submit">
          {isEditing ? "Update Student" : "Add Student"}
        </button>

        {isEditing && (
          <button type="button" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}
