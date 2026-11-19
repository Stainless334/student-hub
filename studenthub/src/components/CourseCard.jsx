import { Link } from "react-router-dom";
function CourseCard({ course, onIncreaseProgress, onEdit, onDelete }) {
  return (
    <div className="course-card">
      <h2>
        <Link to={`/courses/${course.id}`}>
          {course.name}
        </Link>
      </h2>

      <p>Progress: {course.progress}%</p>

      <p>
        Status: {course.completed ? "Completed!!!" : "In progress"}
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>

      <button onClick={() => onIncreaseProgress(course.id)}>
        Increase Progress
      </button>

      <button onClick={() => onEdit(course.id)}>
        Rename
      </button>

      <button onClick={() => onDelete(course.id)}>
        Delete Course
      </button>
    </div>
  );
}

export default CourseCard;