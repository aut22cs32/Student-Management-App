
import useLocalStorage from "../hooks/useLocalStorage";
import "../App.css";

function Home() {
  const [students] = useLocalStorage("students", []);

  const courseCounts = students.reduce((counts, student) => {
    counts[student.course] = (counts[student.course] || 0) + 1;
    return counts;
  }, {});

  const averageAge =
    students.length > 0
      ? (
          students.reduce((total, student) => total + Number(student.age), 0) /
          students.length
        ).toFixed(1)
      : "0";

  return (
    <main className="dashboard-page">
      <section className="welcome-banner">
        <div>
          <p className="welcome-label">WELCOME BACK</p>
          <h1 className="dashboard-title">Student Dashboard</h1>
          <p>Manage your students easily and efficiently.</p>
        </div>
        <div className="welcome-icon">🎓</div>
      </section>

  <section className="dashboard-stats">
  <div className="stat-card stat-blue">
    <div>
      <p>Total Students</p>
      <h2>{students.length}</h2>
    </div>
  </div>

  <div className="stat-card stat-green">
    <div>
      <p>Total Courses</p>
      <h2>{Object.keys(courseCounts).length}</h2>
    </div>
  </div>

  
</section>

<section className="dashboard-panel">
  <h2>Course-wise Students</h2>

  {Object.keys(courseCounts).length > 0 ? (
    Object.entries(courseCounts).map(([course, count]) => (
      <div className="course-row" key={course}>
        <span>{course}</span>
        <span className="course-count">
          {count} students
        </span>
      </div>
    ))
  ) : (
    <p>No students available. Add students to get started.</p>
  )}
</section>
      
    </main>
  );
}

export default Home;
