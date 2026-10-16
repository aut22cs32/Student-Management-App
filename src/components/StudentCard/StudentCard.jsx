import "./StudentCard.css";
function StudentCard({ id, name, age, position, course, onEdit, onDelete }) {
  const employeePosition = position ?? course;
  return (
    <div className="student-card">

      <div className="student-info">
     
      <p>
        <span id="left-align">Employee ID: </span>{id}
      </p>

      <p>
        <span id="left-align">Name: </span>{name}
      </p>

      <p>
        <span id="left-align">Age: </span>{age}
      </p>

      <p>
        <span id="left-align">Position: </span>{employeePosition}
      </p>

      </div>

       <button id="btn" onClick={() => onEdit(id)}>
        Edit
      </button>

      <button id="btn" onClick={() => onDelete(id)}>
          Delete
      </button>
    </div>
  );
}

export default StudentCard;
