import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "../App.css";

function Home() {
  const [employees] = useLocalStorage("students", []);

  const positionCounts = employees.reduce((counts, employee) => {
    const position = employee.position ?? employee.course;
    if (position) counts[position] = (counts[position] || 0) + 1;
    return counts;
  }, {});

  return (
    <main className="dashboard-page">
      <section className="welcome-banner">
        <div>
          <p className="welcome-label">EMPLOYEE MANAGEMENT</p>
          <h1 className="dashboard-title">Dashboard</h1>
          <p>Manage your employees and their positions in one place.</p>
        </div>
        <div className="welcome-icon" aria-hidden="true">👥</div>
      </section>

      <section className="home-actions" aria-label="Employee actions">
        <Link className="home-action primary-action" to="/employees/add">
          <span className="action-icon" aria-hidden="true">＋</span>
          <span>
            <strong>Add Employee Form</strong>
            <small>Enter a new employee’s details</small>
          </span>
          <span className="action-arrow" aria-hidden="true">→</span>
        </Link>
        <Link className="home-action secondary-action" to="/employees/cards">
          <span className="action-icon" aria-hidden="true">▦</span>
          <span>
            <strong>Employee Cards</strong>
            <small>View, edit, or remove employees</small>
          </span>
          <span className="action-arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="dashboard-stats" aria-label="Employee summary">
        <div className="stat-card stat-blue">
          <div>
            <p>Total Employees</p>
            <h2>{employees.length}</h2>
          </div>
        </div>
        <div className="stat-card stat-green">
          <div>
            <p>Total Positions</p>
            <h2>{Object.keys(positionCounts).length}</h2>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <h2>Employees by Position</h2>
        {Object.keys(positionCounts).length > 0 ? (
          Object.entries(positionCounts).map(([position, count]) => (
            <div className="course-row" key={position}>
              <span>{position}</span>
              <span className="course-count">
                {count} {count === 1 ? "employee" : "employees"}
              </span>
            </div>
          ))
        ) : (
          <p>No employees yet. Add an employee to get started.</p>
        )}
      </section>
    </main>
  );
}

export default Home;
