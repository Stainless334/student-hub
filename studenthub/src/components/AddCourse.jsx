import { useRef, useEffect } from "react";
function AddCourse({newCourse, setNewCourse, onAddCourse}) {
  const courseInputRef = useRef(null);
  useEffect(() => {
  courseInputRef.current.focus();
  }, []);
  return (
    <form className="add-course" onSubmit={onAddCourse}>
      <input
      ref={courseInputRef}
        type="text"
        placeholder="Enter course name..."
        value={newCourse}
        onChange={(event) => setNewCourse(event.target.value)}
      />
      <button type="submit">Add Course</button>
    </form>

  );
}

export default AddCourse;