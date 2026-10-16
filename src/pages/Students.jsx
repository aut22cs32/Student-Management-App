import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

import Header from "../components/Header/Header";
import StudentCard from "../components/StudentCard/StudentCard";
import StudentForm from "../components/StudentForm/StudentForm";
import useLocalStorage from "../hooks/useLocalStorage";

function Employees({ view }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [employees, setEmployees] = useLocalStorage("students", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(
    () => location.state?.editingEmployee ?? null
  );
  const [message, setMessage] = useState("");

  function handleAddEmployee(employee) {
    if (employees.some((existing) => existing.id === employee.id)) {
      setMessage("This ID already exists!");
      return false;
    }
    setEmployees((previous) => [...previous, employee]);
    setMessage("Employee added successfully!");
    return true;
  }

  function handleDeleteEmployee(id) {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    setEmployees((previous) => previous.filter((employee) => employee.id !== id));
    setMessage("Employee deleted successfully!");
  }

  function handleUpdateEmployee(updatedEmployee) {
    setEmployees((previous) => previous.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
    setEditingEmployee(null);
    setMessage("Employee updated successfully!");
    navigate("/employees/cards", { replace: true, state: null });
  }

  function handleEditEmployee(id) {
    const employee = employees.find((item) => item.id === id);
    if (employee) {
      setEditingEmployee(employee);
      navigate("/employees/add", { state: { editingEmployee: employee } });
    }
  }

  function handleCancelEdit() {
    setEditingEmployee(null);
    navigate("/employees/cards", { state: null });
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="employees-page">
        <Header />
        {message && <p className="success-message" role="status">{message}</p>}

        {view === "form" ? (
          <main className="employee-form-page">
            <div className="page-heading">
              <p className="welcome-label">EMPLOYEE DIRECTORY</p>
              <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
              <p>Fill in the details below to {editingEmployee ? "update" : "add"} an employee.</p>
            </div>
            <section className="form-section">
              <StudentForm
                onAddStudent={handleAddEmployee}
                editingStudent={editingEmployee}
                onUpdateStudent={handleUpdateEmployee}
                onCancelEdit={handleCancelEdit}
              />
            </section>
          </main>
        ) : (
          <main className="employee-cards-page">
            <div className="page-heading">
              <p className="welcome-label">EMPLOYEE DIRECTORY</p>
              <h2>Employee Cards</h2>
              <p>Browse and manage the employees in your team.</p>
            </div>
            <section className="students-section">
              <label className="search-label" htmlFor="employee-search">Search employees</label>
              <input
                id="employee-search"
                type="search"
                placeholder="Search by employee name..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {filteredEmployees.length > 0 ? (
                <div className="student-list">
                  {filteredEmployees.map((employee) => (
                    <StudentCard
                      key={employee.id}
                      id={employee.id}
                      name={employee.name}
                      age={employee.age}
                      position={employee.position ?? employee.course}
                      onDelete={handleDeleteEmployee}
                      onEdit={handleEditEmployee}
                    />
                  ))}
                </div>
              ) : (
                <p className="empty-state">No employees found. Add an employee to get started.</p>
              )}
            </section>
          </main>
        )}
    </div>
  );
}

export default Employees;
