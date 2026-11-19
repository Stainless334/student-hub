import CourseCard from "../components/CourseCard";
import AddCourse from "../components/AddCourse";

function Courses({
  filteredCourses,
  increaseProgress,
  editCourse,
  deleteCourse,
  newCourse,
  setNewCourse,
  addCourse,
  searchTerm,
  setSearchTerm,
  setFilter,
  filter
}) {
  return (
    <div className="courses-page">
      <h1>My Courses</h1>
      <AddCourse
        newCourse={newCourse}
        setNewCourse={setNewCourse}
        onAddCourse={addCourse}
      />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All Courses
        </button>

        <button
          className={filter === "In Progress" ? "active" : ""}
          onClick={() => setFilter("In Progress")}
        >
          In Progress
        </button>

        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <div className="course-container">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onIncreaseProgress={increaseProgress}
            onEdit={editCourse}
            onDelete={deleteCourse}
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;