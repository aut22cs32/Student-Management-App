import "./StudentCard.css";
function StudentCard({ id,name, age, course, onEdit, onDelete }) {
  return (
    <div className="student-card">

      <div className="student-info">
     
      <p>
        <span id="left-align">Id: </span>{id}
      </p>

      <p>
        <span id="left-align">Name: </span>{name}
      </p>

      <p>
        <span id="left-align">Age: </span>{age}
      </p>

      <p>
        <span id="left-align">Course: </span>{course}
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