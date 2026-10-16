
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
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(editingStudent);

  useEffect(() => {
    if (editingStudent) {
      setId(String(editingStudent.id ?? ""));
      setName(editingStudent.name ?? "");
      setAge(String(editingStudent.age ?? ""));
      setPosition(editingStudent.position ?? editingStudent.course ?? "");
    } else {
      setId("");
      setName("");
      setAge("");
      setPosition("");
    }

    setErrors({});
  }, [editingStudent]);

  function validateForm() {
    const newErrors = {};

    if (id.trim() === "" || Number(id) <= 0) {
      newErrors.id = "Enter a valid Employee ID";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (age.trim() === "" || Number(age) <= 0) {
      newErrors.age = "Age is required";
    }

    if (!position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const employeeData = {
      id: Number(id),
      name: name.trim(),
      age: Number(age),
      position: position.trim(),
    };

    if (isEditing) {
      onUpdateStudent(employeeData);
    } else {
      const added = onAddStudent(employeeData);
      if (added !== false) {
        setId("");
        setName("");
        setAge("");
        setPosition("");
      }
    }
  }

  return (
    <div className="student-form">
      <h2>{isEditing ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="employee-id">Employee ID:</label>
          <input
            id="employee-id"
            type="number"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          {errors.id && (
            <p className="error-message">{errors.id}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="employee-name">Name:</label>
          <input
            id="employee-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="employee-age">Age:</label>
          <input
            id="employee-age"
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
          {errors.age && (
            <p className="error">{errors.age}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="employee-position">Position:</label>
          <input
            id="employee-position"
            type="text"
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
          {errors.position && (
            <p className="error">{errors.position}</p>
          )}
        </div>

        <button type="submit">
          {isEditing ? "Update Employee" : "Add Employee"}
        </button>

        {isEditing && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
